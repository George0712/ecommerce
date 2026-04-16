import { Component, OnInit, Inject, PLATFORM_ID, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface SalesDataPoint {
  label: string;
  value: number;
  amount: string;
}

interface CategorySales {
  name: string;
  icon: string;
  revenue: string;
  percentage: number;
  color: string;
  orders: number;
}

interface CityData {
  city: string;
  orders: number;
  revenue: string;
  percentage: number;
}

interface PaymentMethod {
  method: string;
  icon: string;
  count: number;
  percentage: number;
  color: string;
}

@Component({
  selector: 'app-reports',
  imports: [CommonModule, FormsModule],
  templateUrl: './reports.html',
  styleUrl: './reports.css',
})
export class Reports implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  animatedBars = false;
  animatedHBars = false;
  selectedPeriod = 'mes';

  readonly periods = [
    { value: '7dias', label: 'Últimos 7 días' },
    { value: '30dias', label: 'Últimos 30 días' },
    { value: 'mes', label: 'Este mes' },
    { value: 'trimestre', label: 'Este trimestre' },
    { value: 'año', label: 'Este año' },
  ];

  // KPI Summary
  readonly kpis = [
    {
      icon: 'payments',
      label: 'Ingresos Totales',
      value: '$48.750.000',
      change: 14.2,
      changeLabel: 'vs. periodo anterior',
      color: 'emerald',
    },
    {
      icon: 'shopping_bag',
      label: 'Total Pedidos',
      value: '1.284',
      change: 8.5,
      changeLabel: 'vs. periodo anterior',
      color: 'blue',
    },
    {
      icon: 'receipt_long',
      label: 'Ticket Promedio',
      value: '$379.900',
      change: 5.3,
      changeLabel: 'vs. periodo anterior',
      color: 'purple',
    },
    {
      icon: 'undo',
      label: 'Tasa de Devolución',
      value: '2.1%',
      change: -0.4,
      changeLabel: 'vs. periodo anterior',
      color: 'amber',
    },
  ];

  // Revenue Chart - Monthly
  readonly monthlyRevenue: SalesDataPoint[] = [
    { label: 'Ene', value: 45, amount: '$3.200.000' },
    { label: 'Feb', value: 58, amount: '$4.100.000' },
    { label: 'Mar', value: 42, amount: '$2.980.000' },
    { label: 'Abr', value: 65, amount: '$4.600.000' },
    { label: 'May', value: 78, amount: '$5.530.000' },
    { label: 'Jun', value: 55, amount: '$3.900.000' },
    { label: 'Jul', value: 82, amount: '$5.810.000' },
    { label: 'Ago', value: 70, amount: '$4.960.000' },
    { label: 'Sep', value: 88, amount: '$6.240.000' },
    { label: 'Oct', value: 95, amount: '$6.730.000' },
    { label: 'Nov', value: 100, amount: '$7.090.000' },
    { label: 'Dic', value: 72, amount: '$5.100.000' },
  ];

  // Orders Trend - Weekly
  readonly weeklyOrders: SalesDataPoint[] = [
    { label: 'Lun', value: 65, amount: '42' },
    { label: 'Mar', value: 45, amount: '29' },
    { label: 'Mié', value: 78, amount: '50' },
    { label: 'Jue', value: 52, amount: '34' },
    { label: 'Vie', value: 90, amount: '58' },
    { label: 'Sáb', value: 100, amount: '65' },
    { label: 'Dom', value: 38, amount: '25' },
  ];

  // Category Sales
  readonly categorySales: CategorySales[] = [
    { name: 'Calzado', icon: 'steps', revenue: '$18.400.000', percentage: 38, color: 'accent', orders: 312 },
    { name: 'Camisetas', icon: 'checkroom', revenue: '$9.750.000', percentage: 20, color: 'blue', orders: 198 },
    { name: 'Sudaderas', icon: 'apparel', revenue: '$7.300.000', percentage: 15, color: 'purple', orders: 145 },
    { name: 'Shorts', icon: 'styler', revenue: '$5.850.000', percentage: 12, color: 'emerald', orders: 120 },
    { name: 'Leggings', icon: 'accessibility_new', revenue: '$4.380.000', percentage: 9, color: 'amber', orders: 87 },
    { name: 'Accesorios', icon: 'backpack', revenue: '$2.920.000', percentage: 6, color: 'danger', orders: 65 },
  ];

  // Top Cities
  readonly topCities: CityData[] = [
    { city: 'Bogotá', orders: 425, revenue: '$16.200.000', percentage: 33 },
    { city: 'Medellín', orders: 312, revenue: '$11.900.000', percentage: 24 },
    { city: 'Cali', orders: 198, revenue: '$7.550.000', percentage: 15 },
    { city: 'Barranquilla', orders: 142, revenue: '$5.420.000', percentage: 11 },
    { city: 'Cartagena', orders: 98, revenue: '$3.740.000', percentage: 8 },
    { city: 'Bucaramanga', orders: 65, revenue: '$2.480.000', percentage: 5 },
    { city: 'Otras', orders: 44, revenue: '$1.460.000', percentage: 4 },
  ];

  // Payment Methods
  readonly paymentMethods: PaymentMethod[] = [
    { method: 'Tarjeta de crédito', icon: 'credit_card', count: 542, percentage: 42, color: 'blue' },
    { method: 'PSE', icon: 'account_balance', count: 385, percentage: 30, color: 'emerald' },
    { method: 'Nequi', icon: 'phone_iphone', count: 218, percentage: 17, color: 'purple' },
    { method: 'Contra entrega', icon: 'local_shipping', count: 139, percentage: 11, color: 'amber' },
  ];

  // Hourly traffic
  readonly hourlyTraffic = [
    { hour: '6am', value: 12 }, { hour: '7am', value: 18 }, { hour: '8am', value: 35 },
    { hour: '9am', value: 55 }, { hour: '10am', value: 72 }, { hour: '11am', value: 68 },
    { hour: '12pm', value: 80 }, { hour: '1pm', value: 65 }, { hour: '2pm', value: 58 },
    { hour: '3pm', value: 62 }, { hour: '4pm', value: 48 }, { hour: '5pm', value: 55 },
    { hour: '6pm', value: 78 }, { hour: '7pm', value: 92 }, { hour: '8pm', value: 100 },
    { hour: '9pm', value: 85 }, { hour: '10pm', value: 52 }, { hour: '11pm', value: 25 },
  ];

  // Performance metrics
  readonly performanceMetrics = [
    { label: 'Tasa de conversión', value: '3.24%', icon: 'conversion_path', change: 5.7, color: 'emerald' },
    { label: 'Carrito abandonado', value: '68.2%', icon: 'remove_shopping_cart', change: -2.1, color: 'danger' },
    { label: 'Clientes recurrentes', value: '34.8%', icon: 'loyalty', change: 8.3, color: 'blue' },
    { label: 'Valor de vida (LTV)', value: '$1.240.000', icon: 'diamond', change: 12.1, color: 'purple' },
    { label: 'Tiempo en sitio', value: '4:32 min', icon: 'timer', change: 3.2, color: 'amber' },
    { label: 'Satisfacción', value: '4.7/5', icon: 'star', change: 0.3, color: 'accent' },
  ];

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.animatedBars = true, 300);
      setTimeout(() => this.animatedHBars = true, 600);
    }
  }

  getTrafficClass(value: number): string {
    if (value >= 80) return 'traffic-high';
    if (value >= 50) return 'traffic-medium';
    return 'traffic-low';
  }
}
