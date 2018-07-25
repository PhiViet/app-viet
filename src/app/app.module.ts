import { ChatService } from './chat.service';
import { SortPipe } from './pipe/sort.pipe';
import { UsersService } from './users.service';
import { LoginGuard } from './login.route.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RoutingModule } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
// import { HomeModule } from './home/home.module';
// import { LoginModule } from './login/login.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    RoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),

    // HomeModule,
    // LoginModule
    
  ],
  providers: [
    LoginGuard,
    UsersService,
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
