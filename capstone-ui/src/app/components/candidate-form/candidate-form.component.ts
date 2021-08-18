import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Candidate } from 'src/app/models/candidate';
import { CandidateService } from 'src/app/services/candidate.service';
import { ErrorService } from 'src/app/services/error.service';
// import { CustomvalidationService } from '../services/customvalidation.service';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.scss']
})
export class CandidateFormComponent implements OnInit {

  showAlert = false;
  candidateForm !: FormGroup;
  submitted = false;
  roles: any;
  domains: any;
  resumeSources: any;
  formToEmails: any;
  recruiters: any;
  isNewCanddate: boolean = true;
  commonMessage: any;
  // recruiterNames: Array<string> = ['Fresher', 'Branding & Marketing', 'Bigdata Developer', 'Application Developer']

  constructor(
    private fb: FormBuilder,
    private candidateService: CandidateService,
    private activatedRoute: ActivatedRoute,
    private errorService: ErrorService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.reloadWindow();
    this.populateFields();
    this.getCandidate();
    
  }

  createForm() {
    this.candidateForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      middleName: [''],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      role: ['', [Validators.required]],
      domain: ['', [Validators.required]],
      resumeSource: ['', [Validators.required]],
      formToEmail: ['', [Validators.required]],
      recruiterName: ['', [Validators.required]]
    }
    );
  }
  get candidateFormControls() {
    return this.candidateForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    const id = this.activatedRoute.snapshot.paramMap.get('id')+'';
    console.log(id, id.length, typeof id);
    if (this.candidateForm.valid) {
      this.showAlert = true
      const formData: Candidate = this.candidateForm.value;
      if( id!=='null' && id!=='' ){
        this.candidateService.updateCandidate(formData, id).subscribe(data=>{
          this.commonMessage = data.message;
          console.log(this.commonMessage);
          if(data.success){
            this.candidateForm.reset();
            // this.candidateForm.markAsPristine();
            this.candidateForm.markAsUntouched();
          }else{
            console.error('Candidate Not updated!!')
          }
        });
      } else{
        this.candidateService.saveCandidate(formData).subscribe(data=>{
          console.log("In ui", data);
          this.commonMessage  = data.message;
          console.log(this.commonMessage);
          if(data.success){
            this.candidateForm.reset();
            // this.candidateForm.markAsPristine();
            this.candidateForm.markAsUntouched();;
          }else{
            console.error('Candidate Not saved!!')
          }
        });
      }
      
    } else { 
      console.error('Please check Form is invalid')
    }
  }

  getCurrentError()  {
    return this.errorService.error$.subscribe(data=>{ this.commonMessage = data;});
  }

  validateInput(controlName: string): boolean {
    let isValid = (this.candidateFormControls[controlName]?.touched || this.submitted) && this.candidateFormControls[controlName]?.errors?.required;
    return isValid;
  }

  populateFields() {
    this.candidateService.getFields().subscribe(data => {
      if(data.success){
        this.domains = data.data.results.domains;
        this.formToEmails = data.data.results.formToEmails;
        this.recruiters = data.data.results.recruiters;
        this.resumeSources = data.data.results.resumeSources;
        this.roles = data.data.results.roles;

      }else{}
    })
  }

  closeAlert(){
    this.showAlert = false;
  }

  getCandidate(){
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    if(id){
      this.candidateService.getCandidate(id).subscribe(data=>{
        if(data.success){
          const candidate = data.data.result;
          console.log(candidate);
          this.candidateForm.setValue({
            firstName: candidate.firstName,
            lastName: candidate.lastName,
            middleName: candidate.middleName,
            email: candidate.email,
            mobileNumber: candidate.mobileNumber,
            role: candidate.role,
            resumeSource: candidate.resumeSource,
            formToEmail: candidate.formToEmail,
            recruiterName: candidate.recruiterName,
            domain: candidate.domain
          });
        }
      });
    } else{
      this.getCurrentError();
    }
  }

  reloadWindow(){
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }
  }
}
