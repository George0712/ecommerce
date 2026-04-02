import { Component, Inject, PLATFORM_ID, OnInit, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { ProductCard } from '../../shared/components/product-card/product-card';
import { CartService } from '../../shared/services/cart.service';

export interface ProductDetails {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  images: string[];
  colors: { label: string; code: string }[];
  sizes: { label: string; outOfStock: boolean }[];
  description: string;
  features: string[];
}

export interface RelatedProduct {
  name: string;
  brand: string;
  price: number;
  href: string;
  image: string;
  imageClass: string;
}

const PRODUCTS_DB: ProductDetails[] = [
  {
    id: 'zapatilla-urbana-1',
    brand: 'SprintCO',
    name: 'Zapatilla Urbana Casual',
    price: 329900,
    originalPrice: 419900,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551107696-a4b0a5f621c4?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { label: 'Rojo Granate', code: '#B91C1C' },
      { label: 'Negro Asfalto', code: '#18181B' },
      { label: 'Blanco Nube', code: '#F8FAFC' }
    ],
    sizes: [
      { label: '38', outOfStock: false },
      { label: '39', outOfStock: false },
      { label: '40', outOfStock: true },
      { label: '41', outOfStock: false },
      { label: '42', outOfStock: false },
      { label: '43', outOfStock: true }
    ],
    description: 'Desafiando las convenciones del calzado diario, nuestra zapatilla de malla ofrece transpirabilidad extrema y un estilo inconfundible. La media suela con absorción de impactos te asegura confort desde el primer paso hasta el último, perfecta para días largos y paseos urbanos.',
    features: [
      'Capellada en malla tejida.',
      'Suela de caucho antideslizante.',
      'Plantilla acolchada extraíble.'
    ]
  },
  {
    id: 'gorra-entrenamiento-vip',
    brand: 'SprintCO',
    name: 'Gorra Entrenamiento VIP',
    price: 89900,
    images: [
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1200&auto=format&fit=crop',
       'https://images.unsplash.com/photo-1572307480813-ceb0e59d832d?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { label: 'Rojo Carmesí', code: '#991B1B' },
      { label: 'Azul Marino', code: '#1E3A8A' }
    ],
    sizes: [
      { label: 'Única', outOfStock: false }
    ],
    description: 'Protégete del sol y mantén el sudor alejado de tus ojos con esta gorra ultraligera, diseñada para ajustarse perfectamente a cualquier tamaño de cabeza y acompañarte en tus carreras más intensas o días soleados en la ciudad.',
    features: [
      'Banda interior absorbente que expulsa el sudor.',
      'Correa trasera ajustable con cierre rápido.',
      'Perforaciones láser para máxima ventilación.',
      'Logotipo reflectante frontal.'
    ]
  },
  {
    id: 'sudadera-capucha-tecnica',
    brand: 'SprintCO',
    name: 'Sudadera con capucha técnica',
    price: 249900,
    originalPrice: 289900,
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556821034-7cafbfbcedfb?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { label: 'Gris Carbón', code: '#3F3F46' },
      { label: 'Negro', code: '#000000' }
    ],
    sizes: [
      { label: 'S', outOfStock: false },
      { label: 'M', outOfStock: false },
      { label: 'L', outOfStock: true },
      { label: 'XL', outOfStock: false }
    ],
    description: 'Nuestra sudadera técnica está construida con tejido cepillado que retiene el calor corporal ofreciendo al mismo tiempo elasticidad en cuatro direcciones. Capucha diseñada ergonómicamente para un ajuste aerodinámico en movimiento.',
    features: [
      'Bolsillo de canguro dividido.',
      'Tratamiento repelente de agua.',
      'Costuras planas invisibles.'
    ]
  }
];

@Component({
  selector: 'app-details-product',
  imports: [CommonModule, RouterModule, ProductCard],
  templateUrl: './details-product.html',
  styleUrl: './details-product.css',
})
export class DetailsProduct implements OnInit {
  product: ProductDetails = PRODUCTS_DB[0];

  selectedImageIndex = 0;
  selectedColorIndex = 0;
  selectedSizeIndex: number | null = null;
  quantity = 1;

  isDescriptionExpanded = true;

  relatedProducts: RelatedProduct[] = [
    {
      brand: 'SprintCO',
      name: 'Camiseta Dri-FIT training',
      price: 129900,
      href: '/details-product/camiseta-dri-fit',
      image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=600&auto=format&fit=crop',
      imageClass: 'object-cover object-center',
    },
    {
      brand: 'SprintCO',
      name: 'Gorra Entrenamiento VIP',
      price: 89900,
      href: '/details-product/gorra-entrenamiento-vip',
      image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1200&auto=format&fit=crop',
      imageClass: 'object-cover object-center',
    },
    {
      brand: 'SprintCO',
      name: 'Sudadera con capucha técnica',
      price: 249900,
      href: '/details-product/sudadera-capucha-tecnica',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop',
      imageClass: 'object-cover object-top',
    },
    {
      brand: 'SprintCO',
      name: 'Leggings compresión 7/8',
      price: 189900,
      href: '/details-product/leggings-compresion',
      image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=600&auto=format&fit=crop',
      imageClass: 'object-cover object-center',
    }
  ];

  recomendadosIndex = 0;
  
  cartService = inject(CartService);
  router = inject(Router);

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute
  ) {}

  addToCart() {
    if (this.selectedSizeIndex === null && !this.isOneSize) {
      alert("Por favor selecciona una talla"); // This could be improved with a nicer UI toast
      return;
    }

    const sizeLabel = this.selectedSizeIndex !== null 
      ? this.product.sizes[this.selectedSizeIndex].label 
      : 'Única';
      
    const colorLabel = this.product.colors[this.selectedColorIndex].label;

    this.cartService.addItem({
      id: this.product.id,
      name: this.product.name,
      brand: this.product.brand,
      price: this.product.price,
      image: this.product.images[0],
      color: colorLabel,
      size: sizeLabel,
      quantity: this.quantity
    });
  }

  buyNow() {
    this.addToCart();
    
    // Si la selección de talla falló y no se pudo añadir
    if (this.selectedSizeIndex === null && !this.isOneSize) {
      return;
    }
    
    // Cerramos el carrito para que no estorbe (ya que addToCart lo abre por defecto)
    this.cartService.isCartOpen.set(false);
    this.router.navigate(['/checkout']);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      const found = PRODUCTS_DB.find(p => p.id === id);
      if (found) {
        this.product = found;
      } else {
        this.product = PRODUCTS_DB[0];
      }
      
      this.selectedImageIndex = 0;
      this.selectedColorIndex = 0;
      
      this.selectedSizeIndex = null;
      if (this.isOneSize) {
         this.selectedSizeIndex = 0; 
      }
      
      this.quantity = 1;
      this.isDescriptionExpanded = true;
    });
  }

  get isOneSize(): boolean {
    return this.product.sizes.length === 1 && this.product.sizes[0].label.toLowerCase() === 'única';
  }

  selectImage(index: number) {
    this.selectedImageIndex = index;
  }

  selectColor(index: number) {
    this.selectedColorIndex = index;
  }

  selectSize(index: number) {
    if (!this.product.sizes[index].outOfStock) {
      this.selectedSizeIndex = index;
    }
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increaseQuantity() {
    this.quantity++;
  }

  toggleDescription() {
    this.isDescriptionExpanded = !this.isDescriptionExpanded;
  }

  formatCOP(value: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(value);
  }

  get productPages(): number[] {
    const totalPages = Math.ceil(this.relatedProducts.length / 2);
    return Array.from({ length: totalPages }, (_, i) => i);
  }

  onScrollProducts(event: Event) {
    if (!isPlatformBrowser(this.platformId)) return;
    const target = event.target as HTMLElement;
    const index = Math.round(target.scrollLeft / target.clientWidth);
    this.recomendadosIndex = index;
  }

  scrollToProductPage(index: number, container: HTMLElement) {
    if (!isPlatformBrowser(this.platformId)) return;
    container.scrollTo({ left: index * container.clientWidth, behavior: 'smooth' });
    this.recomendadosIndex = index;
  }
}
