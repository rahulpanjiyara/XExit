// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const {
  submitResignation,
  getResignationStatus,
  submitResponses,
} = require("../controllers/userController");

router.post("/resign", authMiddleware, submitResignation);
router.get("/status", authMiddleware, getResignationStatus);
router.post("/responses", authMiddleware, submitResponses);

module.exports = router;
