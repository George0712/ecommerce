import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductCard } from '../../shared/components/product-card/product-card';

export interface HomeHeroSlide {
  title: string;
  accent: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}

export interface HomeCategory {
  /** Título corto en mayúsculas (ej. CARDIO, GYM). */
  label: string;
  /** Texto descriptivo para accesibilidad. */
  name: string;
  href: string;
  image: string;
  imageClass: string;
}

export interface HomeSeasonDrop {
  title: string;
  subtitle: string;
  href: string;
  image: string;
  accent: string;
  badge: string;
}

export interface HomeProduct {
  name: string;
  price: number;
  originalPrice?: number;
  href: string;
  image: string;
  imageClass: string;
  brand: string;
  badge?: string;
  isNew?: boolean;
}

export interface HomeFeaturedDrop {
  title: string;
  subtitle: string;
  href: string;
  image: string;
  accent: string;
  badge: string;
}

export interface HomeGenderTile {
  label: string;
  name: string;
  href: string;
  image: string;
  imageClass: string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, ProductCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  readonly heroSlides: HomeHeroSlide[] = [
    {
      title: 'Ropa deportiva',
      accent: 'para exigirte más',
      description: 'Descubre nuestra nueva colección con marcas top como Nike, adidas y Under Armour. Auténtico y con envíos a toda Colombia.',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2000&auto=format&fit=crop',
      ctaText: 'Ver todo el catálogo',
      ctaLink: '/catalogo',
    },
    {
      title: 'Rompe tus',
      accent: 'propios límites',
      description: 'Lleva tu entrenamiento al siguiente nivel con prendas diseñadas para el máximo rendimiento y confort en cada movimiento.',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2000&auto=format&fit=crop',
      ctaText: 'Comprar destacados',
      ctaLink: '/catalogo',
    },
    {
      title: 'Estilo y poder',
      accent: 'en cada sprint',
      description: 'Calzado y accesorios que combinan tecnología deportiva premium para que destaques en el asfalto y en el gimnasio.',
      image: 'https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=2000&auto=format&fit=crop',
      ctaText: 'Ver lanzamientos',
      ctaLink: '/catalogo',
    }
  ];

  currentSlideIndex = 0;
  private slideInterval: any;

  ngOnInit() {
    this.startSlideTimer();
  }

  ngOnDestroy() {
    this.clearSlideTimer();
  }

  startSlideTimer() {
    if (isPlatformBrowser(this.platformId)) {
      this.slideInterval = setInterval(() => {
        this.currentSlideIndex = (this.currentSlideIndex + 1) % this.heroSlides.length;
      }, 5000);
    }
  }

  clearSlideTimer() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  setSlide(index: number) {
    this.currentSlideIndex = index;
    this.clearSlideTimer();
    this.startSlideTimer();
  }

  readonly brands = [
    'Nike',
    'adidas',
    'Under Armour',
    'Puma',
    'New Balance',
    'Reebok',
  ] as const;

  /** Pantalla partida Mujer | Hombre (50/50, ancho completo). */
  readonly genderTiles: HomeGenderTile[] = [
    {
      label: 'MUJER',
      name: 'Ropa deportiva para mujer',
      href: '/categoria/mujer',
      image:
        'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1200&auto=format&fit=crop',
      imageClass: 'object-cover object-center',
    },
    {
      label: 'HOMBRE',
      name: 'Ropa deportiva para hombre',
      href: '/categoria/hombre',
      image:
        'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1200&auto=format&fit=crop',
      imageClass: 'object-cover object-center',
    },
  ];

  readonly featuredDrop: HomeFeaturedDrop = {
    badge: 'Drop · temporada actual',
    title: 'Capas para entrenar fuerte',
    subtitle: 'Sudaderas, chaquetas ligeras y técnica de marcas líderes. Ideal para gimnasio y salir a correr.',
    href: '/catalogo',
    image:
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop',
    accent: 'from-emerald-600/90 via-zinc-900/80 to-zinc-950/95',
  };

  readonly categories: HomeCategory[] = [
    {
      label: 'CARDIO',
      name: 'Cardio y máquinas',
      href: '/categoria/cardio',
      image:
        'https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=1000&auto=format&fit=crop',
      imageClass: 'object-cover object-center',
    },
    {
      label: 'GYM',
      name: 'Pesas y entrenamiento en gimnasio',
      href: '/categoria/gym',
      image:
        'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1000&auto=format&fit=crop',
      imageClass: 'object-cover object-center',
    },
    {
      label: 'RUNNING',
      name: 'Running y ruta',
      href: '/categoria/running',
      image:
        'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=1000&auto=format&fit=crop',
      imageClass: 'object-cover object-center',
    },
    /* {
      label: 'FÚTBOL',
      name: 'Fútbol y cancha',
      href: '#',
      image:
        'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop',
      imageClass: 'object-cover object-center',
    }, */
    {
      label: 'CALZADO',
      name: 'Zapatillas deportivas',
      href: '/categoria/calzado',
      image:
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop',
      imageClass: 'object-cover object-center',
    },
  ];

  readonly seasonDrops: HomeSeasonDrop[] = [
    {
      badge: 'Marzo · alto rendimiento',
      title: 'Nuevos ingresos running',
      subtitle: 'Zapatillas y ropa técnica para ruta y trail. Marcas top, tallas para todos los pies.',
      href: '/categoria/running',
      image:
        'https://images.unsplash.com/photo-1552674603-db6ffd4facb5?q=80&w=1200&auto=format&fit=crop',
      accent: 'from-cyan-600/85 via-zinc-900/75 to-zinc-950/90',
    },
    {
      badge: 'Temporada · cancha y sala',
      title: 'Fútbol indoor & outdoor',
      subtitle: 'Botines, camisetas de entreno y accesorios para cancha. Listo para el próximo partido.',
      href: '/details-product/zapatilla-urbana-1',
      image:
        'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=1200&auto=format&fit=crop',
      accent: 'from-orange-600/85 via-zinc-900/75 to-zinc-950/90',
    },
  ];

  readonly products: HomeProduct[] = [
    {
      brand: 'Nike',
      name: 'Camiseta Dri-FIT training',
      price: 129900,
      href: '/details-product/zapatilla-urbana-1',
      image:
        'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=600&auto=format&fit=crop',
      imageClass: 'object-cover object-center',
    },
    {
      brand: 'adidas',
      name: 'Shorts de running con forro',
      price: 159900,
      originalPrice: 199900,
      badge: '-20%',
      href: '/details-product/gorra-entrenamiento-vip',
      image:
        'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=600&auto=format&fit=crop',
      imageClass: 'object-cover object-center',
    },
    {
      brand: 'Under Armour',
      name: 'Sudadera con capucha técnica',
      price: 249900,
      isNew: true,
      href: '/details-product/sudadera-capucha-tecnica',
      image:
        'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop',
      imageClass: 'object-cover object-top',
    },
    {
      brand: 'Puma',
      name: 'Leggings compresión 7/8',
      price: 189900,
      href: '/details-product/zapatilla-urbana-1',
      image:
        'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=600&auto=format&fit=crop',
      imageClass: 'object-cover object-center',
    },
  ];

  get heroPicks(): HomeProduct[] {
    return this.products.slice(0, 3);
  }

  formatCOP(value: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(value);
  }

  // --- Lógica para Carruseles de Productos (Móvil) ---
  masVendidosIndex = 0;
  recomendadosIndex = 0;

  get productPages(): number[] {
    // Muestra 2 productos a la vez en móvil, divide el total entre 2
    const totalPages = Math.ceil(this.products.length / 2);
    return Array.from({ length: totalPages }, (_, i) => i);
  }

  onScrollProducts(event: Event, type: 'mas' | 'rec') {
    if (!isPlatformBrowser(this.platformId)) return;
    const target = event.target as HTMLElement;
    // Calcula la página actual basada en el ancho del contenedor (scroll por vista completa)
    const index = Math.round(target.scrollLeft / target.clientWidth);
    if (type === 'mas') this.masVendidosIndex = index;
    else this.recomendadosIndex = index;
  }

  scrollToProductPage(index: number, container: HTMLElement, type: 'mas' | 'rec') {
    if (!isPlatformBrowser(this.platformId)) return;
    container.scrollTo({ left: index * container.clientWidth, behavior: 'smooth' });
    if (type === 'mas') this.masVendidosIndex = index;
    else this.recomendadosIndex = index;
  }
}
