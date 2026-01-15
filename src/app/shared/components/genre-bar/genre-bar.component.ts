import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  standalone: true,
  selector: 'genre-bar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './genre-bar.component.html',
  styleUrls: ['./genre-bar.component.scss']
})
export class GenreBarComponent {
  @Input() genres: string[] = [];
}
