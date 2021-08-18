import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CandidateFormComponent } from './components/candidate-form/candidate-form.component';
import { LoginComponent } from './components/login/login.component';
import { PasswordPatternDirective } from './directives/password-pattern.directive';
import { AppRoutingModule } from './app-routing.module';
import { CandidateDataComponent } from './components/candidate-data/candidate-data.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthenticationService } from './services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './interceptors/AuthService.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CandidateFormComponent,
    LoginComponent,
    PasswordPatternDirective,
    CandidateDataComponent,
    NotFoundComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule

  ],
  providers: [AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
