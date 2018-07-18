import { UsersService } from './users.service';
import { LoginGuard } from './login.route.guard';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RoutingModule } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
// import {EmojiPickerModule} from 'ng-emoji-picker';
// import { PickerModule } from '@ctrl/ngx-emoji-mart'
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';

import { ChatService } from './chat.service';
import { HttpClientModule } from '@angular/common/http';


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
    HttpClientModule,
    ToastrModule.forRoot(),
    // EmojiPickerModule
    // PickerModule
    MalihuScrollbarModule.forRoot()
    
  ],
  providers: [
    LoginGuard,
    ChatService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
