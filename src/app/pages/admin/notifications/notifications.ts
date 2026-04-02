import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface AdminNotificationItem {
  id: string;
  icon: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'info' | 'error';
  date: string;
  time: string;
  read: boolean;
}

@Component({
  selector: 'app-admin-notifications',
  imports: [CommonModule, RouterModule],
  templateUrl: './notifications.html',
  styleUrl: './notifications.css',
})
export class AdminNotifications {
  selectedFilter = signal<string>('all');

  notifications = signal<AdminNotificationItem[]>([
    {
      id: 'n1',
      icon: 'shopping_bag',
      title: 'Nuevo pedido recibido',
      message: 'Laura Martínez realizó un pedido por $650.000 COP — 2 artículos.',
      type: 'success',
      date: '2026-04-02',
      time: '14:32',
      read: false,
    },
    {
      id: 'n2',
      icon: 'inventory_2',
      title: 'Stock bajo — Nike Air Zoom Pegasus 41',
      message: 'Solo quedan 3 unidades disponibles. Considera reabastecer.',
      type: 'warning',
      date: '2026-04-02',
      time: '12:15',
      read: false,
    },
    {
      id: 'n3',
      icon: 'local_shipping',
      title: 'Pedido ORD-2026-002 enviado',
      message: 'El pedido de Carlos Gómez fue despachado. Guía: SRV-887421.',
      type: 'info',
      date: '2026-04-01',
      time: '18:45',
      read: false,
    },
    {
      id: 'n4',
      icon: 'cancel',
      title: 'Pedido ORD-2026-006 cancelado',
      message: 'Andrés Castro canceló su pedido. El stock fue liberado automáticamente.',
      type: 'error',
      date: '2026-04-01',
      time: '16:20',
      read: true,
    },
    {
      id: 'n5',
      icon: 'payments',
      title: 'Pago confirmado — Wompi',
      message: 'Se confirmó el pago de $549.900 COP de Valeria Ruiz vía tarjeta de crédito.',
      type: 'success',
      date: '2026-03-31',
      time: '10:05',
      read: true,
    },
    {
      id: 'n6',
      icon: 'warning',
      title: 'Reserva de stock activa',
      message: 'Felipe Sandoval tiene 1 unidad reservada de Reebok Nano X4. Expira en 15 min.',
      type: 'warning',
      date: '2026-03-31',
      time: '09:30',
      read: true,
    },
    {
      id: 'n7',
      icon: 'person_add',
      title: 'Nuevo cliente registrado',
      message: 'Diana López se registró en la tienda desde Bucaramanga.',
      type: 'info',
      date: '2026-03-30',
      time: '20:10',
      read: true,
    },
    {
      id: 'n8',
      icon: 'thumb_up',
      title: 'Nueva reseña — 5 estrellas',
      message: 'Ana Rodríguez dejó una reseña positiva en "Under Armour Tech Tee 2.0".',
      type: 'success',
      date: '2026-03-30',
      time: '15:00',
      read: true,
    },
    {
      id: 'n9',
      icon: 'error',
      title: 'Error de pasarela de pago',
      message: 'Se detectó un error de conexión con Wompi a las 03:12 AM. Se restableció automáticamente.',
      type: 'error',
      date: '2026-03-29',
      time: '03:12',
      read: true,
    },
    {
      id: 'n10',
      icon: 'campaign',
      title: 'Campaña de descuento activa',
      message: 'La campaña "Semana Deportiva -20%" se activó exitosamente.',
      type: 'info',
      date: '2026-03-29',
      time: '00:01',
      read: true,
    },
  ]);

  readonly filters = [
    { key: 'all', label: 'Todas', icon: 'notifications' },
    { key: 'unread', label: 'No leídas', icon: 'mark_email_unread' },
    { key: 'success', label: 'Éxito', icon: 'check_circle' },
    { key: 'warning', label: 'Alertas', icon: 'warning' },
    { key: 'info', label: 'Información', icon: 'info' },
    { key: 'error', label: 'Errores', icon: 'error' },
  ];

  get filteredNotifications(): AdminNotificationItem[] {
    const filter = this.selectedFilter();
    return this.notifications().filter(n => {
      if (filter === 'all') return true;
      if (filter === 'unread') return !n.read;
      return n.type === filter;
    });
  }

  get unreadCount(): number {
    return this.notifications().filter(n => !n.read).length;
  }

  setFilter(key: string) {
    this.selectedFilter.set(key);
  }

  markAllRead() {
    this.notifications.update(list =>
      list.map(n => ({ ...n, read: true }))
    );
  }

  toggleRead(id: string) {
    this.notifications.update(list =>
      list.map(n => n.id === id ? { ...n, read: !n.read } : n)
    );
  }

  removeNotification(id: string) {
    this.notifications.update(list => list.filter(n => n.id !== id));
  }

  getTypeColor(type: string): string {
    switch (type) {
      case 'success': return '#22c55e';
      case 'warning': return '#f59e0b';
      case 'info': return '#3b82f6';
      case 'error': return '#ef4444';
      default: return '#6b6b6b';
    }
  }
}
