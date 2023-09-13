const express = require('express');
const router = express.Router();
const Candidate = require('../models/candidate');

// Route to list all candidates
router.get('/', async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to create a new candidate
router.post('/', async (req, res) => {
  const { name, responses } = req.body;

  try {
    // Create candidate
    const candidate = new Candidate({
      name,
      responses,
    });

    // Save candidate
    await candidate.save();

    res.status(201).json(candidate);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to update a candidate by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, responses } = req.body;

  try {
    const updatedCandidate = await Candidate.findByIdAndUpdate(
      id,
      { name, responses },
      { new: true }
    );

    if (!updatedCandidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    res.json(updatedCandidate);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to delete a candidate by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCandidate = await Candidate.findByIdAndRemove(id);

    if (!deletedCandidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    res.json(deletedCandidate);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
