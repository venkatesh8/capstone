import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateDataComponent } from './components/candidate-data/candidate-data.component';
import { CandidateFormComponent } from './components/candidate-form/candidate-form.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './utils/auth.guard';
// import { MainContentComponent } from './components/mainContent/main-content.component';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'candidate',
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'form', pathMatch: 'full' },
            { path: 'form', component: CandidateFormComponent },
            { path: 'data', component: CandidateDataComponent }
        ]
    },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
