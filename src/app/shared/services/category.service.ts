import { Injectable, signal } from '@angular/core';

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  icon: string;
  parentId: number | null;
  status: 'activa' | 'inactiva';
  productCount: number;
  order: number;
  createdAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private nextId = 7;

  readonly categories = signal<Category[]>([
    {
      id: 1,
      name: 'Calzado',
      slug: 'calzado',
      description: 'Todo tipo de calzado deportivo para running, training y lifestyle',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop',
      icon: 'steps',
      parentId: null,
      status: 'activa',
      productCount: 4,
      order: 1,
      createdAt: '2026-01-15',
    },
    {
      id: 2,
      name: 'Camisetas',
      slug: 'camisetas',
      description: 'Camisetas deportivas de alto rendimiento y uso diario',
      image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=400&auto=format&fit=crop',
      icon: 'checkroom',
      parentId: null,
      status: 'activa',
      productCount: 2,
      order: 2,
      createdAt: '2026-01-15',
    },
    {
      id: 3,
      name: 'Shorts',
      slug: 'shorts',
      description: 'Shorts para entrenamiento y actividades al aire libre',
      image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=400&auto=format&fit=crop',
      icon: 'styler',
      parentId: null,
      status: 'activa',
      productCount: 1,
      order: 3,
      createdAt: '2026-01-20',
    },
    {
      id: 4,
      name: 'Leggings',
      slug: 'leggings',
      description: 'Leggings de compresión y training para máximo rendimiento',
      image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=400&auto=format&fit=crop',
      icon: 'accessibility_new',
      parentId: null,
      status: 'activa',
      productCount: 1,
      order: 4,
      createdAt: '2026-01-25',
    },
    {
      id: 5,
      name: 'Sudaderas',
      slug: 'sudaderas',
      description: 'Sudaderas y chaquetas deportivas para toda temporada',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=400&auto=format&fit=crop',
      icon: 'apparel',
      parentId: null,
      status: 'activa',
      productCount: 2,
      order: 5,
      createdAt: '2026-02-01',
    },
    {
      id: 6,
      name: 'Accesorios',
      slug: 'accesorios',
      description: 'Gorras, medias, bolsos y complementos deportivos',
      image: 'https://images.unsplash.com/photo-1588850561407-ed78c334e67a?q=80&w=400&auto=format&fit=crop',
      icon: 'backpack',
      parentId: null,
      status: 'inactiva',
      productCount: 0,
      order: 6,
      createdAt: '2026-02-10',
    },
  ]);

  getCategoryNames(): string[] {
    return this.categories()
      .filter(c => c.status === 'activa')
      .map(c => c.name);
  }

  getAllCategoryNames(): string[] {
    return this.categories().map(c => c.name);
  }

  getParentCategories(): Category[] {
    return this.categories().filter(c => c.parentId === null);
  }

  addCategory(category: Omit<Category, 'id'>) {
    const newCategory: Category = {
      ...category,
      id: this.nextId++,
    };
    this.categories.update(cats => [...cats, newCategory]);
    return newCategory;
  }

  updateCategory(id: number, partial: Partial<Category>) {
    this.categories.update(cats =>
      cats.map(c => (c.id === id ? { ...c, ...partial } : c))
    );
  }

  deleteCategory(id: number) {
    this.categories.update(cats => cats.filter(c => c.id !== id));
  }

  toggleStatus(id: number) {
    this.categories.update(cats =>
      cats.map(c =>
        c.id === id
          ? { ...c, status: c.status === 'activa' ? 'inactiva' as const : 'activa' as const }
          : c
      )
    );
  }
}
