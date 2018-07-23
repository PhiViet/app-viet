import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
    { path: '', pathMatch: 'full', component: LoginComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        FormsModule
    ],
    exports: [RouterModule],
    declarations: [LoginComponent],
    providers: [],
})
export class LoginModule { }
