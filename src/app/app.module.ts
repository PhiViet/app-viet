import { LoginGuard } from './login.route.guard';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RoutingModule } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ChatService } from './chat.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()

  ],
  providers: [
    LoginGuard,
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
