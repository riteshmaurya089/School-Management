// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Create a student
router.post('/', async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get student by ID
router.get('/:id', getStudent, (req, res) => {
  res.json(res.student);
});

// Middleware to get student by ID
async function getStudent(req, res, next) {
  let student;
  try {
    student = await Student.findById(req.params.id);
    if (student == null) {
      return res.status(404).json({ message: 'Student not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.student = student;
  next();
}

module.exports = router;
