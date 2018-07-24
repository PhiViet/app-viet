import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LoginGuard } from './login.route.guard';
import { HomeModule } from './home/home.module';


const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'login', component: LoginComponent },
    // { path: 'login', loadChildren:()=> LoginModule},

    // { path: 'home', component: HomeComponent, canActivate: [LoginGuard] },
    { path: 'dashboard', loadChildren: './home/home.module#HomeModule', canActivate: [LoginGuard] },
    // { path: 'home', loadChildren:()=> HomeModule, canActivate: [LoginGuard] },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class RoutingModule { }