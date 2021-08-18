const { mongoose } = require('../models');
const db = require('../models');
const log = require('../utils/logger')
const { Domains, Recruiters, Resume_Sources, FormToEmails, Candidate_Roles } = db.dropdown;
const Candidates = db.candidates;


exports.getAllCandidates = async (req, res) => {
    const results  = await Candidates.find({}, function (err, docs) {
      if(!err){
        return docs;
      } else{
        console.log(err);
        log.errorLog.error('[getAllCandidates] :', `${err}`);
        res.status(500).json({ success: false, message: `Failed to fetch Candidates ${err.message}`, data: { } });
      }
      
    });

    log.debugLog.info('[getAllCandidates] ', `Success`);
  res.status(200).json({ success: true, message: `Success`, data: { results } });
};

exports.getCandidate = async (req, res) => {
  console.log(req.params);
  log.debugLog.info('[getCandidate] with ID: ', `${req.params}`);
  const {id} = req.params
  console.log(id);
  const result = await Candidates.findById({_id: id}, function (err, docs){
    if(!err){
      return docs;
    } else{
      log.errorLog.error('[getCandidate] :', `${err.message}`);
      res.status(404).json({ success: false, message: `Failed! Invalid candidate id. ${err.message}`, data: { } });
    }
  })
  log.errorLog.error('[getCandidate] Success:', `${result}`);
  res.status(200).json({ data: {result}, success: true, message: 'Success'});
  
};

exports.createNewCandidate = async (req, res) =>{
  log.debugLog.debug('[createNewCandidate] :', `${req.body}`);
    const {firstName, lastName, middleName, email, mobileNumber, role, resumeSource, formToEmail, recruiterName, domain} = req.body;
    // Here we have to add validation for req.body for exact input fields for service
    const newCandidate = new Candidates({firstName, lastName, middleName, email, mobileNumber, role, resumeSource, formToEmail, recruiterName, domain})
    try {
     const result  =  await newCandidate.save();
     log.debugLog.debug('[createNewCandidate] Success:', `${result}`);
      res.status(200).json({success: true, data: {result}, message: "Candidate created successfully"})
    } catch (err) {
      log.errorLog.error('[createNewCandidate] Failure:', `${err.message}`);
      res.status(404).json({ success: false, message: `Failed! Something went wrong. ${err.message}`, data: { } });
    }
}

exports.updateCandidate = async (req, res) => {
  const {id: _id} = req.params;
  const candidate = req.body;
  log.debugLog.debug('[updateCandidate] :', `${req.params} req body: ${req.body}`);
  if(!mongoose.Types.ObjectId.isValid(_id)){
    log.errorLog.error('[updateCandidate] Failure: Invalid ID ', `${req.params} req body: ${req.body}`);
    return res.status(404).json({success: false, data: {}, message: `Failed! Invalid Candidate Id.`})
  }

  candidate.modifiedAt = new Date();
  console.log(candidate)
  try {
    const updateCandidate = await Candidates.findByIdAndUpdate(
      _id,
      {...candidate, _id},
      {
        new: true
      }
    );
      
    log.debugLog.debug(`[updateCandidate] Success: ${updateCandidate}`);
    res.status(200).json({success: true, data: {result: updateCandidate}, message: "Candidate updated successfully"})
       
  } catch (err) {
    log.errorLog.error(`[updateCandidate] Failure: ${err.message}`);
    res.status(404).json({ success: false, message: `Failed! Something went wrong. ${err.message}`, data: {} });
  }
};

exports.deleteCandidate = async (req, res) => {
  console.log(req.params);
  const {id: _id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(_id)){
    log.errorLog.error(`[deleteCandidate] Failure Invalid ID: ${req.params}`);
    return res.status(404).json({success: false, data: {}, message: "Failed! Invalid Candidate Id."})
  }

  const result = await Candidates.findByIdAndRemove(_id);
  log.debugLog.debug(`[deleteCandidate] Success ID: ${result}`);
  res.status(200).json({success: true, data: { message: `Candidate delete with email ID: ${result.email}`, id: _id }, message: "Candidate deleted successfully"})
  
};

exports.getAllFields = async (req, res) => {
  try {

    const domainData = await Domains.find({}, function (err, docs) {
      if (!err) {
        return docs;
      } else {
        throw err;
      }
    });
  
    const recruitersData = await Recruiters.find({}, function (err, docs) {
      if (!err) {
        return docs;
      } else {
        throw err;
      }
    });
  
    const roleData = await Candidate_Roles.find({}, function (err, docs) {
      if (!err) {
        return docs;
      } else {
        throw err;
      }
    });
  
    const formToEmailData = await FormToEmails.find({}, function (err, docs) {
      if (!err) {
        return docs;
      } else {
        throw err;
      }
    });
  
    const rSourceData = await Resume_Sources.find({}, function (err, docs) {
      if (!err) {
        return docs;
      } else {
        throw err;
      }
    });

    const results = {
      domains: domainData,
      formToEmails: formToEmailData,
      roles: roleData,
      resumeSources: rSourceData,
      recruiters: recruitersData,
    };

    log.debugLog.debug(`[getAllFields] : ${req.headers}`);
  
    res.status(200).json({ success: true, message: `Fetch fields call successful`, data: { results } });
    
  } catch (err) {
    log.errorLog.error(`[getAllFields] Failure : ${err.message}`);
    res.status(404).json({ success: false, message: `Failed! Something went wrong. ${err.message}`, data: { } });
  }
  


};
