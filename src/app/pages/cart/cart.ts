import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, NgClass],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  readonly cartItems = signal([
    {
      id: 1,
      name: 'Nike Air Max 270',
      brand: 'Nike',
      price: 650000,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      color: 'Rojo/Negro',
      size: '42',
      quantity: 1,
    },
    {
      id: 2,
      name: 'adidas Ultraboost 22',
      brand: 'adidas',
      price: 890000,
      image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      color: 'Blanco',
      size: '40',
      quantity: 1,
    }
  ]);

  get cartSubtotal(): number {
    return this.cartItems().reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  get shippingCost(): number {
    return this.cartSubtotal > 1000000 ? 0 : 15000;
  }

  get cartTotal(): number {
    return this.cartSubtotal + this.shippingCost;
  }

  formatCOP(value: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(value);
  }

  increaseQuantity(id: number): void {
    this.cartItems.update(items => items.map(i => i.id === id ? { ...i, quantity: i.quantity + 1 } : i));
  }

  decreaseQuantity(id: number): void {
    this.cartItems.update(items => items.map(i => {
      if (i.id === id && i.quantity > 1) {
        return { ...i, quantity: i.quantity - 1 };
      }
      return i;
    }));
  }

  removeItem(id: number): void {
    this.cartItems.update(items => items.filter(i => i.id !== id));
  }
}
