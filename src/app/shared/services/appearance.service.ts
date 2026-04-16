import { Injectable, Inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface AppearanceConfig {
  // Branding Colors
  primaryColor: string;       // Main accent (maps to emerald palette)
  secondaryColor: string;     // Secondary/dark tone
  accentColor: string;        // CTA / highlights

  // Typography
  fontFamily: string;
  headingFont: string;
  fontSize: 'small' | 'default' | 'large';

  // Layout
  borderRadius: 'none' | 'small' | 'medium' | 'large' | 'pill';
  containerWidth: 'compact' | 'default' | 'wide' | 'full';
  productColumns: '2' | '3' | '4' | '5';
  productsPerPage: string;

  // Features
  darkMode: boolean;
  showBanner: boolean;
  showReviews: boolean;
  enableWishlist: boolean;
  showQuickView: boolean;

  // Button Style
  buttonStyle: 'solid' | 'outline' | 'ghost' | 'gradient';

  // Header
  headerStyle: 'transparent' | 'solid' | 'sticky';
  announcementBar: boolean;
  announcementText: string;
}

const DEFAULT_CONFIG: AppearanceConfig = {
  primaryColor: '#e2d2bb',
  secondaryColor: '#1d1d1d',
  accentColor: '#FF0000',
  fontFamily: 'Poppins',
  headingFont: 'Poppins',
  fontSize: 'default',
  borderRadius: 'medium',
  containerWidth: 'default',
  productColumns: '4',
  productsPerPage: '12',
  darkMode: false,
  showBanner: true,
  showReviews: true,
  enableWishlist: true,
  showQuickView: false,
  buttonStyle: 'solid',
  headerStyle: 'sticky',
  announcementBar: false,
  announcementText: '🔥 Envío GRATIS en pedidos mayores a $150.000',
};

@Injectable({ providedIn: 'root' })
export class AppearanceService {
  private isBrowser: boolean;
  config = signal<AppearanceConfig>({ ...DEFAULT_CONFIG });

  readonly fontOptions = [
    { value: 'Poppins', label: 'Poppins', category: 'Moderna' },
    { value: 'Inter', label: 'Inter', category: 'Limpia' },
    { value: 'Outfit', label: 'Outfit', category: 'Geométrica' },
    { value: 'Montserrat', label: 'Montserrat', category: 'Elegante' },
    { value: 'Playfair Display', label: 'Playfair Display', category: 'Serif' },
    { value: 'Lora', label: 'Lora', category: 'Clásica' },
    { value: 'Roboto', label: 'Roboto', category: 'Neutral' },
    { value: 'DM Sans', label: 'DM Sans', category: 'Minimal' },
    { value: 'Space Grotesk', label: 'Space Grotesk', category: 'Técnica' },
    { value: 'Nunito', label: 'Nunito', category: 'Amigable' },
  ];

  readonly presetThemes = [
    { name: 'Beige Elegante', primary: '#e2d2bb', secondary: '#1d1d1d', accent: '#FF0000', icon: 'diamond' },
    { name: 'Azul Corporativo', primary: '#3b82f6', secondary: '#0f172a', accent: '#f59e0b', icon: 'business' },
    { name: 'Verde Natural', primary: '#22c55e', secondary: '#14532d', accent: '#eab308', icon: 'eco' },
    { name: 'Rosa Fashion', primary: '#ec4899', secondary: '#1a1a2e', accent: '#f97316', icon: 'favorite' },
    { name: 'Púrpura Lujoso', primary: '#a855f7', secondary: '#1e1b4b', accent: '#06b6d4', icon: 'auto_awesome' },
    { name: 'Negro Minimalista', primary: '#f5f5f5', secondary: '#000000', accent: '#ef4444', icon: 'contrast' },
    { name: 'Naranja Deportivo', primary: '#f97316', secondary: '#1c1917', accent: '#fbbf24', icon: 'sports_soccer' },
    { name: 'Turquesa Tech', primary: '#06b6d4', secondary: '#0c4a6e', accent: '#a3e635', icon: 'devices' },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      this.loadFromStorage();
      this.applyConfig();
    }
  }

  updateConfig(partial: Partial<AppearanceConfig>) {
    this.config.update(c => ({ ...c, ...partial }));
    if (this.isBrowser) {
      this.applyConfig();
      this.saveToStorage();
    }
  }

  applyPreset(preset: { primary: string; secondary: string; accent: string }) {
    this.updateConfig({
      primaryColor: preset.primary,
      secondaryColor: preset.secondary,
      accentColor: preset.accent,
    });
  }

  resetToDefaults() {
    this.config.set({ ...DEFAULT_CONFIG });
    if (this.isBrowser) {
      this.applyConfig();
      this.saveToStorage();
    }
  }

  private applyConfig() {
    if (!this.isBrowser) return;
    const c = this.config();
    const root = document.documentElement;

    // Generate color palette from primary
    const primaryHSL = this.hexToHSL(c.primaryColor);
    root.style.setProperty('--color-emerald-50', this.hslString(primaryHSL.h, Math.max(primaryHSL.s - 25, 5), 97));
    root.style.setProperty('--color-emerald-100', this.hslString(primaryHSL.h, Math.max(primaryHSL.s - 20, 5), 93));
    root.style.setProperty('--color-emerald-200', this.hslString(primaryHSL.h, Math.max(primaryHSL.s - 12, 5), 87));
    root.style.setProperty('--color-emerald-300', this.hslString(primaryHSL.h, primaryHSL.s, primaryHSL.l));
    root.style.setProperty('--color-emerald-400', this.hslString(primaryHSL.h, Math.min(primaryHSL.s + 5, 100), Math.max(primaryHSL.l - 6, 10)));
    root.style.setProperty('--color-emerald-500', this.hslString(primaryHSL.h, Math.min(primaryHSL.s + 10, 100), Math.max(primaryHSL.l - 15, 10)));
    root.style.setProperty('--color-emerald-600', this.hslString(primaryHSL.h, Math.min(primaryHSL.s + 12, 100), Math.max(primaryHSL.l - 25, 10)));
    root.style.setProperty('--color-emerald-700', this.hslString(primaryHSL.h, Math.min(primaryHSL.s + 15, 100), Math.max(primaryHSL.l - 32, 10)));
    root.style.setProperty('--color-emerald-800', this.hslString(primaryHSL.h, Math.min(primaryHSL.s + 10, 100), Math.max(primaryHSL.l - 40, 10)));
    root.style.setProperty('--color-emerald-900', this.hslString(primaryHSL.h, Math.min(primaryHSL.s + 8, 100), Math.max(primaryHSL.l - 48, 5)));
    root.style.setProperty('--color-emerald-950', this.hslString(primaryHSL.h, Math.min(primaryHSL.s + 5, 100), Math.max(primaryHSL.l - 60, 3)));

    // Secondary / zinc palette
    const secHSL = this.hexToHSL(c.secondaryColor);
    root.style.setProperty('--color-zinc-900', c.secondaryColor);
    root.style.setProperty('--color-zinc-950', this.hslString(secHSL.h, secHSL.s, Math.max(secHSL.l - 5, 2)));
    root.style.setProperty('--color-zinc-800', this.hslString(secHSL.h, secHSL.s, Math.min(secHSL.l + 5, 20)));
    root.style.setProperty('--color-zinc-700', this.hslString(secHSL.h, secHSL.s, Math.min(secHSL.l + 15, 30)));

    // CTA accent color
    root.style.setProperty('--app-accent-color', c.accentColor);
    root.style.setProperty('--app-accent-soft', c.accentColor + '20');

    // Fonts
    root.style.setProperty('--app-font-body', `'${c.fontFamily}', system-ui, sans-serif`);
    root.style.setProperty('--app-font-heading', `'${c.headingFont}', system-ui, sans-serif`);
    document.body.style.fontFamily = `'${c.fontFamily}', system-ui, sans-serif`;

    // Load Google Fonts dynamically
    this.loadGoogleFont(c.fontFamily);
    if (c.headingFont !== c.fontFamily) {
      this.loadGoogleFont(c.headingFont);
    }

    // Font size
    const sizeMap: Record<string, string> = { small: '14px', default: '16px', large: '18px' };
    root.style.setProperty('--app-font-size', sizeMap[c.fontSize]);

    // Border radius
    const radiusMap: Record<string, string> = {
      none: '0px', small: '4px', medium: '8px', large: '16px', pill: '9999px',
    };
    root.style.setProperty('--app-border-radius', radiusMap[c.borderRadius]);

    // Container width
    const widthMap: Record<string, string> = {
      compact: '1200px', default: '1440px', wide: '1600px', full: '100%',
    };
    root.style.setProperty('--app-container-width', widthMap[c.containerWidth]);

    // Product grid columns
    root.style.setProperty('--app-product-columns', c.productColumns);

    // Button style — use data attribute for CSS selectors
    root.style.setProperty('--app-button-style', c.buttonStyle);

    // Feature flags and style modes as data attributes for CSS-based toggling
    root.dataset['showBanner'] = String(c.showBanner);
    root.dataset['darkMode'] = String(c.darkMode);
    root.dataset['announcementBar'] = String(c.announcementBar);
    root.dataset['buttonStyle'] = c.buttonStyle;
    root.dataset['headerStyle'] = c.headerStyle;
    root.dataset['borderRadius'] = c.borderRadius;
    root.dataset['showQuickView'] = String(c.showQuickView);
  }

  private loadGoogleFont(fontName: string) {
    if (!this.isBrowser) return;
    const id = `gfont-${fontName.replace(/\s+/g, '-').toLowerCase()}`;
    if (document.getElementById(id)) return;

    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/\s+/g, '+')}:wght@300;400;500;600;700;800;900&display=swap`;
    document.head.appendChild(link);
  }

  private saveToStorage() {
    if (!this.isBrowser) return;
    try {
      localStorage.setItem('app-appearance', JSON.stringify(this.config()));
    } catch {}
  }

  private loadFromStorage() {
    if (!this.isBrowser) return;
    try {
      const stored = localStorage.getItem('app-appearance');
      if (stored) {
        const parsed = JSON.parse(stored);
        this.config.set({ ...DEFAULT_CONFIG, ...parsed });
      }
    } catch {}
  }

  private hexToHSL(hex: string): { h: number; s: number; l: number } {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  }

  private hslString(h: number, s: number, l: number): string {
    return `hsl(${h}, ${s}%, ${l}%)`;
  }
}
