import { Injectable, signal } from '@angular/core';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Estado reactivo que contiene al usuario actual o null
  currentUser = signal<User | null>(null);

  // Estado para controlar la visibilidad del modal de Auth
  isAuthModalOpen = signal(false);

  // Usuarios simulados (Mock) para validación rápida
  private mockUsers: User[] = [
    { id: '1', name: 'Admin', email: 'admin@sprintco.com', role: 'admin' },
    { id: '2', name: 'Juan Perez', email: 'user@sprintco.com', role: 'user' }
  ];

  constructor() {
    this.loadSession();
  }

  // --- MÉTODOS DEL MODAL ---
  openModal() {
    this.isAuthModalOpen.set(true);
  }

  closeModal() {
    this.isAuthModalOpen.set(false);
  }

  // --- MÉTODOS DE AUTENTICACIÓN ---
  
  // Login simula un inicio de sesión
  login(email: string, password?: string): boolean {
    const user = this.mockUsers.find(u => u.email === email);
    
    // Por simplicidad en el mock, cualquier password pasa si el email existe.
    if (user) {
      this.currentUser.set(user);
      this.saveSession(user);
      return true;
    }
    
    return false;
  }

  // Reistro añade un mock user
  register(name: string, email: string, password?: string): boolean {
    // Verificar si el email ya existe
    if (this.mockUsers.some(u => u.email === email)) {
      return false; // Email en uso
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role: 'user'
    };

    this.mockUsers.push(newUser);
    this.currentUser.set(newUser);
    this.saveSession(newUser);
    return true;
  }

  logout() {
    this.currentUser.set(null);
    localStorage.removeItem('sprintco_session');
    // Si la persona cierra sesión, podría ser conveniente redirigirlo al home si está en `/admin`
  }

  get isAdmin(): boolean {
    const user = this.currentUser();
    return user !== null && user.role === 'admin';
  }

  // --- PERSISTENCIA (MOCK) ---
  private saveSession(user: User) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('sprintco_session', JSON.stringify(user));
    }
  }

  private loadSession() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const session = localStorage.getItem('sprintco_session');
      if (session) {
        try {
          const user = JSON.parse(session) as User;
          this.currentUser.set(user);
        } catch (e) {
          console.error('Error parsing session', e);
        }
      }
    }
  }
}
