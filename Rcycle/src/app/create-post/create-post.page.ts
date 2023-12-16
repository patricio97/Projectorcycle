import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BdserviceService } from './../serviceBD/servicebasedatos.service';

@Component({
  selector: 'create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
})
export class AgregarPage implements OnInit {
  tituloNoticia = "";
  textoNoticia = "";

  constructor(public router:Router, private db: BdserviceService) { }

  ngOnInit() {
  }

  insertar(){
    this.db.insertarNoticias(this.tituloNoticia,this.textoNoticia);
    this.db.presentToast("Noticia Agregada");
    this.router.navigate(['/listar']);
  }

}

