const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
  questionId: Number,
  questionText: String,
  options: [String],
});

const Survey = mongoose.model('Survey', surveySchema);

module.exports = Survey;
