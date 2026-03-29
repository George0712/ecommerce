import {
  Component,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
  HostListener,
  signal,
  computed,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductCard } from '../../shared/components/product-card/product-card';

export interface CategoryProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  imageClass: string;
  href: string;
  badge?: string;
  isNew?: boolean;
}

export interface FilterOption {
  id: string;
  label: string;
  count: number;
}

export interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
  isOpen: boolean;
}

/** Datos simulados para toda la plantilla */
const ALL_PRODUCTS: CategoryProduct[] = [
  {
    id: 'camiseta-dri-fit',
    name: 'Camiseta Dri-FIT Training',
    brand: 'Nike',
    price: 129900,
    image:
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=600&auto=format&fit=crop',
    imageClass: 'object-cover object-center',
    href: '/details-product/zapatilla-urbana-1',
    isNew: true,
  },
  {
    id: 'shorts-running',
    name: 'Shorts Running con Forro',
    brand: 'adidas',
    price: 159900,
    originalPrice: 199900,
    image:
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=600&auto=format&fit=crop',
    imageClass: 'object-cover object-center',
    href: '/details-product/zapatilla-urbana-1',
    badge: '-20%',
  },
  {
    id: 'sudadera-capucha',
    name: 'Sudadera con Capucha Técnica',
    brand: 'Under Armour',
    price: 249900,
    image:
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop',
    imageClass: 'object-cover object-top',
    href: '/details-product/sudadera-capucha-tecnica',
    isNew: true,
  },
  {
    id: 'leggings-compresion',
    name: 'Leggings Compresión 7/8',
    brand: 'Puma',
    price: 189900,
    image:
      'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=600&auto=format&fit=crop',
    imageClass: 'object-cover object-center',
    href: '/details-product/zapatilla-urbana-1',
  },
  {
    id: 'zapatilla-urbana',
    name: 'Zapatilla Urbana Casual',
    brand: 'SprintCO',
    price: 329900,
    originalPrice: 419900,
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop',
    imageClass: 'object-cover object-center',
    href: '/details-product/zapatilla-urbana-1',
    badge: '-21%',
  },
  {
    id: 'gorra-entrenamiento',
    name: 'Gorra Entrenamiento VIP',
    brand: 'SprintCO',
    price: 89900,
    image:
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=600&auto=format&fit=crop',
    imageClass: 'object-cover object-center',
    href: '/details-product/gorra-entrenamiento-vip',
    isNew: true,
  },
  {
    id: 'chaqueta-cortaviento',
    name: 'Chaqueta Cortaviento Ligera',
    brand: 'New Balance',
    price: 279900,
    image:
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=600&auto=format&fit=crop',
    imageClass: 'object-cover object-center',
    href: '/details-product/zapatilla-urbana-1',
  },
  {
    id: 'medias-compresion',
    name: 'Medias de Compresión Running',
    brand: 'Nike',
    price: 69900,
    originalPrice: 89900,
    image:
      'https://images.unsplash.com/photo-1612529517397-6c29e2e4f13e?q=80&w=600&auto=format&fit=crop',
    imageClass: 'object-cover object-center',
    href: '/details-product/zapatilla-urbana-1',
    badge: '-22%',
  },
  {
    id: 'top-mujer',
    name: 'Top Deportivo Mujer Seamless',
    brand: 'adidas',
    price: 119900,
    image:
      'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?q=80&w=600&auto=format&fit=crop',
    imageClass: 'object-cover object-center',
    href: '/details-product/zapatilla-urbana-1',
    isNew: true,
  },
  {
    id: 'pantalon-entrenamiento',
    name: 'Pantalón Entrenamiento Slim',
    brand: 'Under Armour',
    price: 199900,
    image:
      'https://images.unsplash.com/photo-1504439468489-c8920d796a29?q=80&w=600&auto=format&fit=crop',
    imageClass: 'object-cover object-center',
    href: '/details-product/zapatilla-urbana-1',
  },
  {
    id: 'zapatilla-running-pro',
    name: 'Zapatilla Running Pro Boost',
    brand: 'Puma',
    price: 389900,
    originalPrice: 459900,
    image:
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600&auto=format&fit=crop',
    imageClass: 'object-cover object-center',
    href: '/details-product/zapatilla-urbana-1',
    badge: '-15%',
  },
  {
    id: 'bolsa-gym',
    name: 'Bolsa Gym Duffel 40L',
    brand: 'New Balance',
    price: 149900,
    image:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop',
    imageClass: 'object-cover object-center',
    href: '/details-product/zapatilla-urbana-1',
  },
];

export interface CategoryInfo {
  slug: string;
  name: string;
  description: string;
  banner: string;
  bannerOverlay: string;
  accent: string;
  productCount: number;
}

const CATEGORIES_MAP: Record<string, CategoryInfo> = {
  cardio: {
    slug: 'cardio',
    name: 'Cardio',
    description: 'Ropa técnica y zapatillas de alto rendimiento para tus sesiones de cardio y máquinas.',
    banner:
      'https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=1800&auto=format&fit=crop',
    bannerOverlay: 'from-zinc-950/85 via-zinc-950/50 to-transparent',
    accent: '#10b981',
    productCount: 48,
  },
  gym: {
    slug: 'gym',
    name: 'Gym & Pesas',
    description: 'Equipamiento y prendas diseñadas para el entrenamiento de fuerza y musculación.',
    banner:
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1800&auto=format&fit=crop',
    bannerOverlay: 'from-zinc-950/85 via-zinc-950/50 to-transparent',
    accent: '#f59e0b',
    productCount: 36,
  },
  running: {
    slug: 'running',
    name: 'Running',
    description: 'Zapatillas, ropa y accesorios para correr más lejos, más rápido y con más confort.',
    banner:
      'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=1800&auto=format&fit=crop',
    bannerOverlay: 'from-zinc-950/85 via-zinc-950/50 to-transparent',
    accent: '#3b82f6',
    productCount: 52,
  },
  calzado: {
    slug: 'calzado',
    name: 'Calzado',
    description: 'Las mejores zapatillas de las marcas más importantes del mundo deportivo.',
    banner:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1800&auto=format&fit=crop',
    bannerOverlay: 'from-zinc-950/85 via-zinc-950/50 to-transparent',
    accent: '#ef4444',
    productCount: 64,
  },
  mujer: {
    slug: 'mujer',
    name: 'Mujer',
    description: 'Colección completa de ropa deportiva femenina: estilo, confort y rendimiento.',
    banner:
      'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1800&auto=format&fit=crop',
    bannerOverlay: 'from-zinc-950/85 via-zinc-950/50 to-transparent',
    accent: '#ec4899',
    productCount: 78,
  },
  hombre: {
    slug: 'hombre',
    name: 'Hombre',
    description: 'Todo lo que necesitas para entrenar fuerte: camisetas, shorts, calzado y más.',
    banner:
      'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1800&auto=format&fit=crop',
    bannerOverlay: 'from-zinc-950/85 via-zinc-950/50 to-transparent',
    accent: '#6366f1',
    productCount: 92,
  },
};

const DEFAULT_CATEGORY: CategoryInfo = {
  slug: 'all',
  name: 'Todos los Productos',
  description: 'Explora todo nuestro catálogo de artículos deportivos de las mejores marcas.',
  banner:
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1800&auto=format&fit=crop',
  bannerOverlay: 'from-zinc-950/85 via-zinc-950/50 to-transparent',
  accent: '#1d1d1d',
  productCount: 120,
};

const PAGE_SIZE = 8;

@Component({
  selector: 'app-category',
  imports: [CommonModule, RouterModule, FormsModule, ProductCard],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category implements OnInit, OnDestroy {
  category: CategoryInfo = DEFAULT_CATEGORY;

  // Filters state
  filterGroups: FilterGroup[] = [
    {
      id: 'brand',
      label: 'Marca',
      isOpen: true,
      options: [
        { id: 'nike', label: 'Nike', count: 24 },
        { id: 'adidas', label: 'adidas', count: 18 },
        { id: 'underarmour', label: 'Under Armour', count: 12 },
        { id: 'puma', label: 'Puma', count: 16 },
        { id: 'newbalance', label: 'New Balance', count: 10 },
        { id: 'sprintco', label: 'SprintCO', count: 14 },
      ],
    },
    {
      id: 'gender',
      label: 'Género',
      isOpen: true,
      options: [
        { id: 'mujer', label: 'Mujer', count: 42 },
        { id: 'hombre', label: 'Hombre', count: 38 },
        { id: 'unisex', label: 'Unisex', count: 20 },
      ],
    },
    {
      id: 'size',
      label: 'Talla',
      isOpen: false,
      options: [
        { id: 'xs', label: 'XS', count: 15 },
        { id: 's', label: 'S', count: 28 },
        { id: 'm', label: 'M', count: 35 },
        { id: 'l', label: 'L', count: 32 },
        { id: 'xl', label: 'XL', count: 24 },
        { id: 'xxl', label: 'XXL', count: 10 },
      ],
    },
    {
      id: 'price',
      label: 'Precio',
      isOpen: true,
      options: [
        { id: 'under100', label: 'Menos de $100.000', count: 8 },
        { id: '100to200', label: '$100.000 – $200.000', count: 22 },
        { id: '200to300', label: '$200.000 – $300.000', count: 18 },
        { id: 'over300', label: 'Más de $300.000', count: 12 },
      ],
    },
    {
      id: 'color',
      label: 'Color',
      isOpen: false,
      options: [
        { id: 'negro', label: 'Negro', count: 30 },
        { id: 'blanco', label: 'Blanco', count: 22 },
        { id: 'gris', label: 'Gris', count: 18 },
        { id: 'azul', label: 'Azul', count: 15 },
        { id: 'rojo', label: 'Rojo', count: 12 },
        { id: 'verde', label: 'Verde', count: 8 },
      ],
    },
  ];

  selectedFilters = signal<Record<string, Set<string>>>({});
  sortBy = 'featured';
  isMobileFiltersOpen = false;
  isLoading = false;

  // Products displayed (infinite scroll)
  private page = 1;
  displayedProducts: CategoryProduct[] = [];
  hasMore = true;

  private scrollObserver?: IntersectionObserver;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug') ?? 'all';
      this.category = CATEGORIES_MAP[slug] ?? DEFAULT_CATEGORY;
      this.resetProducts();
    });

    if (isPlatformBrowser(this.platformId)) {
      this.setupIntersectionObserver();
    }
  }

  ngOnDestroy() {
    if (this.scrollObserver) {
      this.scrollObserver.disconnect();
    }
  }

  private resetProducts() {
    this.page = 1;
    this.displayedProducts = [];
    this.hasMore = true;
    this.loadNextPage();
  }

  private loadNextPage() {
    if (this.isLoading || !this.hasMore) return;
    this.isLoading = true;

    // Simulate async fetch with a small delay
    setTimeout(() => {
      const start = (this.page - 1) * PAGE_SIZE;
      const end = this.page * PAGE_SIZE;
      // Cycle through the products to simulate a big catalogue
      const chunk = this.getCycledProducts(start, end);
      this.displayedProducts = [...this.displayedProducts, ...chunk];
      this.hasMore = this.page < 5; // simulate 5 pages max
      this.page++;
      this.isLoading = false;
    }, 600);
  }

  private getCycledProducts(start: number, end: number): CategoryProduct[] {
    const result: CategoryProduct[] = [];
    for (let i = start; i < end; i++) {
      result.push({ ...ALL_PRODUCTS[i % ALL_PRODUCTS.length], id: `${ALL_PRODUCTS[i % ALL_PRODUCTS.length].id}-${i}` });
    }
    return result;
  }

  private setupIntersectionObserver() {
    if (!isPlatformBrowser(this.platformId)) return;
    setTimeout(() => {
      const sentinel = document.getElementById('scroll-sentinel');
      if (!sentinel) return;

      this.scrollObserver = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !this.isLoading && this.hasMore) {
            this.loadNextPage();
          }
        },
        { rootMargin: '200px' }
      );
      this.scrollObserver.observe(sentinel);
    }, 500);
  }

  toggleFilterGroup(groupId: string) {
    const group = this.filterGroups.find((g) => g.id === groupId);
    if (group) group.isOpen = !group.isOpen;
  }

  toggleFilterOption(groupId: string, optionId: string) {
    const current = this.selectedFilters();
    const groupSet = new Set(current[groupId] ?? []);
    if (groupSet.has(optionId)) {
      groupSet.delete(optionId);
    } else {
      groupSet.add(optionId);
    }
    this.selectedFilters.set({ ...current, [groupId]: groupSet });
  }

  isFilterSelected(groupId: string, optionId: string): boolean {
    return this.selectedFilters()[groupId]?.has(optionId) ?? false;
  }

  get activeFilterCount(): number {
    return Object.values(this.selectedFilters()).reduce(
      (acc, set) => acc + set.size,
      0
    );
  }

  clearAllFilters() {
    this.selectedFilters.set({});
  }

  openMobileFilters() {
    this.isMobileFiltersOpen = true;
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'hidden';
    }
  }

  closeMobileFilters() {
    this.isMobileFiltersOpen = false;
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
    }
  }

  formatCOP(value: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(value);
  }

  get sortOptions() {
    return [
      { value: 'featured', label: 'Destacados' },
      { value: 'newest', label: 'Más reciente' },
      { value: 'price-asc', label: 'Precio: menor a mayor' },
      { value: 'price-desc', label: 'Precio: mayor a menor' },
    ];
  }
}
