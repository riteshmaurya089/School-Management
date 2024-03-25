// routes/teacherRoutes.js
const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher');

// Create a teacher
router.post('/', async (req, res) => {
  try {
    const newTeacher = await Teacher.create(req.body);
    res.json(newTeacher);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all teachers
router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get teacher by ID
router.get('/:id', getTeacher, (req, res) => {
  res.json(res.teacher);
});

// Middleware to get teacher by ID
async function getTeacher(req, res, next) {
  let teacher;
  try {
    teacher = await Teacher.findById(req.params.id);
    if (teacher == null) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.teacher = teacher;
  next();
}

module.exports = router;
