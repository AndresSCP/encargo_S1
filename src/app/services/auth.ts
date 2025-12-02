import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Dataservice, Usuario } from './dataservice';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private currentUser: string = '';
  private currentUserData: Usuario | null = null;

  constructor(
    private router: Router,
    private dataService: Dataservice
  ) {
    // Verificar sesión guardada
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.isAuthenticated = true;
      this.currentUser = savedUser;
      this.loadUserData();
    }
  }

  // Cargar datos del usuario desde BD
  private async loadUserData() {
    this.currentUserData = await this.dataService.obtenerUsuario(this.currentUser);
  }

  // REGISTRAR nuevo usuario
  // Se elimina el parámetro 'nombre'
  async register(usuario: string, password: string, email: string): Promise<boolean> {
    const nuevoUsuario: Usuario = {
      usuario: usuario,
      password: password,
      email: email,
      // Se asigna el nombre de usuario como el valor para 'nombre'
      nombre: usuario
    };

    return await this.dataService.registrarUsuario(nuevoUsuario);
  }

  // LOGIN
  async login(usuario: string, password: string): Promise<boolean> {
    const usuarioEncontrado = await this.dataService.validarLogin(usuario, password);

    if (usuarioEncontrado) {
      this.isAuthenticated = true;
      this.currentUser = usuario;
      this.currentUserData = usuarioEncontrado;
      localStorage.setItem('currentUser', usuario);
      return true;
    }
    
    return false;
  }

  logout() {
    this.isAuthenticated = false;
    this.currentUser = '';
    this.currentUserData = null;
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getCurrentUser(): string {
    return this.currentUser;
  }

  getCurrentUserName(): string {
    return this.currentUserData?.nombre || this.currentUser;
  }

  getCurrentUserData(): Usuario | null {
    return this.currentUserData;
  }
}