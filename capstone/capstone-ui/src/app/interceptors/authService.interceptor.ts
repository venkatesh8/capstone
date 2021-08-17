import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError } from "rxjs/operators";
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {


    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log("Interception In Progress");
        const token: string = JSON.parse(localStorage.getItem('currentUser') as any)?.accessToken;
        req = req.clone({ headers: req.headers.set(`Accept`, `application/json`) });
        req = req.clone({ headers: req.headers.set(`Content-Type`, `application/json`) });
        const re = /signin/gi;
        console.log(req.url, token);
        if (req.url.search(re) === -1 && !token) {
            req = req.clone({ headers: req.headers.set(`x-access-token`, token) });
        }
        return next.handle(req)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    //401 UNAUTHORIZED
                    if (error && error.status === 401) {
                        console.log("ERROR 401 UNAUTHORIZED");
                    }
                    const err = error.error || error.statusText;
                    console.log(`UnAuthorized Access. ERROR: ${err} `);
                    return throwError(error);
                })
            );
    }
}