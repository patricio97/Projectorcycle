import { Component } from '@angular/core';
import { ApiService } from '../rcycle/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
getdata:any[]=[];
hoy = new Date();
  constructor( public _services: ApiService ) {

    this._services.getdata<any[]>("").subscribe(data => {
      this.getdata = data
      console.log(this.getdata);
    }
      
      )
  }

}
interface ScrollBaseDetail {
  isScrolling: boolean;
}
