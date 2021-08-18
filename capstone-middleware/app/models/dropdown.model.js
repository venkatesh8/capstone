const mongoose = require('mongoose');

const Domains = mongoose.model(
  'Domains',
  new mongoose.Schema({
    domainName: String,
    type: String,
    attributeType: String,
  })
);

const Candidate_Roles = mongoose.model(
  'Candidate_Roles',
  new mongoose.Schema({
    roleName: String,
    type: String,
    attributeType: String,
  })
);

const FormToEmails = mongoose.model(
  'FormToEmails',
  new mongoose.Schema({
    name: String,
    type: String,
    attributeType: String,
  }, { collection: 'formToEmails' })
);

const Recruiters = mongoose.model(
  'Recruiters',
  new mongoose.Schema({
    recruiterName: String,
    type: String,
    attributeType: String,
  })
);

const Resume_Sources = mongoose.model(
  'Resume_Sources',
  new mongoose.Schema({
    source: String,
    type: String,
    attributeType: String,
  })
);

module.exports = { Domains, Candidate_Roles, FormToEmails, Recruiters, Resume_Sources };
