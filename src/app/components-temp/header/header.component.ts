import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() productsElemRef!: ElementRef;

  onClick() {
    console.log(this.productsElemRef);
  }
}
