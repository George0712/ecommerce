import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { DetailsProduct } from './pages/details-product/details-product';
import { Category } from './pages/category/category';

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
        path: '**',
        redirectTo: '',
    },
];
