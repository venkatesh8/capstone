import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Candidate } from 'src/app/models/candidate';
import { CandidateService } from 'src/app/services/candidate.service';



@Component({
  selector: 'app-candidate-data',
  templateUrl: './candidate-data.component.html',
  styleUrls: ['./candidate-data.component.scss']
})
export class CandidateDataComponent implements OnInit {

  page = 1;
  pageSize = 4;
  candidates: any;
  collectionSize =0;
  showAlert = false;


  constructor(private candidateService: CandidateService, private router: Router) {

  }

  ngOnInit(): void {
     this.getListCandidates();
  }

  getListCandidates(){
    this.candidateService.getAllCandidates().subscribe(data=>{
      console.log(data);
      if(data.success){
        this.candidates = data.data.results;
        this.collectionSize = this.candidates.length;
      }else{
        console.error('something went wrong!!');
      }
    })
  }

  refreshCandidates() {
    this.candidates.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  deleteCandidate(id: string){
    console.log(id);
    this.candidateService.deleteCandidate(id).subscribe(data=>{
      console.log(data);
      this.showAlert = true;
    });
    this.getListCandidates();
  }

  editCandidate(id: string){
    console.log(id);
    this.router.navigate(['/candidate/form', {id}]);
  }

  closeAlert(){
    this.showAlert = false;
  }
}
