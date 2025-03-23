const express = require("express");
const Parent = require("../models/Parent");
const Student = require("../models/Student");

const router = express.Router();

// Get student data for a parent
router.get("/parents", async (req, res) => {
    try {
      console.log("Fetching parents from the database..."); // Debugging
      const parents = await Parent.find();
      console.log("Parents fetched:", parents); // Debugging
      res.json(parents);
    } catch (error) {
      console.error("Error fetching parents:", error); // Debugging
      res.status(500).json({ message: error.message });
    }
  });

  router.get("/parents/:id/students", async (req, res) => {
    try {
      const parent = await Parent.findById(req.params.id).populate("children");
      if (!parent) {
        return res.status(404).json({ message: "Parent not found" });
      }
      res.json(parent.children);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Create a new parent
router.post("/parents", async (req, res) => {
    try {
      const parent = new Parent(req.body);
      await parent.save();
      res.status(201).json(parent);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

// Update a parent
router.put("/parents/:id", async (req, res) => {
    try {
      const parent = await Parent.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!parent) {
        return res.status(404).json({ message: "Parent not found" });
      }
      res.json(parent);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  

module.exports = router;