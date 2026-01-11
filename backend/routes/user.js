const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const User = require("../models/User");

router.get("/profile", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

router.put("/profile", auth, async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    req.body,
    { new: true }
  ).select("-password");

  res.json(updatedUser);
});

module.exports = router; // 🔴 THIS LINE IS REQUIRED
