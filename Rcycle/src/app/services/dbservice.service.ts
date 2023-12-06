import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';



@Injectable({

 providedIn: 'root'

})

export class ApiService {

 private apiUrl = 'https://api.ejemplo.com';



 constructor(private http: HttpClient) { }



 obtenerDatos() {

  return this.http.get(`${this.apiUrl}/datos`);

 }



 enviarDatos(datos: any) {

  return this.http.post(`${this.apiUrl}/datos`, datos);

 }

}