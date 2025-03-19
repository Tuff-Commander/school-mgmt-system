 const express = require("express");
 const Student = require("../models/Student");

 const router = express.Router();

 // Create a new student
 router.post("/students", async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
 });

 // Get all students
 router.get("/students", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
 });

 module.exports = router;
