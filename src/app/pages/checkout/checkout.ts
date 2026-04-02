import { Component, signal, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../shared/services/cart.service';

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
  public cartService = inject(CartService);

  // Selección del departamento
  selectedRegion = signal<string>('');
  selectedCity = signal<string>('');

  readonly shippingCost = computed(() => {
    // Si la compra es mayor a $1,000,000 envío gratis.
    if (this.cartService.cartSubtotal() > 1000000) return 0;
    
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
    return this.cartService.cartSubtotal() + this.shippingCost();
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
