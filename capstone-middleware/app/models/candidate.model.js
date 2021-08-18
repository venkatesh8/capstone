const mongoose = require('mongoose');

const Candidates = mongoose.model(
  'Candidates',
  new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String },
    email:  {
        type:  String,
        unique: true,
        required: true
      },
    mobileNumber: { type: String, required: true },
    role: { type: String, required: true },
    resumeSource: { type: String, required: true },
    formToEmail: { type: String, required: true },
    recruiterName: { type: String, required: true },
    domain: { type: String, required: true },
    createdAt: {
      type: Date,
      default: Date.now
    },
    modifiedAt: {
      type: Date,
      default: Date.now
    }
  })
);

module.exports = Candidates;
