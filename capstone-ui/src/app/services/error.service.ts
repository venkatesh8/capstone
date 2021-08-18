import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ErrorService {
    private errorStore = new BehaviorSubject(null);
    public error$ = this.errorStore.asObservable();

    emitError (err:any) {
        this.errorStore.next(err);
    }
}