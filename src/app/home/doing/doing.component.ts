import { Component, OnInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-doing',
  templateUrl: './doing.component.html',
  styleUrls: ['./doing.component.css']
})
export class DoingComponent implements OnInit, OnDestroy{

  public doing = 'Doing';
  constructor() { }
  private setDotLoading
  @Input() name: String;
  ngOnInit() {
  }

  ngOnDestroy() {
    // this.setDotLoading.
  }
  
}
