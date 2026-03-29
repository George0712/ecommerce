import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface ProductCardData {
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  imageClass?: string;
  href: string;
  badge?: string;
  isNew?: boolean;
}

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCard {
  @Input({ required: true }) product!: ProductCardData;
  @Input() layoutClasses = ''; 

  formatCOP(value: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(value);
  }
}
