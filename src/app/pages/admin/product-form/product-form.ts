import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../../shared/services/category.service';

interface ProductColor {
  name: string;
  hex: string;
  selected: boolean;
}

interface ProductSize {
  label: string;
  selected: boolean;
}

@Component({
  selector: 'app-product-form',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm {
  private categoryService = inject(CategoryService);
  // Basic Info
  productName = '';
  productDescription = '';
  productBrand = '';
  productSku = '';
  productBarcode = '';

  // Pricing
  productPrice = '';
  productComparePrice = '';
  productCost = '';

  // Inventory
  productStock = '';
  trackInventory = true;
  continueSellingOutOfStock = false;

  // Organization
  selectedCategory = '';
  selectedSubcategory = '';
  productTags = '';
  productStatus: 'activo' | 'borrador' = 'borrador';

  // Media
  productImages = signal<string[]>([]);
  dragOver = signal(false);

  // Variants
  readonly availableColors: ProductColor[] = [
    { name: 'Negro', hex: '#1a1a1a', selected: false },
    { name: 'Blanco', hex: '#f5f5f5', selected: false },
    { name: 'Azul', hex: '#3b82f6', selected: false },
    { name: 'Rojo', hex: '#ef4444', selected: false },
    { name: 'Verde', hex: '#22c55e', selected: false },
    { name: 'Gris', hex: '#9ca3af', selected: false },
    { name: 'Naranja', hex: '#f97316', selected: false },
    { name: 'Rosa', hex: '#ec4899', selected: false },
  ];

  readonly availableSizes: ProductSize[] = [
    { label: 'XS', selected: false },
    { label: 'S', selected: false },
    { label: 'M', selected: false },
    { label: 'L', selected: false },
    { label: 'XL', selected: false },
    { label: 'XXL', selected: false },
  ];

  get categories(): string[] {
    return this.categoryService.getCategoryNames();
  }

  readonly subcategories: Record<string, string[]> = {
    Calzado: ['Running', 'Training', 'Casual', 'Fútbol'],
    Camisetas: ['Manga corta', 'Manga larga', 'Sin mangas', 'Compresión'],
    Shorts: ['Running', 'Training', 'Casual'],
    Leggings: ['Compresión', 'Training', 'Casual'],
    Sudaderas: ['Con capucha', 'Sin capucha', 'Chaqueta'],
    Accesorios: ['Gorras', 'Medias', 'Bolsos', 'Guantes'],
  };

  readonly brands = [
    'Nike',
    'Adidas',
    'Under Armour',
    'Puma',
    'New Balance',
    'Reebok',
    'Asics',
  ];

  // SEO
  seoTitle = '';
  seoDescription = '';
  seoSlug = '';

  // Shipping
  productWeight = '';
  productHeight = '';
  productWidth = '';
  productLength = '';

  activeTab = signal<'general' | 'media' | 'variants' | 'seo' | 'shipping'>('general');

  get currentSubcategories(): string[] {
    return this.subcategories[this.selectedCategory] || [];
  }

  get profitMargin(): string {
    const price = parseFloat(this.productPrice);
    const cost = parseFloat(this.productCost);
    if (!price || !cost) return '—';
    const margin = ((price - cost) / price) * 100;
    return margin.toFixed(1) + '%';
  }

  get profitAmount(): string {
    const price = parseFloat(this.productPrice);
    const cost = parseFloat(this.productCost);
    if (!price || !cost) return '—';
    const profit = price - cost;
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(profit);
  }

  get selectedColorsCount(): number {
    return this.availableColors.filter(c => c.selected).length;
  }

  get selectedSizesCount(): number {
    return this.availableSizes.filter(s => s.selected).length;
  }

  setTab(tab: 'general' | 'media' | 'variants' | 'seo' | 'shipping') {
    this.activeTab.set(tab);
  }

  toggleColor(color: ProductColor) {
    color.selected = !color.selected;
  }

  toggleSize(size: ProductSize) {
    size.selected = !size.selected;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.dragOver.set(true);
  }

  onDragLeave() {
    this.dragOver.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.dragOver.set(false);
    // In a real app, handle file upload here
  }

  addDemoImage() {
    const demoImages = [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=400&auto=format&fit=crop',
    ];
    const current = this.productImages();
    if (current.length < 6) {
      const nextImage = demoImages[current.length % demoImages.length];
      this.productImages.set([...current, nextImage]);
    }
  }

  removeImage(index: number) {
    const current = [...this.productImages()];
    current.splice(index, 1);
    this.productImages.set(current);
  }

  generateSlug() {
    this.seoSlug = this.productName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  onNameChange() {
    if (!this.seoTitle) {
      this.seoTitle = this.productName;
    }
    this.generateSlug();
  }
}
