import { MenuComponent } from './menu/menu.component';
import { FormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home.routes';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { SortPipe } from '../pipe/sort.pipe';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';


@NgModule({
    imports: [
        HomeRoutingModule,
        CommonModule,
        FormsModule
    ],
    exports: [],
    declarations: [
        HomeComponent,
        MenuComponent,
        SortPipe,
        ChatComponent,
    ],
    providers: [],
})
export class HomeModule { }
