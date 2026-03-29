import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  readonly mobileOpen = signal(false);
  /** Cantidad de ítems en carrito (conectar con tu estado real más adelante). */
  readonly cartCount = signal(1);

  searchQuery = '';

  onSearchInput(event: Event): void {
    const el = event.target as HTMLInputElement;
    this.searchQuery = el.value;
  }

  toggleMobile(): void {
    this.mobileOpen.update((open) => !open);
  }

  closeMobile(): void {
    this.mobileOpen.set(false);
  }
}
