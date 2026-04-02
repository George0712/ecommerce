import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mobile-nav',
  imports: [RouterLink],
  templateUrl: './mobile-nav.html',
})
export class MobileNavComponent {
  @Output() close = new EventEmitter<void>();

  searchQuery = '';

  onSearchInput(event: Event): void {
    const el = event.target as HTMLInputElement;
    this.searchQuery = el.value;
  }

  closeMobile(): void {
    this.close.emit();
  }
}
