import { Component, signal, OnInit, OnDestroy, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Header } from "./shared/components/header/header";
import { Footer } from "./shared/components/footer/footer";
import { AuthModalComponent } from './shared/components/auth-modal/auth-modal';
import { AppearanceService } from './shared/services/appearance.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Header, CommonModule, AuthModalComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('ecommerce');
  isAdmin = signal(false);
  private routerSub?: Subscription;

  // Inject to ensure it initializes on startup and applies saved theme
  private appearance = inject(AppearanceService);

  constructor(private router: Router) {}

  ngOnInit() {
    this.routerSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        const navEnd = event as NavigationEnd;
        this.isAdmin.set(navEnd.urlAfterRedirects.startsWith('/admin'));
      });
  }

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
  }
}
