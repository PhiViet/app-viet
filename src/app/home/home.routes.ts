import { MusicComponent } from './music/music.component';
import { ChatComponent } from './chat/chat.component';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { NewsComponent } from './news/news.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '' },
    {
        path: '', component: HomeComponent,
        children: [
            { path: 'chat',pathMatch: 'full', component: ChatComponent },
            { path: 'music', component: MusicComponent },
            { path: 'news', component: NewsComponent },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeRoutingModule { }