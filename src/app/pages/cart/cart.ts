import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, NgClass],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  public cartService = inject(CartService);

  readonly shippingCost = computed(() => {
    return this.cartService.cartSubtotal() > 1000000 ? 0 : 15000;
  });

  readonly cartTotal = computed(() => {
    return this.cartService.cartSubtotal() + this.shippingCost();
  });

  formatCOP(value: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(value);
  }
}
