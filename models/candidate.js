const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  candidateId: Number,
  name: String,
  responses: [
    {
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Survey',
      },
      answer: String,
    },
  ],
});

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;
