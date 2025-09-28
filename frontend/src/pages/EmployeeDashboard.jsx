import { useEffect, useState } from "react";
import API from "../api";
import { toast } from "react-toastify";

const questions = [
  "Why are you leaving?",
  "How was your experience?",
  "Suggestions for improvement?",
];

export default function EmployeeDashboard() {
  const [resignation, setResignation] = useState(null);
  const [reason, setReason] = useState("");
  const [lastDay, setLastDay] = useState("");
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));

  // Fetch resignation status on load
  const loadResignation = async () => {
    try {
      const { data } = await API.get("/user/status"); // backend returns employee's resignation
      setResignation(data.data.resignation || null);
    } catch {
      setResignation(null);
    }
  };

  useEffect(() => { loadResignation(); }, []);

  const submitResignation = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/user/resign", { lwd: lastDay, reason });
      setResignation(data.data.resignation);
      setReason("");
      setLastDay("");
      toast.success("Resignation submitted. ID: " + data.data.resignation._id);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error submitting resignation");
    }
  };

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const submitExitInterview = async () => {
    const payload = questions.map((q, i) => ({ questionText: q, response: answers[i] }));
    try {
      await API.post("/user/responses", { responses: payload });
      toast.success("Exit interview submitted");
      setAnswers(Array(questions.length).fill(""));
    } catch (err) {
      toast.error(err.response?.data?.message || "Error submitting interview");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      {!resignation && (
        <form onSubmit={submitResignation} className="space-y-4">
          <h2 className="text-xl font-bold mb-2">Submit Resignation</h2>
          <input
            type="date"
            value={lastDay}
            onChange={(e) => setLastDay(e.target.value)}
            className="border p-2 w-full"
            required
          />
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Reason for resignation"
            className="border p-2 w-full"
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit Resignation</button>
        </form>
      )}

      {resignation && (
        <div className="mt-6">
          <h2 className="text-xl font-bold">Resignation Status</h2>
          <p>Status: {resignation.status}</p>
          {resignation.exitDate && <p>Exit Date: {resignation.exitDate}</p>}

          {resignation.status === "approved" && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Exit Interview</h3>
              {questions.map((q, i) => (
                <div key={i} className="mb-2">
                  <label className="block italic mb-1">{q}</label>
                  <textarea
                    value={answers[i]}
                    onChange={(e) => handleAnswerChange(i, e.target.value)}
                    className="border p-2 w-full"
                  />
                </div>
              ))}
              <button
                onClick={submitExitInterview}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Submit Exit Interview
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
