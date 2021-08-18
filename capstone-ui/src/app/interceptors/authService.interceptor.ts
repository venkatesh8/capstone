import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError } from "rxjs/operators";
import { BehaviorSubject, throwError } from 'rxjs';
import { ErrorService } from '../services/error.service';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private errorService: ErrorService){}
   
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        
        const token: string = JSON.parse(localStorage.getItem('currentUser') as any)?.accessToken;
        req = req.clone({ headers: req.headers.set(`Accept`, `application/json`) });
        req = req.clone({ headers: req.headers.set(`Content-Type`, `application/json`) });
        const re = /signin/gi;
        if (req.url.search(re) === -1 && token) {
            req = req.clone({ headers: req.headers.set(`x-access-token`, token) });
        }
        return next.handle(req)
            .pipe(
                catchError((error : HttpErrorResponse)=> {
                    //401 UNAUTHORIZED
                    if (error && error.status === 401) {
                        console.error("ERROR 401 UNAUTHORIZED");
                    }
                    const err = error.error || error.statusText;
                    console.error(`UnAuthorized Access. ERROR: ${err} `);
                    this.errorService.emitError(error.error);
                    return throwError(error.error);
                }
                )
            );
    }
}