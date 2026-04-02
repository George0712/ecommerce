import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../../shared/services/notification.service';

export interface AdminOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  total: number;
  itemsCount: number;
  date: string;
  paymentMethod: string;
  status: 'pagado' | 'enviado' | 'entregado' | 'cancelado' | 'esperando-pago-reserva' | 'pendiente';
  location: string;
}

@Component({
  selector: 'app-order-list',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './order-list.html',
  styleUrl: './order-list.css',
})
export class OrderList {
  searchQuery = '';
  selectedStatus = '';
  selectAll = signal(false);
  selectedIds = signal<Set<string>>(new Set());
  currentView = signal<'grid' | 'table'>('table');
  
  notificationService = inject(NotificationService);

  readonly statuses = ['pagado', 'enviado', 'entregado', 'cancelado', 'esperando-pago-reserva', 'pendiente'];

  // Mock data as requested
  readonly orders: AdminOrder[] = [
    {
      id: 'ORD-2026-001',
      customerName: 'Laura Martínez',
      customerEmail: 'laura.mart@email.com',
      total: 650000,
      itemsCount: 2,
      date: '2026-04-02',
      paymentMethod: 'Wompi - Tarjeta',
      status: 'pagado',
      location: 'Bogotá D.C.'
    },
    {
      id: 'ORD-2026-002',
      customerName: 'Carlos Gómez',
      customerEmail: 'carlos.g@email.com',
      total: 1250000,
      itemsCount: 4,
      date: '2026-04-01',
      paymentMethod: 'PSE - Bancolombia',
      status: 'enviado',
      location: 'Medellín, Antioquia'
    },
    {
      id: 'ORD-2026-003',
      customerName: 'Ana Rodríguez',
      customerEmail: 'ana.rodro@email.com',
      total: 89000,
      itemsCount: 1,
      date: '2026-04-01',
      paymentMethod: 'Nequi',
      status: 'entregado',
      location: 'Cali, Valle del Cauca'
    },
    {
      id: 'ORD-2026-004',
      customerName: 'Felipe Sandoval',
      customerEmail: 'f.sandoval99@email.com',
      total: 890000,
      itemsCount: 1,
      date: '2026-03-31',
      paymentMethod: 'Pendiente',
      status: 'esperando-pago-reserva',
      location: 'Barranquilla, Atlántico'
    },
    {
      id: 'ORD-2026-005',
      customerName: 'Diana López',
      customerEmail: 'diana.l@email.com',
      total: 329000,
      itemsCount: 2,
      date: '2026-03-30',
      paymentMethod: 'Contra Entrega',
      status: 'pendiente',
      location: 'Bucaramanga, Santander'
    },
    {
      id: 'ORD-2026-006',
      customerName: 'Andrés Castro',
      customerEmail: 'acastro.dev@email.com',
      total: 450000,
      itemsCount: 2,
      date: '2026-03-30',
      paymentMethod: 'Wompi - Nequi',
      status: 'cancelado',
      location: 'Cartagena, Bolívar'
    },
    {
      id: 'ORD-2026-007',
      customerName: 'Valeria Ruiz',
      customerEmail: 'vruiz.design@email.com',
      total: 549900,
      itemsCount: 1,
      date: '2026-03-29',
      paymentMethod: 'Wompi - Tarjeta',
      status: 'pagado',
      location: 'Bogotá D.C.'
    }
  ];

  get filteredOrders(): AdminOrder[] {
    return this.orders.filter(o => {
      const matchesSearch =
        !this.searchQuery ||
        o.id.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        o.customerName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        o.customerEmail.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesStatus = !this.selectedStatus || o.status === this.selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }

  get totalOrders(): number {
    return this.orders.length;
  }

  get pendingOrders(): number {
    return this.orders.filter(o => o.status === 'pendiente' || o.status === 'esperando-pago-reserva').length;
  }

  get shippedOrders(): number {
    return this.orders.filter(o => o.status === 'enviado').length;
  }
  
  get revenue(): number {
    return this.orders.filter(o => o.status === 'pagado' || o.status === 'enviado' || o.status === 'entregado')
      .reduce((acc, order) => acc + order.total, 0);
  }

  formatCOP(value: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(value);
  }

  toggleSelectAll() {
    if (this.selectAll()) {
      this.selectedIds.set(new Set());
      this.selectAll.set(false);
    } else {
      const allIds = new Set(this.filteredOrders.map(o => o.id));
      this.selectedIds.set(allIds);
      this.selectAll.set(true);
    }
  }

  toggleSelect(id: string) {
    const current = new Set(this.selectedIds());
    if (current.has(id)) {
      current.delete(id);
    } else {
      current.add(id);
    }
    this.selectedIds.set(current);
    this.selectAll.set(current.size === this.filteredOrders.length);
  }

  isSelected(id: string): boolean {
    return this.selectedIds().has(id);
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      'pagado': 'status-success',
      'entregado': 'status-success',
      'enviado': 'status-info',
      'pendiente': 'status-warning',
      'esperando-pago-reserva': 'status-warning-reserved',
      'cancelado': 'status-danger',
    };
    return map[status] || '';
  }

  getDisplayStatus(status: string): string {
    const map: Record<string, string> = {
      'pagado': 'Pagado',
      'entregado': 'Entregado',
      'enviado': 'Enviado',
      'pendiente': 'Pendiente',
      'esperando-pago-reserva': 'Reserva Stock',
      'cancelado': 'Cancelado',
    };
    return map[status] || status;
  }

  clearFilters() {
    this.searchQuery = '';
    this.selectedStatus = '';
  }

  setView(view: 'grid' | 'table') {
    this.currentView.set(view);
  }

  // --- Bulk Actions ---
  markAsShipped() {
    const count = this.selectedIds().size;
    if (count > 0) {
      this.notificationService.success(
        'Pedidos Actualizados', 
        `Se han marcado ${count} pedido(s) como enviados con éxito.`
      );
      this.selectedIds.set(new Set());
      this.selectAll.set(false);
    }
  }

  printGuides() {
    const count = this.selectedIds().size;
    if (count > 0) {
      this.notificationService.info(
        'Descarga Iniciada', 
        `Se están generando las guías para ${count} pedido(s).`
      );
    }
  }

  cancelOrders() {
    const count = this.selectedIds().size;
    if (count > 0) {
      this.notificationService.error(
        'Pedidos Cancelados', 
        `Has cancelado ${count} pedido(s) del sistema.`
      );
      this.selectedIds.set(new Set());
      this.selectAll.set(false);
    }
  }
}
