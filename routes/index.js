const express = require('express');
const router = express.Router();

// Import all route handlers
const surveysRouter = require('./surveys');
const responsesRouter = require('./responses');
const candidatesRouter = require('./candidates');
const similarityRouter = require('./similarity');
const questionsRouter = require('./questions'); // Include the new questions route

// Define routes
router.use('/surveys', surveysRouter);
router.use('/responses', responsesRouter);
router.use('/candidates', candidatesRouter);
router.use('/similarity', similarityRouter);
router.use('/questions', questionsRouter); // Use the new questions route

module.exports = router;
