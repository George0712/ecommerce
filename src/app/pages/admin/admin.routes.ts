import { Routes } from '@angular/router';
import { AdminLayout } from './admin-layout/admin-layout';
import { Dashboard } from './dashboard/dashboard';
import { ProductList } from './product-list/product-list';
import { ProductForm } from './product-form/product-form';
import { OrderList } from './order-list/order-list';
import { AdminNotifications } from './notifications/notifications';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminLayout,
    children: [
      {
        path: '',
        component: Dashboard,
      },
      {
        path: 'productos',
        component: ProductList,
      },
      {
        path: 'productos/nuevo',
        component: ProductForm,
      },
      {
        path: 'pedidos',
        component: OrderList,
      },
      {
        path: 'notificaciones',
        component: AdminNotifications,
      },
    ],
  },
];
