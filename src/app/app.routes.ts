import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { DetailsProduct } from './pages/details-product/details-product';
import { Category } from './pages/category/category';
import { Cart } from './pages/cart/cart';
import { Checkout } from './pages/checkout/checkout';

export const routes: Routes = [
    {
        path: '',
        component: Home,
    },
    {
        path: 'details-product/:id',
        component: DetailsProduct,
    },
    {
        path: 'categoria/:slug',
        component: Category,
    },
    {
        path: 'catalogo',
        component: Category,
    },
    {
        path: 'ofertas',
        component: Category,
    },
    {
        path: 'carrito',
        component: Cart,
    },
    {
        path: 'checkout',
        component: Checkout,
    },
    {
        path: 'admin',
        loadChildren: () =>
            import('./pages/admin/admin.routes').then(m => m.adminRoutes),
    },
    {
        path: '**',
        redirectTo: '',
    },
];
