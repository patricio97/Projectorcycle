import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BdserviceService } from './../serviceBD/servicebasedatos.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.page.html',
  styleUrls: ['./edit-post.page.scss'],
})
export class ModificarPage implements OnInit {
  idNoticia = "";
  tituloNoticia = "";
  textoNoticia = "";

  constructor(private router: Router, private activedRouter: ActivatedRoute, private servicio: BdserviceService) { 
    this.activedRouter.queryParams.subscribe(param=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.idNoticia = this.router.getCurrentNavigation()?.extras?.state?.['idEnviado'];
        this.textoNoticia = this.router.getCurrentNavigation()?.extras?.state?.['textoEnviado'];
        this.tituloNoticia = this.router.getCurrentNavigation()?.extras?.state?.['tituloEnviado'];
      }
    })
  }

  ngOnInit() {
  }
  editar(){
    this.servicio.modificarNoticias(this.idNoticia,this.tituloNoticia,this.textoNoticia);
    this.servicio.presentToast("Noticia Actualizada");
    this.router.navigate(['/listar']);
  }

}

