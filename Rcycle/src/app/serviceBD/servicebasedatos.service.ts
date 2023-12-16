import { Noticia } from './../servicesN/noticia';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class BdserviceService {

  // variable para manipular la conexion a la base de datos
  public database!: SQLiteObject;
  //variable para la sentencia de creación de tabla
  tablaNoticia: string = "CREATE TABLE IF NOT EXISTS noticia(id_noticia INTEGER PRIMARY KEY autoincrement, titulo VARCHAR(40) NOT NULL, texto TEXT NOT NULL);";
  //variable para la sentencia de registros por defecto en la tabla
  registroNoticia: string = "INSERT or IGNORE INTO noticia(id_noticia,titulo,texto) VALUES (1,'Feriado Halloween','Este feriado sera mas largo que el anterior');";
  //observable para manipular todos los registros de la tabla noticia
  listaNoticias = new BehaviorSubject([]);
  //observable para manipular si la BD esta lista  o no para su manipulación
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  
  constructor(private sqlite: SQLite, private platform: Platform, private toastController: ToastController, private alertController: AlertController) { 
    this.crearBD();
  }

  async presentToast(msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 3000,
      icon: 'globe'
    });

    await toast.present();
  }

  dbState() {
    return this.isDBReady.asObservable();
  }

  fetchNoticias(): Observable<Noticia[]> {
    return this.listaNoticias.asObservable();
  }

  crearBD() {
    //verificamos que la plataforma este lista
    this.platform.ready().then(() => {
      //creamos la BD
      this.sqlite.create({
        name: 'bdnoticias.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        //guardamos la conexion a la BD en la variable propia
        this.database = db;
        //llamar a la funcion para crear las tablas
        this.crearTablas();
      }).catch(e => {
        //muestro el mensaje de error en caso de ocurrir alguno
        this.presentToast("Error BD:" + e);
      })
    })
  }

  async crearTablas() {
    try {
      //ejecuto mis tablas
      await this.database.executeSql(this.tablaNoticia, []);
      //ejecuto mis registros
      await this.database.executeSql(this.registroNoticia, []);
      //cargar todos los registros de la tabla en el observable
      this.buscarNoticias();
      //actualizar el status de la BD
      this.isDBReady.next(true);

    } catch (e) {
      this.presentToast("Error Tablas: " + e);
    }

  }

  buscarNoticias() {
    //retorno la ejecución del select
    return this.database.executeSql('SELECT * FROM noticia', []).then(res => {
      //creo mi lista de objetos de noticias vacio
      let items: Noticia[] = [];
      //si cuento mas de 0 filas en el resultSet entonces agrego los registros al items
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id_noticia,
            titulo: res.rows.item(i).titulo,
            texto: res.rows.item(i).texto
          })
        }

      }
      //actualizamos el observable de las noticias
      this.listaNoticias.next(items as any);
    })
  }

  insertarNoticias(titulo: any, texto: any){
    let data = [titulo,texto];
    return this.database.executeSql('INSERT INTO noticia(titulo,texto) VALUES (?,?)',data).then(res=>{
      this.buscarNoticias();
    });

  }

  modificarNoticias(id: any,titulo: any,texto: any){
    let data = [titulo,texto,id];
    return this.database.executeSql('UPDATE noticia SET titulo = ?, texto = ? WHERE id_noticia = ?',data).then(data2=>{
      this.buscarNoticias();
    })
  }

  eliminarNoticias(id: any){

    return this.database.executeSql('DELETE FROM noticia WHERE id_noticia = ?',[id]).then(a=>{
      this.buscarNoticias();
    })

  }

  async presentAlert(msj:string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }
}

