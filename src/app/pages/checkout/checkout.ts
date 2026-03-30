import { Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

const COSTO_LOCAL = 10000;
const COSTO_NACIONAL = 15000;
const COSTO_EXTREMO = 25000;

@Component({
  selector: 'app-checkout',
  imports: [NgClass, FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  // Datos simulados del carrito (idealmente vendrían de un servicio)
  readonly cartItems = signal([
    {
      id: 1,
      name: 'Nike Air Max 270',
      brand: 'Nike',
      price: 650000,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      color: 'Rojo/Negro',
      size: '42',
      quantity: 1,
    },
    {
      id: 2,
      name: 'adidas Ultraboost 22',
      brand: 'adidas',
      price: 890000,
      image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      color: 'Blanco',
      size: '40',
      quantity: 1,
    }
  ]);

  // Selección del departamento
  selectedRegion = signal<string>('');
  selectedCity = signal<string>('');

  // Lógica de cálculo
  readonly cartSubtotal = computed(() => {
    return this.cartItems().reduce((acc, item) => acc + item.price * item.quantity, 0);
  });

  readonly shippingCost = computed(() => {
    // Si la compra es mayor a $1,000,000 envío gratis.
    if (this.cartSubtotal() > 1000000) return 0;
    
    const region = this.selectedRegion();
    if (!region) return 0; // Hasta que no seleccione, no se cobra o se pone 0, o un valor base. Aquí optamos por 0 y mostrar mensaje.

    // Zonas basadas en distancia desde Malambo, Atlántico.
    const zonaLocal = ['Atlántico', 'Bolívar', 'Magdalena', 'Cesar', 'Sucre', 'Córdoba', 'La Guajira'];
    const zonaExtrema = ['San Andrés y Providencia', 'Amazonas', 'Putumayo', 'Chocó', 'Guaviare', 'Guainía', 'Vaupés', 'Vichada', 'Caquetá'];
    
    if (zonaLocal.includes(region)) return COSTO_LOCAL;
    if (zonaExtrema.includes(region)) return COSTO_EXTREMO;
    return COSTO_NACIONAL; // Resto de Colombia (Bogotá, Antioquia, Valle...)
  });

  readonly cartTotal = computed(() => {
    return this.cartSubtotal() + this.shippingCost();
  });

  // Lista de Departamentos para el Select
  departamentos = [
    'Amazonas', 'Antioquia', 'Arauca', 'Atlántico', 'Bogotá D.C.', 'Bolívar', 'Boyacá', 'Caldas', 
    'Caquetá', 'Casanare', 'Cauca', 'Cesar', 'Chocó', 'Córdoba', 'Cundinamarca', 'Guainía', 
    'Guaviare', 'Huila', 'La Guajira', 'Magdalena', 'Meta', 'Nariño', 'Norte de Santander', 
    'Putumayo', 'Quindío', 'Risaralda', 'San Andrés y Providencia', 'Santander', 'Sucre', 
    'Tolima', 'Valle del Cauca', 'Vaupés', 'Vichada'
  ];

  selectedPaymentMethod = signal<string>('wompi'); // wompi, pse, contra_entrega

  formatCOP(value: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(value);
  }

  setPaymentMethod(method: string) {
    this.selectedPaymentMethod.set(method);
  }
}
