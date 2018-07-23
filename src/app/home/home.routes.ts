import { MenuComponent } from './menu/menu.component';
import { ChatComponent } from './chat/chat.component';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '', pathMatch: 'full', component: HomeComponent,
        children: [
            { path: '', pathMatch: 'full', component: ChatComponent },
            { path: 'music', component: MenuComponent },
            // { path: 'news', component: ChatComponent },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeRoutingModule { }
