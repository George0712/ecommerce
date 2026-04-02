import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotificationComponent } from '../../../shared/components/notification/notification';

interface NavItem {
  icon: string;
  label: string;
  route: string;
  badge?: number;
}

@Component({
  selector: 'app-admin-layout',
  imports: [CommonModule, RouterModule, NotificationComponent],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {
  sidebarCollapsed = signal(false);
  mobileMenuOpen = signal(false);

  readonly navItems: NavItem[] = [
    { icon: 'dashboard', label: 'Dashboard', route: '/admin' },
    { icon: 'inventory_2', label: 'Productos', route: '/admin/productos', badge: 24 },
    { icon: 'category', label: 'Categorías', route: '/admin/categorias' },
    { icon: 'shopping_bag', label: 'Pedidos', route: '/admin/pedidos', badge: 8 },
    { icon: 'group', label: 'Clientes', route: '/admin/clientes' },
    { icon: 'bar_chart', label: 'Reportes', route: '/admin/reportes' },
    { icon: 'settings', label: 'Configuración', route: '/admin/configuracion' },
  ];

  toggleSidebar() {
    this.sidebarCollapsed.update(v => !v);
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update(v => !v);
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }
}
