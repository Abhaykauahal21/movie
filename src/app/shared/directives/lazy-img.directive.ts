import { Directive, ElementRef, Input, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
  standalone: true,
  selector: 'img[lazyImg]'
})
export class LazyImgDirective implements OnDestroy {
  private observer?: IntersectionObserver;

  @Input('lazyImg') src = '';

  constructor(private el: ElementRef<HTMLImageElement>, private r2: Renderer2) {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (this.src) {
            this.r2.setAttribute(this.el.nativeElement, 'src', this.src);
          }
          this.observer?.disconnect();
        }
      });
    }, { rootMargin: '200px' });
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
