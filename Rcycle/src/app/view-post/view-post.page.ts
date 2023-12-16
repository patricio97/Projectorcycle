import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BdserviceService } from './../serviceBD/servicebasedatos.service';


@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.page.html',
  styleUrls: ['./view-post.page.scss'],
})
export class ListarPage implements OnInit {

  hoy = new Date();

  arregloNoticias: any = [
      {
        id: '',
        titulo: '',
        texto: ''
      }
    ]
    constructor(private router: Router, private servicioBD: BdserviceService) { }

    ngOnInit() {
      this.servicioBD.dbState().subscribe(res=>{
        if(res){
    	    this.servicioBD.fetchNoticias().subscribe(item=>{
    	      this.arregloNoticias = item;
    	    })
    	  }
    	})
    }
    	
    obtenerTexto($event: any){
    	const valor = $event.target.value;
    	console.log("Texto escrito: " + valor);
    }
    	
    modificar(x:any){
    	let navigationExtras: NavigationExtras = {
    	  state: {
    	    idEnviado: x.id,
    	    tituloEnviado: x.titulo,
    	    textoEnviado: x.texto
        }
    	  }
    	
    	  this.router.navigate(['/modificar'], navigationExtras);
    }
    eliminar(x:any){
    	this.servicioBD.eliminarNoticias(x.id);
    	this.servicioBD.presentToast("Noticia Eliminada");
    }
  }
    
