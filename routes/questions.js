const express = require('express');
const router = express.Router();
const Question = require('../models/question');

// Route to list all survey questions
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to create a new question
router.post('/', async (req, res) => {
  const { questionText, options } = req.body;

  try {
    // Create question
    const question = new Question({
      questionText,
      options,
    });

    // Save question
    await question.save();

    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to update a question by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { questionText, options } = req.body;

  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      id,
      { questionText, options },
      { new: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({ error: 'Question not found' });
    }

    res.json(updatedQuestion);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to delete a question by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedQuestion = await Question.findByIdAndRemove(id);

    if (!deletedQuestion) {
      return res.status(404).json({ error: 'Question not found' });
    }

    res.json(deletedQuestion);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
