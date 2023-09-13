const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Read the updated JSON data from the file
const jsonData = JSON.parse(fs.readFileSync('data/sample-data.json', 'utf-8'));

// Route to list all surveys
app.get('/surveys', (req, res) => {
  try {
    const surveys = jsonData.survey.questions;
    res.json(surveys);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to submit a response for a survey from a user
app.post('/responses', async (req, res) => {
  const { candidateId, answers } = req.body;

  try {
    // Check if the candidate exists
    const candidate = jsonData.candidates.find((c) => c.candidateId === candidateId);

    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    // Create response
    const response = {
      candidateId,
      answers,
    };

    // Save response
    candidate.responses.push(response);

    // Update the JSON file with the new response
    fs.writeFileSync('data/sample-data.json', JSON.stringify(jsonData, null, 2));

    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Route to list all candidates
app.get('/candidates', (req, res) => {
  try {
    const candidates = jsonData.candidates;
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to calculate similarity between candidates
app.get('/similarity/:candidateId', (req, res) => {
  try {
    const candidateId = req.params.candidateId;
    const candidate = jsonData.candidates.find((c) => c.candidateId === candidateId);

    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    // Calculate similarity (example: counting matching responses)
    const calculateSimilarity = (candidate1, candidate2) => {
      const commonAnswers = candidate1.responses.filter((answer1) =>
        candidate2.responses.some((answer2) => answer1.questionId === answer2.questionId && answer1.answer === answer2.answer)
      );
      const similarity = (commonAnswers.length / candidate1.responses.length) * 100;
      return similarity;
    };

    // Calculate similarity with other candidates
    const similarityResults = jsonData.candidates
      .filter((c) => c.candidateId !== candidateId)
      .map((otherCandidate) => ({
        candidateId: otherCandidate.candidateId,
        name: otherCandidate.name,
        similarity: calculateSimilarity(candidate, otherCandidate),
      }));

    res.json(similarityResults);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to list individual survey question by questionId
app.get('/surveys/:questionId', (req, res) => {
  try {
    const questionId = parseInt(req.params.questionId);
    const question = jsonData.survey.questions.find((q) => q.questionId === questionId);

    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    res.json(question);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
