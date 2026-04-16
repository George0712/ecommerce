import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppearanceService, AppearanceConfig } from '../../../shared/services/appearance.service';

interface SettingToggle {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

@Component({
  selector: 'app-settings',
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {
  appearance = inject(AppearanceService);
  activeSection = signal<string>('general');
  showSaveToast = signal(false);

  // General
  storeName = 'SportStyle Pro';
  storeEmail = 'admin@sportstyle.co';
  storePhone = '+57 300 123 4567';
  storeAddress = 'Calle 72 #10-34, Bogotá, Colombia';
  storeCurrency = 'COP';
  storeLanguage = 'es';
  storeTimezone = 'America/Bogota';

  // Notifications
  notificationSettings: SettingToggle[] = [
    { id: 'new-order', label: 'Nuevos pedidos', description: 'Recibir notificación cuando se realice un nuevo pedido', enabled: true },
    { id: 'low-stock', label: 'Stock bajo', description: 'Alertar cuando un producto tenga menos de 5 unidades', enabled: true },
    { id: 'new-customer', label: 'Nuevos clientes', description: 'Notificar registro de nuevos clientes', enabled: false },
    { id: 'reviews', label: 'Reseñas', description: 'Notificar cuando un cliente deje una reseña', enabled: true },
    { id: 'abandoned-cart', label: 'Carrito abandonado', description: 'Alertar sobre carritos abandonados después de 1 hora', enabled: false },
    { id: 'order-status', label: 'Cambios de estado', description: 'Notificar cambios en el estado de los pedidos', enabled: true },
  ];

  // Shipping
  freeShippingThreshold = '150000';
  defaultShippingCost = '12000';
  shippingProviders: SettingToggle[] = [
    { id: 'servientrega', label: 'Servientrega', description: 'Envíos nacionales 2-5 días hábiles', enabled: true },
    { id: 'interrapidisimo', label: 'Interrapidísimo', description: 'Envíos express 1-3 días hábiles', enabled: true },
    { id: 'coordinadora', label: 'Coordinadora', description: 'Envíos económicos 3-7 días hábiles', enabled: false },
    { id: 'deprisa', label: 'Deprisa', description: 'Envíos estándar 2-4 días hábiles', enabled: false },
  ];

  // Payments
  paymentMethods: SettingToggle[] = [
    { id: 'wompi', label: 'Wompi', description: 'Pasarela de pagos — Tarjetas, PSE, Nequi', enabled: true },
    { id: 'paypal', label: 'PayPal', description: 'Pagos internacionales con PayPal', enabled: false },
    { id: 'cash', label: 'Contra entrega', description: 'Pago al recibir el producto', enabled: true },
    { id: 'transfer', label: 'Transferencia bancaria', description: 'Pago directo a cuenta bancaria', enabled: false },
  ];

  // SEO
  seoTitle = 'SportStyle Pro — Ropa Deportiva Premium';
  seoDescription = 'Tienda online de ropa y calzado deportivo de las mejores marcas. Envío gratis en compras mayores a $150.000.';
  googleAnalyticsId = 'G-XXXXXXXXXX';
  facebookPixelId = '';

  readonly sections = [
    { id: 'general', label: 'General', icon: 'store' },
    { id: 'notifications', label: 'Notificaciones', icon: 'notifications' },
    { id: 'shipping', label: 'Envíos', icon: 'local_shipping' },
    { id: 'payments', label: 'Pagos', icon: 'payments' },
    { id: 'appearance', label: 'Apariencia', icon: 'palette' },
    { id: 'seo', label: 'SEO & Analytics', icon: 'search' },
  ];

  readonly currencies = ['COP', 'USD', 'EUR', 'MXN'];
  readonly languages = [
    { value: 'es', label: 'Español' },
    { value: 'en', label: 'English' },
    { value: 'pt', label: 'Português' },
  ];
  readonly timezones = ['America/Bogota', 'America/Mexico_City', 'America/New_York', 'Europe/Madrid'];
  readonly perPageOptions = ['8', '12', '16', '24', '32'];

  readonly fontSizes = [
    { value: 'small' as const, label: 'Pequeño', desc: '14px base' },
    { value: 'default' as const, label: 'Normal', desc: '16px base' },
    { value: 'large' as const, label: 'Grande', desc: '18px base' },
  ];

  readonly radiusOptions = [
    { value: 'none' as const, label: 'Sin borde', preview: '0px' },
    { value: 'small' as const, label: 'Sutil', preview: '4px' },
    { value: 'medium' as const, label: 'Moderado', preview: '8px' },
    { value: 'large' as const, label: 'Redondeado', preview: '16px' },
    { value: 'pill' as const, label: 'Píldora', preview: '9999px' },
  ];

  readonly containerOptions = [
    { value: 'compact' as const, label: 'Compacto', desc: '1200px' },
    { value: 'default' as const, label: 'Estándar', desc: '1440px' },
    { value: 'wide' as const, label: 'Amplio', desc: '1600px' },
    { value: 'full' as const, label: 'Completo', desc: '100%' },
  ];

  readonly buttonStyles = [
    { value: 'solid' as const, label: 'Sólido', icon: 'rectangle' },
    { value: 'outline' as const, label: 'Contorno', icon: 'check_box_outline_blank' },
    { value: 'ghost' as const, label: 'Fantasma', icon: 'crop_din' },
    { value: 'gradient' as const, label: 'Degradado', icon: 'gradient' },
  ];

  readonly headerStyles = [
    { value: 'transparent' as const, label: 'Transparente', icon: 'blur_on' },
    { value: 'solid' as const, label: 'Sólido', icon: 'horizontal_rule' },
    { value: 'sticky' as const, label: 'Fijo', icon: 'push_pin' },
  ];

  readonly columnOptions = ['2', '3', '4', '5'];

  get config(): AppearanceConfig {
    return this.appearance.config();
  }

  get presets() {
    return this.appearance.presetThemes;
  }

  get fonts() {
    return this.appearance.fontOptions;
  }

  setSection(id: string) {
    this.activeSection.set(id);
  }

  toggleSetting(setting: SettingToggle) {
    setting.enabled = !setting.enabled;
  }

  // Appearance helpers
  onColorChange(field: 'primaryColor' | 'secondaryColor' | 'accentColor', value: string) {
    this.appearance.updateConfig({ [field]: value });
  }

  onSelectChange(field: keyof AppearanceConfig, value: any) {
    this.appearance.updateConfig({ [field]: value });
  }

  onToggleChange(field: keyof AppearanceConfig) {
    const current = this.config[field];
    this.appearance.updateConfig({ [field]: !current });
  }

  onTextChange(field: keyof AppearanceConfig, value: string) {
    this.appearance.updateConfig({ [field]: value });
  }

  applyPreset(preset: { primary: string; secondary: string; accent: string }) {
    this.appearance.applyPreset(preset);
  }

  resetAppearance() {
    this.appearance.resetToDefaults();
  }

  saveSettings() {
    this.showSaveToast.set(true);
    setTimeout(() => this.showSaveToast.set(false), 3000);
  }
}
