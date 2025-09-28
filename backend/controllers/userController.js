// controllers/userController.js
const Resignation = require("../models/Resignation");
const Response = require("../models/Response");
const { isHoliday } = require("../utils/holidays");
const { sendMail } = require("../utils/mailer");

// Submit Resignation
exports.submitResignation = async (req, res) => {
  try {
    const { lwd, reason, country } = req.body;
    const dateObj = new Date(lwd);

    if (dateObj.getDay() === 0 || dateObj.getDay() === 6)
      return res.status(400).json({ message: "Last Working Day cannot be weekend" });

    if (await isHoliday(lwd, country))
      return res.status(400).json({ message: "Last Working Day cannot be a holiday" });

    const resignation = await Resignation.create({
      employeeId: req.user._id,
      lwd,
      reason,
    });

    // Optional: Notify HR
    // await sendMail("admin@example.com", "New Resignation", `Employee ${req.user.username} submitted resignation.`);

    res.status(200).json({ data: { resignation } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Resignation Status
exports.getResignationStatus = async (req, res) => {
  try {
    const resignation = await Resignation.findOne({ employeeId: req.user._id });
    res.json({ data: { resignation } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Submit Exit Interview
exports.submitResponses = async (req, res) => {
  try {
    const { responses } = req.body;
    const record = await Response.create({ employeeId: req.user._id, responses });
    res.json({ message: "Responses submitted", data: { record } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
