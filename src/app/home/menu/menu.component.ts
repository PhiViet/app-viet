import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public listmenu = [
    {
      name: 'Home',
      route: 'chat'
    },
    {
      name: 'Music',
      route: 'music'
    },
    {
      name: 'News',
      route: 'news'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
