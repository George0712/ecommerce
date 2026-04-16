import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  city: string;
  totalOrders: number;
  totalSpent: string;
  lastOrder: string;
  status: 'activo' | 'inactivo' | 'nuevo';
  registeredAt: string;
  tags: string[];
}

@Component({
  selector: 'app-customers',
  imports: [CommonModule, FormsModule],
  templateUrl: './customers.html',
  styleUrl: './customers.css',
})
export class Customers {
  searchQuery = '';
  selectedStatus = '';
  selectedCity = '';
  selectAll = signal(false);
  selectedIds = signal<Set<number>>(new Set());

  readonly statuses = ['activo', 'inactivo', 'nuevo'];
  readonly cities = ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Bucaramanga'];

  readonly customers: Customer[] = [
    {
      id: 1, name: 'Camila Torres', email: 'camila.torres@email.com', phone: '+57 300 123 4567',
      avatar: '', city: 'Bogotá', totalOrders: 24, totalSpent: '$4.850.000',
      lastOrder: 'Hace 2 días', status: 'activo', registeredAt: '2025-08-15',
      tags: ['VIP', 'Frecuente'],
    },
    {
      id: 2, name: 'Andrés Gómez', email: 'andres.gomez@email.com', phone: '+57 310 234 5678',
      avatar: '', city: 'Medellín', totalOrders: 18, totalSpent: '$3.240.000',
      lastOrder: 'Hace 5 días', status: 'activo', registeredAt: '2025-09-22',
      tags: ['Frecuente'],
    },
    {
      id: 3, name: 'María López', email: 'maria.lopez@email.com', phone: '+57 320 345 6789',
      avatar: '', city: 'Cali', totalOrders: 12, totalSpent: '$2.180.000',
      lastOrder: 'Hace 1 semana', status: 'activo', registeredAt: '2025-10-10',
      tags: [],
    },
    {
      id: 4, name: 'Juan Martínez', email: 'juan.martinez@email.com', phone: '+57 315 456 7890',
      avatar: '', city: 'Barranquilla', totalOrders: 8, totalSpent: '$1.560.000',
      lastOrder: 'Hace 2 semanas', status: 'activo', registeredAt: '2025-11-05',
      tags: ['Mayorista'],
    },
    {
      id: 5, name: 'Laura Herrera', email: 'laura.herrera@email.com', phone: '+57 301 567 8901',
      avatar: '', city: 'Bogotá', totalOrders: 35, totalSpent: '$7.920.000',
      lastOrder: 'Hoy', status: 'activo', registeredAt: '2025-06-18',
      tags: ['VIP', 'Frecuente'],
    },
    {
      id: 6, name: 'Santiago Ruiz', email: 'santiago.ruiz@email.com', phone: '+57 311 678 9012',
      avatar: '', city: 'Medellín', totalOrders: 2, totalSpent: '$380.000',
      lastOrder: 'Hace 1 día', status: 'nuevo', registeredAt: '2026-03-28',
      tags: ['Nuevo'],
    },
    {
      id: 7, name: 'Valentina Díaz', email: 'valentina.diaz@email.com', phone: '+57 322 789 0123',
      avatar: '', city: 'Cartagena', totalOrders: 6, totalSpent: '$1.120.000',
      lastOrder: 'Hace 3 semanas', status: 'activo', registeredAt: '2025-12-01',
      tags: [],
    },
    {
      id: 8, name: 'Daniel Castillo', email: 'daniel.castillo@email.com', phone: '+57 316 890 1234',
      avatar: '', city: 'Bucaramanga', totalOrders: 0, totalSpent: '$0',
      lastOrder: 'Nunca', status: 'inactivo', registeredAt: '2025-07-20',
      tags: [],
    },
    {
      id: 9, name: 'Isabella Morales', email: 'isabella.morales@email.com', phone: '+57 302 901 2345',
      avatar: '', city: 'Bogotá', totalOrders: 15, totalSpent: '$2.890.000',
      lastOrder: 'Hace 4 días', status: 'activo', registeredAt: '2025-09-01',
      tags: ['Frecuente'],
    },
    {
      id: 10, name: 'Mateo Vargas', email: 'mateo.vargas@email.com', phone: '+57 318 012 3456',
      avatar: '', city: 'Cali', totalOrders: 1, totalSpent: '$189.900',
      lastOrder: 'Hace 3 días', status: 'nuevo', registeredAt: '2026-04-01',
      tags: ['Nuevo'],
    },
  ];

  get filteredCustomers(): Customer[] {
    return this.customers.filter(c => {
      const matchesSearch =
        !this.searchQuery ||
        c.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesStatus = !this.selectedStatus || c.status === this.selectedStatus;
      const matchesCity = !this.selectedCity || c.city === this.selectedCity;
      return matchesSearch && matchesStatus && matchesCity;
    });
  }

  get totalCustomers(): number { return this.customers.length; }
  get activeCustomers(): number { return this.customers.filter(c => c.status === 'activo').length; }
  get newCustomers(): number { return this.customers.filter(c => c.status === 'nuevo').length; }
  get vipCustomers(): number { return this.customers.filter(c => c.tags.includes('VIP')).length; }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  }

  getAvatarColor(id: number): string {
    const colors = ['#3b82f6', '#22c55e', '#a855f7', '#f59e0b', '#ef4444', '#e2d2bb', '#ec4899', '#06b6d4'];
    return colors[id % colors.length];
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = { activo: 'status-active', inactivo: 'status-inactive', nuevo: 'status-new' };
    return map[status] || '';
  }

  toggleSelectAll() {
    if (this.selectAll()) {
      this.selectedIds.set(new Set());
      this.selectAll.set(false);
    } else {
      this.selectedIds.set(new Set(this.filteredCustomers.map(c => c.id)));
      this.selectAll.set(true);
    }
  }

  toggleSelect(id: number) {
    const current = new Set(this.selectedIds());
    current.has(id) ? current.delete(id) : current.add(id);
    this.selectedIds.set(current);
    this.selectAll.set(current.size === this.filteredCustomers.length);
  }

  isSelected(id: number): boolean { return this.selectedIds().has(id); }

  clearFilters() {
    this.searchQuery = '';
    this.selectedStatus = '';
    this.selectedCity = '';
  }
}
