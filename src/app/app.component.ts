import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { ProductsComponent } from './components/products/products.component';
import { CurrencyComponent } from './components/currency/currency.component';
import { LoveComponent } from './components/love/love.component';
import { OrderComponent } from './components/order/order.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    MainContentComponent,
    ProductsComponent,
    CurrencyComponent,
    LoveComponent,
    OrderComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'cookies';
}
