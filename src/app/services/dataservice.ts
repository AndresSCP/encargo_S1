import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Usuario {
  id?: number;
  usuario: string;
  password: string;
  email: string;
  nombre?: string;
}

@Injectable({
  providedIn: 'root'
})
export class Dataservice {

  public db!: SQLiteObject;

  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private sqlite: SQLite, private toastController: ToastController) { 
    this.initializeDatabase();
  }
  
  private initializeDatabase() {
    this.sqlite.create({
      name: 'dailyflow.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      this.db = db;
      this.createTables();
      this.isDBReady.next(true);  
      this.presentToast('Base de datos inicializada correctamente');
    })
    .catch(error => {
      this.presentToast('Error al crear la base de datos: ' + error);
    });
  }

  private createTables() {
    this.db.executeSql(
      `CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        nombre TEXT
      )`, []
    )
.then(() => {
      this.presentToast('Tabla de usuarios creada correctamente');
      
      // ✅ AÑADIR CÓDIGO DE INSERCIÓN DE PRUEBA:
      const queryCheck = 'SELECT count(*) as count FROM usuarios WHERE usuario = ?';
      this.db.executeSql(queryCheck, ['test'])
        .then(resultCheck => {
          if (resultCheck.rows.item(0).count === 0) {
             const queryInsert = 'INSERT INTO usuarios (usuario, password, email, nombre) VALUES (?, ?, ?, ?)';
             return this.db.executeSql(queryInsert, ['test', '1234', 'test@test.com', 'Usuario Prueba']);
          }
          return Promise.resolve();
        })
        .then(() => {
          this.presentToast('Usuario de prueba "test/1234" asegurado.');
        })
        .catch(error => {
          console.error('Error al insertar usuario de prueba:', error);
        });
    })
    .catch(error => {
      this.presentToast('Error al crear tabla de usuarios: ' + error);
    });
  }

  // Observar estado de la BD
  dbState(): Observable<boolean> {
    return this.isDBReady.asObservable();
  }

  // REGISTRAR usuario
  async registrarUsuario(usuario: Usuario): Promise<boolean> {
    try {
      const query = 'INSERT INTO usuarios (usuario, password, email, nombre) VALUES (?, ?, ?, ?)';
      await this.db.executeSql(query, [
        usuario.usuario,
        usuario.password,
        usuario.email,
        usuario.nombre || usuario.usuario
      ]);
      this.presentToast('Usuario registrado correctamente');
      return true;
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      this.presentToast('Error: El usuario o email ya existe');
      return false;
    }
  }

  // VALIDAR login
  async validarLogin(usuario: string, password: string): Promise<Usuario | null> {
    try {
      const query = 'SELECT * FROM usuarios WHERE usuario = ? AND password = ?';
      const result = await this.db.executeSql(query, [usuario, password]);
      
      if (result.rows.length > 0) {
        return {
          id: result.rows.item(0).id,
          usuario: result.rows.item(0).usuario,
          password: result.rows.item(0).password,
          email: result.rows.item(0).email,
          nombre: result.rows.item(0).nombre
        };
      }
      return null;
    } catch (error) {
      console.error('Error al validar login:', error);
      return null;
    }
  }

  // OBTENER usuario por nombre de usuario
  async obtenerUsuario(usuario: string): Promise<Usuario | null> {
    try {
      const query = 'SELECT * FROM usuarios WHERE usuario = ?';
      const result = await this.db.executeSql(query, [usuario]);
      
      if (result.rows.length > 0) {
        return {
          id: result.rows.item(0).id,
          usuario: result.rows.item(0).usuario,
          password: result.rows.item(0).password,
          email: result.rows.item(0).email,
          nombre: result.rows.item(0).nombre
        };
      }
      return null;
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      return null;
    }
  }

  // ACTUALIZAR usuario
  async actualizarUsuario(id: number, datos: Partial<Usuario>): Promise<boolean> {
    try {
      const query = 'UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?';
      await this.db.executeSql(query, [datos.nombre, datos.email, id]);
      this.presentToast('Usuario actualizado correctamente');
      return true;
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      this.presentToast('Error al actualizar usuario');
      return false;
    }
  }

  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}