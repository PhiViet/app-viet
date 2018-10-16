import { MenuComponent } from './menu/menu.component';
import { FormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home.routes';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { MusicComponent } from './music/music.component';
import { NewsComponent } from './news/news.component';
import { DoingComponent } from './doing/doing.component';
import { OnlineComponent } from './online/online.component';
import {NgbModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import { MesagePipe } from '../pipe/sort-message.pipe';


@NgModule({
    imports: [
        HomeRoutingModule,
        CommonModule,
        FormsModule,
        NgbModule,
        NgbTooltipModule
    ],
    exports: [],
    declarations: [
        HomeComponent,
        MenuComponent,
        MesagePipe,
        ChatComponent,
        MusicComponent,
        NewsComponent,
        DoingComponent,
        OnlineComponent,
    ],
    providers: [],
})
export class HomeModule { }
