import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppStateService } from '../../../core/state/app-state.service';
import { debounceTime, distinctUntilChanged, filter, Subject, takeUntil } from 'rxjs';

@Component({
  standalone: true,
  selector: 'search-bar',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private appState = inject(AppStateService);
  private destroy$ = new Subject<void>();

  searchControl = new FormControl('');

  ngOnInit() {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(value => {
      const q = (value || '').trim();
      if (q.length) {
        this.appState.addRecentSearch(q);
        this.router.navigate(['/search'], { queryParams: { query: q, page: 1 } });
      } else {
        // Optional: Navigate to empty search or stay?
        // User requirement: "Navigate to /search?q=term"
        // If empty, maybe just do nothing or clear.
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  clear() {
    this.searchControl.setValue('');
    // Optionally navigate back or to base search
  }
}
