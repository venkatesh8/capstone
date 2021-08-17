Domain.aggregate([
  {
    $lookup: {
      from: 'candidate_roles',
      localField: 'Domain.type',
      foreignField: 'candidate_roles.type',
      as: 'candidate_roles_info',
    },
  },
  { $unwind: '$candidate_roles_info' }, // $unwind used for getting data in object or for one record only

  // Join with user_role table
  {
    $lookup: {
      from: 'form_to_email',
      localField: 'Domain.type',
      foreignField: 'form_to_email.type',
      as: 'form_to_email_info',
    },
  },
  { $unwind: '$form_to_email_info' },
  {
    $lookup: {
      from: 'recruiters',
      localField: 'Domain.type',
      foreignField: 'recruiters.type',
      as: 'recruiters_info',
    },
  },
  { $unwind: '$recruiters_info' },

  {
    $lookup: {
      from: 'resume_source',
      localField: 'Domain.type',
      foreignField: 'resume_source.type',
      as: 'resume_source_info',
    },
  },
  { $unwind: '$resume_source_info' },
  // define which fields are you want to fetch
  {
    $project: {
      _id: -1,
      domainName: 1,
      attributeType: 1,
      roleName: '$candidate_roles_info.roleName',
      roleAttr: '$candidate_roles_info.attributeType',
      formToEmail: '$form_to_email_info.name',
      formToEmailAttr: '$form_to_email_info.attributeType',
      recruiters: '$recruiters_info.recruiterName',
      recruitersAttr: '$recruiters_info.attributeType',
      resumeSource: '$resume_source_info.source',
      resumeSourceAttr: '$resume_source_info.attributeType',
    },
  },
]);
