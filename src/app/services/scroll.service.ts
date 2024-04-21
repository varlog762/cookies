import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  scrollTo(target: HTMLElement): void {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}
