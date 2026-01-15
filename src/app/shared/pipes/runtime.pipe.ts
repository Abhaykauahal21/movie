import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'runtime'
})
export class RuntimePipe implements PipeTransform {
  transform(value: string | number): string {
    const mins = typeof value === 'number'
      ? value
      : parseInt(String(value).replace(/\D+/g, ''), 10);
    if (!mins || isNaN(mins)) return '';
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}h ${m}m`;
  }
}
