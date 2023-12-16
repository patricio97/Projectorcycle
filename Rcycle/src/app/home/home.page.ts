import { Component } from '@angular/core';
import { ApiclientService } from '../service/apiclient.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user:any;
  users:any;
  posts:any;
  post:any={
    id:null,
    title:"",
    body:"",
    userID:null
  };
  compareWith:any;

  
  hoy = new Date();
  constructor(private api: ApiclientService) {}

  ionViewWillEnter(){
    this.getUsuarios();
    this.getPosts();
  }

  ngOnInInit() { }

  getUsuario(userID:any){
    this.api.getUsuario(userID).subscribe((data)=>{
      console.log(data)
      this.user=data;
    });
  }
  getUsuarios(){
    this.api.getUsuarios().subscribe((data)=>{
      this.users=data;
    });
  }
  getPosts(){
    this.api.getPosts().subscribe((data)=>{
      this.posts=data;
      this.posts.reverse();
    });
  }
  guardarPost(){
    if(this.post.userID==null){
      if(this.user==undefined){
        console.log("Seleccione un usuario");
        return;
      }
      this.post.userID=this.user.id;
      this.api.createPost(this.post).subscribe(
        ()=>{
          console.log();
        },
        error=>{
          console.log("Error "+error)
        }
      );
    }
    else{
      this.api.updatePost(this.post.id,this.post).subscribe(
        ()=>{
          console.log("Actualizado Correctamente");
          this.getPosts();
        },
        error=>{
          console.log("Error "+error)
        }
      );
    }
  }
  setPost(_post:any){
    this.post=_post;
    this.getUsuario(_post.userID);
    this.compareWith = this.comparewithFn;
  }
  eliminarPost(_post:any){
    console.log("eliminar")
    this.api.deletePost(_post.id).subscribe(
      success=>{
        console.log("Eliminado correctamente");
        this.getPosts();
      },
      error=>{
        console.log("Error "+error)
      }
    )
  }
  comparewithFn = (o1:any, o2:any) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

}


interface ScrollBaseDetail {
  isScrolling: boolean;
}