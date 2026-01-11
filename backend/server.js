const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const taskRoutes = require("./routes/tasks");

const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
