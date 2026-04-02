import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

export interface AdminProduct {
  id: number;
  name: string;
  sku: string;
  image: string;
  category: string;
  price: number;
  originalPrice?: number;
  stock: number;
  status: 'activo' | 'borrador' | 'agotado';
  brand: string;
  sales: number;
  createdAt: string;
}

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  searchQuery = '';
  selectedCategory = '';
  selectedStatus = '';
  selectAll = signal(false);
  selectedIds = signal<Set<number>>(new Set());
  currentView = signal<'grid' | 'table'>('table');

  readonly categories = ['Calzado', 'Camisetas', 'Shorts', 'Leggings', 'Sudaderas', 'Accesorios'];
  readonly statuses = ['activo', 'borrador', 'agotado'];

  readonly products: AdminProduct[] = [
    {
      id: 1,
      name: 'Nike Air Zoom Pegasus 41',
      sku: 'NK-AZP41-001',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=200&auto=format&fit=crop',
      category: 'Calzado',
      price: 549900,
      originalPrice: 649900,
      stock: 45,
      status: 'activo',
      brand: 'Nike',
      sales: 142,
      createdAt: '2026-03-15',
    },
    {
      id: 2,
      name: 'Adidas Ultraboost Light',
      sku: 'AD-UBL-002',
      image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=200&auto=format&fit=crop',
      category: 'Calzado',
      price: 459900,
      stock: 28,
      status: 'activo',
      brand: 'Adidas',
      sales: 128,
      createdAt: '2026-03-10',
    },
    {
      id: 3,
      name: 'Under Armour Tech Tee 2.0',
      sku: 'UA-TT2-003',
      image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=200&auto=format&fit=crop',
      category: 'Camisetas',
      price: 129900,
      stock: 120,
      status: 'activo',
      brand: 'Under Armour',
      sales: 95,
      createdAt: '2026-03-08',
    },
    {
      id: 4,
      name: 'Puma Training Shorts Pro',
      sku: 'PM-TSP-004',
      image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=200&auto=format&fit=crop',
      category: 'Shorts',
      price: 119900,
      stock: 67,
      status: 'activo',
      brand: 'Puma',
      sales: 87,
      createdAt: '2026-03-05',
    },
    {
      id: 5,
      name: 'Nike Pro Compression Tights',
      sku: 'NK-PCT-005',
      image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=200&auto=format&fit=crop',
      category: 'Leggings',
      price: 189900,
      stock: 3,
      status: 'agotado',
      brand: 'Nike',
      sales: 76,
      createdAt: '2026-02-28',
    },
    {
      id: 6,
      name: 'Adidas Essentials Hoodie',
      sku: 'AD-EH-006',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=200&auto=format&fit=crop',
      category: 'Sudaderas',
      price: 249900,
      stock: 34,
      status: 'activo',
      brand: 'Adidas',
      sales: 63,
      createdAt: '2026-02-25',
    },
    {
      id: 7,
      name: 'New Balance Fresh Foam X',
      sku: 'NB-FFX-007',
      image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=200&auto=format&fit=crop',
      category: 'Calzado',
      price: 489900,
      originalPrice: 589900,
      stock: 15,
      status: 'activo',
      brand: 'New Balance',
      sales: 54,
      createdAt: '2026-02-20',
    },
    {
      id: 8,
      name: 'Reebok Nano X4 Training',
      sku: 'RB-NX4-008',
      image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=200&auto=format&fit=crop',
      category: 'Calzado',
      price: 399900,
      stock: 0,
      status: 'agotado',
      brand: 'Reebok',
      sales: 41,
      createdAt: '2026-02-15',
    },
    {
      id: 9,
      name: 'Nike Dri-FIT Trail Running Tee',
      sku: 'NK-DFT-009',
      image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=200&auto=format&fit=crop',
      category: 'Camisetas',
      price: 149900,
      stock: 80,
      status: 'borrador',
      brand: 'Nike',
      sales: 0,
      createdAt: '2026-03-28',
    },
    {
      id: 10,
      name: 'Under Armour Storm Jacket',
      sku: 'UA-SJ-010',
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=200&auto=format&fit=crop',
      category: 'Sudaderas',
      price: 349900,
      stock: 22,
      status: 'borrador',
      brand: 'Under Armour',
      sales: 0,
      createdAt: '2026-03-27',
    },
  ];

  get filteredProducts(): AdminProduct[] {
    return this.products.filter(p => {
      const matchesSearch =
        !this.searchQuery ||
        p.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesCategory = !this.selectedCategory || p.category === this.selectedCategory;
      const matchesStatus = !this.selectedStatus || p.status === this.selectedStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }

  get totalProducts(): number {
    return this.products.length;
  }

  get activeProducts(): number {
    return this.products.filter(p => p.status === 'activo').length;
  }

  get outOfStockProducts(): number {
    return this.products.filter(p => p.status === 'agotado').length;
  }

  get draftProducts(): number {
    return this.products.filter(p => p.status === 'borrador').length;
  }

  formatCOP(value: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(value);
  }

  toggleSelectAll() {
    if (this.selectAll()) {
      this.selectedIds.set(new Set());
      this.selectAll.set(false);
    } else {
      const allIds = new Set(this.filteredProducts.map(p => p.id));
      this.selectedIds.set(allIds);
      this.selectAll.set(true);
    }
  }

  toggleSelect(id: number) {
    const current = new Set(this.selectedIds());
    if (current.has(id)) {
      current.delete(id);
    } else {
      current.add(id);
    }
    this.selectedIds.set(current);
    this.selectAll.set(current.size === this.filteredProducts.length);
  }

  isSelected(id: number): boolean {
    return this.selectedIds().has(id);
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      activo: 'status-active',
      borrador: 'status-draft',
      agotado: 'status-out',
    };
    return map[status] || '';
  }

  getStockClass(stock: number): string {
    if (stock === 0) return 'stock-out';
    if (stock <= 10) return 'stock-low';
    return 'stock-ok';
  }

  clearFilters() {
    this.searchQuery = '';
    this.selectedCategory = '';
    this.selectedStatus = '';
  }

  setView(view: 'grid' | 'table') {
    this.currentView.set(view);
  }
}
