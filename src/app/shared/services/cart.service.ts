import { Injectable, signal, computed } from '@angular/core';

export interface CartItem {
  id: number | string;
  name: string;
  brand: string;
  price: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  readonly isCartOpen = signal(false);
  
  readonly cartItems = signal<CartItem[]>([
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

  readonly cartCount = computed(() => this.cartItems().length);

  readonly cartSubtotal = computed(() => 
    this.cartItems().reduce((acc, item) => acc + item.price * item.quantity, 0)
  );

  toggleCart(): void {
    this.isCartOpen.update((open) => !open);
  }

  closeCart(): void {
    this.isCartOpen.set(false);
  }

  increaseQuantity(id: number | string): void {
    this.cartItems.update(items => items.map(i => i.id === id ? { ...i, quantity: i.quantity + 1 } : i));
  }

  decreaseQuantity(id: number | string): void {
    this.cartItems.update(items => items.map(i => {
      if (i.id === id && i.quantity > 1) {
        return { ...i, quantity: i.quantity - 1 };
      }
      return i;
    }));
  }

  removeItem(id: number | string): void {
    this.cartItems.update(items => items.filter(i => i.id !== id));
  }

  addItem(item: CartItem): void {
    this.cartItems.update(items => {
      const existing = items.find(i => i.id === item.id && i.color === item.color && i.size === item.size);
      if (existing) {
        return items.map(i => i === existing ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...items, item];
    });
    this.isCartOpen.set(true);
  }
}
