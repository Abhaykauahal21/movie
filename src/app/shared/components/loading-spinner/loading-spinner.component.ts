import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'loading-spinner',
  template: `<div class="spinner"></div>`,
  styles: [`
    .spinner {
      width: 32px; height: 32px;
      border: 3px solid rgba(255,255,255,0.2);
      border-top-color: #e50914;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 16px auto;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
  `]
})
export class LoadingSpinnerComponent {}
