import { Routes } from '@angular/router';
import { AdminLayout } from './admin-layout/admin-layout';
import { Dashboard } from './dashboard/dashboard';
import { ProductList } from './product-list/product-list';
import { ProductForm } from './product-form/product-form';
import { OrderList } from './order-list/order-list';
import { AdminNotifications } from './notifications/notifications';
import { CategoryList } from './category-list/category-list';
import { CategoryForm } from './category-form/category-form';
import { Reports } from './reports/reports';
import { Customers } from './customers/customers';
import { Settings } from './settings/settings';

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
        path: 'categorias',
        component: CategoryList,
      },
      {
        path: 'categorias/nueva',
        component: CategoryForm,
      },
      {
        path: 'pedidos',
        component: OrderList,
      },
      {
        path: 'clientes',
        component: Customers,
      },
      {
        path: 'reportes',
        component: Reports,
      },
      {
        path: 'configuracion',
        component: Settings,
      },
      {
        path: 'notificaciones',
        component: AdminNotifications,
      },
    ],
  },
];
