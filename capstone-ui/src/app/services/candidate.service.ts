import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { User } from '../models';
import { Candidate } from '../models/candidate';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CandidateService {
    constructor(private http: HttpClient) { }

    getAllCandidates() {
        return this.http.get<any>(`${environment.server_url}/candidates`).pipe(
            catchError((err) => {    
              return throwError(err);  
            })
          );
    }

    getCandidate(id: string){
        return this.http.get<any>(`${environment.server_url}/candidates/${id}`).pipe(
            catchError((err) => {    
              return throwError(err);  
            })
          );
    }

    saveCandidate(candidate: Candidate) {
        return this.http.post<any>(`${environment.server_url}/candidates/create`, candidate).pipe(
            catchError((err) => {    
                console.log(err);
              return throwError(err);  
            })
          );
    }

    getFields() {
        return this.http.get<any>(`${environment.server_url}/fields`).pipe(
            catchError((err) => {    
              return throwError(err);  
            })
          );
    }

    deleteCandidate(id:string){
        return this.http.delete(`${environment.server_url}/candidates/${id}`).pipe(
            catchError((err) => {    
              return throwError(err);  
            })
          );
    }

    updateCandidate(candidate: Candidate, id: string){
        return this.http.patch<any>(`${environment.server_url}/candidates/${id}`, candidate ).pipe(
            catchError((err) => {    
              return throwError(err);  
            })
          );;
    }
}