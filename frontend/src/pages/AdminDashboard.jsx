import { useEffect, useState } from "react";
import API from "../api";

export default function AdminDashboard() {
  const [resignations, setResignations] = useState([]);
  const [exitDates, setExitDates] = useState({}); // track exit date input

  const load = async () => {
    const { data } = await API.get("/admin/resignations");
    setResignations(data.data);
  };

  useEffect(() => { load(); }, []);

  const handleAction = async (id, approved) => {
    const exitDate = approved ? exitDates[id] : null;
    if (approved && !exitDate) return alert("Select exit date before approving");

    await API.put("/admin/conclude_resignation", {
      resignationId: id,
      approved,
      exitDate,
    });

    setExitDates(prev => ({ ...prev, [id]: "" }));
    load();
  };

  const [exitResponses, setExitResponses] = useState([]);

  const loadResponses = async () => {
    const { data } = await API.get("/admin/exit_responses");
    setExitResponses(data.data);
  };

  useEffect(() => { loadResponses(); }, []);

  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4">All Resignations</h2>
        {resignations.map(r => (
          <div key={r._id} className="border p-3 mb-2">
            <p>Employee: {r.employeeId.username}</p>
            <p>Status: {r.status}</p>
            <p>LWD: {r.lwd}</p>

            {r.status === "pending" && (
              <div className="mt-2 flex items-center space-x-2">
                <input
                  type="date"
                  value={exitDates[r._id] || ""}
                  onChange={(e) =>
                    setExitDates(prev => ({ ...prev, [r._id]: e.target.value }))
                  }
                  className="border px-2 py-1 rounded"
                />
                <button onClick={() => handleAction(r._id, true)} className="bg-green-500 text-white px-3 py-1 rounded">Approve</button>
                <button onClick={() => handleAction(r._id, false)} className="bg-red-500 text-white px-3 py-1 rounded">Reject</button>
              </div>
            )}

            {r.status !== "pending" && r.exitDate && <p>Exit Date: {r.exitDate}</p>}
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Exit Interview Responses</h2>
        {exitResponses.map(r => (
          <div key={r._id} className="border p-3 mb-3">
            <p className="font-semibold">Employee: {r.employeeId.username}</p>
            {r.responses.map((resp, i) => (
              <div key={i} className="ml-2 mt-1">
                <p className="italic">{resp.questionText}</p>
                <p>{resp.response}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
