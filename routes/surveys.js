const express = require('express');
const router = express.Router();
const Survey = require('../models/survey');

// Route to list all surveys
router.get('/', async (req, res) => {
  try {
    const surveys = await Survey.find();
    res.json(surveys);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to create a new survey
router.post('/', async (req, res) => {
  const { questions } = req.body;

  try {
    // Create survey
    const survey = new Survey({
      questions,
    });

    // Save survey
    await survey.save();

    res.status(201).json(survey);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to update a survey by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { questions } = req.body;

  try {
    const updatedSurvey = await Survey.findByIdAndUpdate(
      id,
      { questions },
      { new: true }
    );

    if (!updatedSurvey) {
      return res.status(404).json({ error: 'Survey not found' });
    }

    res.json(updatedSurvey);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to delete a survey by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSurvey = await Survey.findByIdAndRemove(id);

    if (!deletedSurvey) {
      return res.status(404).json({ error: 'Survey not found' });
    }

    res.json(deletedSurvey);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
