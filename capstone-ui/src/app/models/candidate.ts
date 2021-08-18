export class Candidate {
    firstName!: string;
    middleName!: string;
    lastName!: string;
    mobileNumber!: string;
    emailId!: string;
    role!: string;
    domain?: string;
    recruiter?: string;
    formToEmail?: string;
    resumeSource?: string;
    modifiedOn?: Date;
    appliedOn?: Date;
}