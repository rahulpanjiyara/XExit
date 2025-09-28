// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");
const {
  getResignations,
  concludeResignation,
  getExitResponses,
} = require("../controllers/adminController");

router.get("/resignations", authMiddleware, adminMiddleware, getResignations);
router.put("/conclude_resignation", authMiddleware, adminMiddleware, concludeResignation);
router.get("/exit_responses", authMiddleware, adminMiddleware, getExitResponses);

module.exports = router;
