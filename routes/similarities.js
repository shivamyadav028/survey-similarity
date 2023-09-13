const express = require('express');
const router = express.Router();
const Candidate = require('../models/candidate');

// Function to calculate the Jaccard similarity coefficient
function calculateJaccardSimilarity(responses1, responses2) {
  const intersection = responses1.filter((response, index) => {
    const response2 = responses2[index];
    return response !== null && response2 !== null && response === response2;
  });

  const union = responses1.concat(responses2).filter((response, index) => {
    return response !== null || responses2[index] !== null;
  });

  const similarity = intersection.length / union.length;
  return similarity;
}

// Route to calculate similarity between candidates
router.get('/calculate-similarity/:candidateId1/:candidateId2', async (req, res) => {
  const { candidateId1, candidateId2 } = req.params;

  try {
    // Fetch candidate responses from the database (replace with your code to retrieve responses)
    const candidate1 = await Candidate.findById(candidateId1);
    const candidate2 = await Candidate.findById(candidateId2);

    if (!candidate1 || !candidate2) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    const similarityScore = calculateJaccardSimilarity(candidate1.responses, candidate2.responses);

    res.json({ similarity: similarityScore });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
