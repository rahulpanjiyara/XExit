require('dotenv').config(); // MUST be the very first line
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { PORT, MONGO_URI } = require("./config");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const User = require("./models/User");
const bcrypt = require("bcryptjs");


const app = express();
app.use(cors({
  origin: [
    "http://localhost:5173",   // local frontend
    "https://xexit-5qgl.onrender.com"  // deployed frontend
  ],
  credentials: true,
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");

    // ✅ Initialize HR account
    const hr = await User.findOne({ username: "admin" });
    if (!hr) {
      const hashed = await bcrypt.hash("admin", 10);
      await User.create({ username: "admin", password: hashed, role: "hr" });
      console.log("HR account created (admin/admin)");
    } else {
      console.log("HR account already exists");
    }

  })
  .catch(err => console.log(err));


app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
