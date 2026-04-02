import { Component, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartSidebarComponent } from '../cart-sidebar/cart-sidebar';
import { MobileNavComponent } from '../mobile-nav/mobile-nav';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CartSidebarComponent, MobileNavComponent],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  public cartService = inject(CartService);

  readonly mobileOpen = signal(false);

  searchQuery = '';

  onSearchInput(event: Event): void {
    const el = event.target as HTMLInputElement;
    this.searchQuery = el.value;
  }

  toggleMobile(): void {
    this.mobileOpen.update((open) => !open);
    if (this.mobileOpen()) this.cartService.closeCart();
  }

  closeMobile(): void {
    this.mobileOpen.set(false);
  }

  toggleCart(event?: Event): void {
    if (event) event.preventDefault();
    this.cartService.toggleCart();
    if (this.cartService.isCartOpen()) this.mobileOpen.set(false);
  }
}
