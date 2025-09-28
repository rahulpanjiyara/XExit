const mongoose = require("mongoose");

const resignationSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  lwd: { type: String, required: true }, // YYYY-MM-DD
  reason: { type: String },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  exitDate: { type: String },
});

module.exports = mongoose.model("Resignation", resignationSchema);
