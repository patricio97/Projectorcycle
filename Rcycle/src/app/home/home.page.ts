import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  hoy = new Date();
  constructor() {}

}
interface ScrollBaseDetail {
  isScrolling: boolean;
}