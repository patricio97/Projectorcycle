import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BdserviceService } from '../services/bdservice.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
})
export class CreatePostPage implements OnInit {
  title='';
  description = '';
  

  constructor(public router:Router, private db: BdserviceService) { }

  ngOnInit() {
  }

  insertar(){
    this.db.insertarPost(this.title, this.description);
    this.db.presentToast("Post Agregado");
    this.router.navigate(['/home']);
  }

}
