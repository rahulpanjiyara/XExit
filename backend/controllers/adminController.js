// controllers/adminController.js
const Resignation = require("../models/Resignation");
const Response = require("../models/Response");
const { sendMail } = require("../utils/mailer");

// View all resignations
exports.getResignations = async (req, res) => {
  try {
    const resignations = await Resignation.find().populate("employeeId", "username");
    res.json({ data: resignations });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Approve/Reject resignation
exports.concludeResignation = async (req, res) => {
  try {
    const { resignationId, approved, exitDate } = req.body;
    const resig = await Resignation.findById(resignationId);

    if (!resig) return res.status(404).json({ message: "Resignation not found" });

    resig.status = approved ? "approved" : "rejected";
    resig.exitDate = approved ? exitDate : null;
    await resig.save();

    // Notify employee (uncomment once email utils ready)
    // sendMail(
    //   resig.employeeId.email || "employee@example.com",
    //   "Resignation Update",
    //   `Your resignation has been ${resig.status}. Exit Date: ${resig.exitDate || "N/A"}`
    // );

    res.json({ message: `Resignation ${resig.status}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// View exit responses
exports.getExitResponses = async (req, res) => {
  try {
    const responses = await Response.find().populate("employeeId", "username");
    res.json({ data: responses });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
