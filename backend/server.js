// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const studentRoutes = require("./routes/studentRoutes");
const parentRoutes = require("./routes/parentRoutes");
const Parent = require("./models/Parent"); // Adjust the path as needed
const teacherRoutes = require("./routes/teacherRoutes");

// Load environment variables
dotenv.config();

// Create an Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS for frontend-backend communication
app.use(express.json()); // Parse JSON request bodies
app.use("/api", studentRoutes); // Use student routes
app.use("/api", parentRoutes);
app.use("/api", teacherRoutes);

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Define a simple API endpoint
app.get("/api", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

app.post("/api/parents", (req, res) => {
  res.send("Parent added successfully!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});