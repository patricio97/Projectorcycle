import { Injectable } from '@angular/core';
import { SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from './usuario';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class BdserviceService {

  public database!: SQLiteObject;
  //create tables
  tablaUsuario: string = " CREATE TABLE IF NOT EXISTS USUARIO( "+
                            "ID_USER    INTEGER PRIMARY KEY AUTOINCREMENT,"+
                            "NOMBRE		  VARCHAR(40) NOT NULL, "+
                            "APELLIDO	  VARCHAR(40) NOT NULL, "+
                            "MAIL		    VARCHAR(100) NOT NULL, "+
                            "CLAVE      VARCHAR(15) NOT NULL,"+
                            "USER       VARCHAR(15) NOT NULL);";

  tablaPost: string = "CREATE TABLE IF NOT EXISTS NOTA( "+
                        "  ID_POST      INTEGER PRIMARY KEY AUTOINCREMENT, "+
                        "  TITLE	      VARCHAR(40) NOT NULL, "+
                        "  DESCRIPTION  VARCHAR(255) NOT NULL); "+
                        "  ID_USER      INTEGER NOT NULL, ";
                        
                        //+"  FOREIGN KEY (ID_USER) REFERENCES USUARIO(ID_USER));"

  //insert 
  registrarUsuario: string = "INSERT OR IGNORE INTO USUARIO(ID_USER, NOMBRE, APELLIDO, MAIL, CLAVE, USER) VALUES(0,'Patricio','Lagos', 'pat.lagos@duocuc.cl', '12345', 'blpatricio');" ;
  registrarPost: string = "INSERT OR IGNORE INTO POST(ID_POST, TITLE, DESCRIPTION, ID_USER) VALUES(0,PRUEBA,'ESTO ES UNA POST DE PRUEBA',0);";

  //observables
  listaUsuarios = new BehaviorSubject([]);
  listaPost = new BehaviorSubject([]);

  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  
  constructor(private toastController: ToastController, private sqlite: SQLite, private platform:Platform) {
    this.crearDB();
  }

  async presentToast(msj:string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 3000,
      position: 'bottom',
      icon: 'globe',
    });

    await toast.present();
  }

  dbState(){
    return this.isDBReady.asObservable();
  }

  fetchUsuario(): Observable<Usuario[]>{
    return this.listaUsuarios.asObservable();
  }

  fetchPost(): Observable<Post[]>{
    return this.listaPost.asObservable();
  }

  crearDB(){
    this.platform.ready().then(()=>{
      this.sqlite.create({
        name: 'Rcycle.db',
        location: 'default'
      }).then((db: SQLiteObject)=>{
        this.database = db;
        this.crearTablaPost();
        this.crearTablaUsuario();
        
      }).catch(e=>{
        this.presentToast("Error en creacion de db: " + e);
      })
    })
  }

  async crearTablaUsuario(){
      try{
        await this.database.executeSql(this.tablaUsuario, []);
        await this.database.executeSql(this.registrarUsuario, []);
        this.buscarUsuario();
        this.isDBReady.next(true);
      }
      catch(e){
        this.presentToast("Error en tabla de db: " + e);
        console.log("error pesado de crear tabla usuario "+ e);
      }
  }

  async crearTablaPost(){
    try{
      await this.database.executeSql(this.tablaPost, []);
      await this.database.executeSql(this.registrarPost, []);
      this.buscarPost();
      this.isDBReady.next(true);
    }
    catch(e){
      this.presentToast("Error en tabla de db: " + e);
      console.log("error pesado de crear tabla post "+e);
    }
  }

  buscarUsuario(){
      return this.database.executeSql('SELECT * FROM USUARIO',[]).then(res=>{
        let items: Usuario[] = [];
        if(res.rows.length > 0){
          for(var i= 0; i<res.rows.length; i++){
            items.push({
              id: res.rows.item(i).ID_USER,
              nombre: res.rows.item(i).NOMBRE,
              apellido: res.rows.item(i).APELLIDO,
              mail: res.rows.item(i).MAIL,
              clave: res.rows.item(i).CLAVE,
              usuario: res.rows.item(i).USER
            })
          }
        }
        this.listaUsuarios.next(items as any);
      })
    }


  buscarPost(){
    return this.database.executeSql('SELECT * FROM POST',[]).then(res=>{
      let items: Post[] = [];
      if(res.rows.length > 0){
        for(var i= 0; i < res.rows.length; i++){
          items.push({
            id: res.rows.item(i).ID_POST,
            title: res.rows.item(i).TITLE,
            description: res.rows.item(i).DESCRIPTION,
            id_user: res.rows.item(i).ID_USER
            
          })
        }
        console.log(items);
      }
      this.listaPost.next(items as any);
    })
  }

  insertarUsuario(nombre: any, apellido:any, mail:any, clave:any, user:any){
    let data = [nombre, apellido, mail, clave, user];
    return this.database.executeSql('INSERT INTO USUARIO(NOMBRE, APELLIDO, MAIL, CLAVE, USER) VALUES(?,?,?,?,?)', data).then(res=>{
      this.buscarUsuario();
    })
  }

  insertarPost(id_usuario: any, description:any){
    let data =[id_usuario, description];
    return this.database.executeSql('INSERT INTO NOTA(ID_POST, TITLE, DESCRIPTION, ID_USER) VALUES(?,?)', data).then(res=>{
      this.buscarPost();
    })  
  }

  modificarUsuario(id:any, nombre: any, apellido:any, mail:any, clave:any, user:any){
    let data = [id, nombre, apellido, mail, clave, user];
    return this.database.executeSql('UPDATE USUARIO SET NOMBRE=?, APELLIDO=?, MAIL=? AND ID_USER=?', data).then(data2=>{
      this.buscarUsuario();
    })
  }

  modificarPost(id_post:any, title:any, description: any, id_usuario: any){
    let data =[id_post, title, description, id_usuario];
    return this.database.executeSql('UPDATE NOTA SET DESCRIPTION=? WHERE ID_POST=? AND ID_USER=?', data).then(data2=>{
      this.buscarPost();
    })
  }

  borrarPost(id_post: any){
    return this.database.executeSql('DELETE FROM NOTA WHERE ID_POST=?', [id_post]).then(a=>{
      this.buscarPost();
    })
  
  }

}
