import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {


  constructor(private activerouter: ActivatedRoute, private router: Router){

  }

  inicio(){
    this.router.navigate(['/home'])
  }

  ngOnInit() {
  }

}
