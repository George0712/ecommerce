import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-sidebar',
  imports: [RouterLink, NgClass],
  templateUrl: './cart-sidebar.html',
})
export class CartSidebarComponent {
  public cartService = inject(CartService);
  
  formatCOP(value: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(value);
  }
}
