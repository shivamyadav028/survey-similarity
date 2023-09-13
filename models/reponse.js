const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate',
    required: true,
  },
  survey: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Survey',
    required: true,
  },
  answers: [
    {
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Survey',
      },
      answer: String,
    },
  ],
});

const Response = mongoose.model('Response', responseSchema);

module.exports = Response;
