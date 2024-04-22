import { Component } from '@angular/core';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
})
export class ContentComponent {
  scrollTo(target: HTMLElement): void {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}
