import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface KpiCard {
  icon: string;
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  color: string;
}

interface RecentOrder {
  id: string;
  customer: string;
  product: string;
  amount: string;
  status: 'completado' | 'pendiente' | 'enviado' | 'cancelado';
  date: string;
}

interface TopProduct {
  name: string;
  image: string;
  category: string;
  sold: number;
  revenue: string;
}

interface Activity {
  icon: string;
  title: string;
  description: string;
  time: string;
  color: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  currentDate = '';
  greeting = '';
  animatedBars = false;

  readonly kpiCards: KpiCard[] = [
    {
      icon: 'payments',
      label: 'Ventas Totales',
      value: '$12.450.000',
      change: 12.5,
      changeLabel: 'vs. mes anterior',
      color: 'emerald',
    },
    {
      icon: 'shopping_bag',
      label: 'Pedidos',
      value: '284',
      change: 8.2,
      changeLabel: 'vs. mes anterior',
      color: 'blue',
    },
    {
      icon: 'group',
      label: 'Clientes Nuevos',
      value: '1.240',
      change: -3.1,
      changeLabel: 'vs. mes anterior',
      color: 'purple',
    },
    {
      icon: 'trending_up',
      label: 'Tasa de Conversión',
      value: '3.24%',
      change: 5.7,
      changeLabel: 'vs. mes anterior',
      color: 'amber',
    },
  ];

  readonly salesData = [
    { day: 'Lun', value: 65, amount: '$1.850.000' },
    { day: 'Mar', value: 45, amount: '$1.280.000' },
    { day: 'Mié', value: 78, amount: '$2.220.000' },
    { day: 'Jue', value: 52, amount: '$1.480.000' },
    { day: 'Vie', value: 90, amount: '$2.560.000' },
    { day: 'Sáb', value: 100, amount: '$2.850.000' },
    { day: 'Dom', value: 38, amount: '$1.080.000' },
  ];

  readonly recentOrders: RecentOrder[] = [
    {
      id: '#ORD-2847',
      customer: 'Camila Torres',
      product: 'Nike Dri-FIT Training',
      amount: '$259.800',
      status: 'completado',
      date: 'Hace 12 min',
    },
    {
      id: '#ORD-2846',
      customer: 'Andrés Gómez',
      product: 'Adidas Shorts Running',
      amount: '$159.900',
      status: 'enviado',
      date: 'Hace 45 min',
    },
    {
      id: '#ORD-2845',
      customer: 'María López',
      product: 'Under Armour Sudadera',
      amount: '$498.000',
      status: 'pendiente',
      date: 'Hace 1 hora',
    },
    {
      id: '#ORD-2844',
      customer: 'Juan Martínez',
      product: 'Puma Leggings Compresión',
      amount: '$189.900',
      status: 'completado',
      date: 'Hace 2 horas',
    },
    {
      id: '#ORD-2843',
      customer: 'Laura Herrera',
      product: 'New Balance Running 880',
      amount: '$549.900',
      status: 'cancelado',
      date: 'Hace 3 horas',
    },
  ];

  readonly topProducts: TopProduct[] = [
    {
      name: 'Nike Air Zoom Pegasus 41',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=200&auto=format&fit=crop',
      category: 'Calzado',
      sold: 142,
      revenue: '$42.600.000',
    },
    {
      name: 'Adidas Ultraboost Light',
      image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=200&auto=format&fit=crop',
      category: 'Calzado',
      sold: 128,
      revenue: '$38.400.000',
    },
    {
      name: 'Under Armour Tech Tee',
      image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=200&auto=format&fit=crop',
      category: 'Camisetas',
      sold: 95,
      revenue: '$12.350.000',
    },
    {
      name: 'Puma Training Shorts',
      image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=200&auto=format&fit=crop',
      category: 'Shorts',
      sold: 87,
      revenue: '$10.440.000',
    },
    {
      name: 'Nike Pro Compression',
      image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=200&auto=format&fit=crop',
      category: 'Leggings',
      sold: 76,
      revenue: '$14.440.000',
    },
  ];

  readonly activities: Activity[] = [
    {
      icon: 'shopping_cart',
      title: 'Nuevo pedido recibido',
      description: 'Camila Torres compró Nike Dri-FIT Training x2',
      time: 'Hace 12 min',
      color: 'emerald',
    },
    {
      icon: 'local_shipping',
      title: 'Pedido enviado',
      description: '#ORD-2846 fue despachado vía Servientrega',
      time: 'Hace 45 min',
      color: 'blue',
    },
    {
      icon: 'person_add',
      title: 'Nuevo cliente registrado',
      description: 'Santiago Ruiz se registró desde Medellín',
      time: 'Hace 1 hora',
      color: 'purple',
    },
    {
      icon: 'inventory',
      title: 'Stock bajo',
      description: 'Nike Air Zoom Pegasus — solo 3 unidades en talla 42',
      time: 'Hace 2 horas',
      color: 'amber',
    },
    {
      icon: 'star',
      title: 'Nueva reseña',
      description: 'María López dejó 5 estrellas en Adidas Ultraboost',
      time: 'Hace 3 horas',
      color: 'emerald',
    },
  ];

  readonly quickActions = [
    { icon: 'add_circle', label: 'Agregar Producto', color: 'accent' },
    { icon: 'create_new_folder', label: 'Nueva Categoría', color: 'blue' },
    { icon: 'receipt_long', label: 'Crear Pedido', color: 'emerald' },
    { icon: 'campaign', label: 'Nueva Promoción', color: 'amber' },
  ];

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const now = new Date();
      const hour = now.getHours();
      this.greeting = hour < 12 ? 'Buenos días' : hour < 18 ? 'Buenas tardes' : 'Buenas noches';
      this.currentDate = now.toLocaleDateString('es-CO', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      // Trigger bar animation after render
      setTimeout(() => {
        this.animatedBars = true;
      }, 300);
    }
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      completado: 'status-success',
      enviado: 'status-info',
      pendiente: 'status-warning',
      cancelado: 'status-danger',
    };
    return map[status] || '';
  }

  getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      completado: 'Completado',
      enviado: 'Enviado',
      pendiente: 'Pendiente',
      cancelado: 'Cancelado',
    };
    return map[status] || status;
  }
}
