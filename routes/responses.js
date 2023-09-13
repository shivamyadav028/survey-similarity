const express = require('express');
const router = express.Router();
const Response = require('../models/response');

// Route to submit a response for a survey from a user
router.post('/', async (req, res) => {
  const { candidateId, surveyId, answers } = req.body;

  try {
    // Create response
    const response = new Response({
      candidateId,
      surveyId,
      answers,
    });

    // Save response
    await response.save();

    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get a list of all responses
router.get('/', async (req, res) => {
  try {
    const responses = await Response.find();
    res.json(responses);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.put('/:responseId', async (req, res) => {
  const { responseId } = req.params;
  const updatedResponseData = req.body;

  try {
    const updatedResponse = await Response.findByIdAndUpdate(responseId, updatedResponseData, {
      new: true, // Return the updated response
    });

    if (!updatedResponse) {
      return res.status(404).json({ error: 'Response not found' });
    }

    res.json(updatedResponse);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.delete('/:responseId', async (req, res) => {
  const { responseId } = req.params;

  try {
    const deletedResponse = await Response.findByIdAndDelete(responseId);

    if (!deletedResponse) {
      return res.status(404).json({ error: 'Response not found' });
    }

    res.json({ message: 'Response deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
