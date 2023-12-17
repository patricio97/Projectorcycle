import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BdserviceService } from '../services/bdservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public alertButtons = ['OK'];

  clave2: string="";
  nombre: string="";
  apellido: string="";
  mail: string="";
  clave: string="";
  usuario: string="";

  constructor(private activerouter: ActivatedRoute, private router: Router, private alertController: AlertController , private servicioBD: BdserviceService) { }
  arregloUsuario: any = [
    {
      nombre:'',
      apellido:'',
      mail:'',
      nivel_educ:'',
      clave:'',
      usuario:''
    }
  ]

  registrar(){
    let navigationExtras: NavigationExtras ={
      state: {
        nombre: this.nombre,
        apellido:this.apellido,
        mail:this.mail,
        clave:this.clave,
        usuario:this.usuario    
      }
    }
    this.router.navigate(['/login'], navigationExtras);
  }

  async presentAlert(msj: string) {
    const alert = await this.alertController.create({
      header: 'Saludos!',
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }
  ngOnInit() {
    this.servicioBD.dbState().subscribe(res=>{
      if(res){
        this.servicioBD.fetchUsuario().subscribe(item=>{
          this.arregloUsuario = item;
        })
      }
    })
  }

  insertar(){    
    this.servicioBD.insertarUsuario(this.nombre, this.apellido, this.mail, this.clave, this.usuario);
    this.registrar();
    this.servicioBD.presentToast("Usuario Creado");
  }

}