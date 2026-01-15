import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { AppStateService } from '../state/app-state.service';

export const httpStatusInterceptor: HttpInterceptorFn = (req, next) => {
  const state = inject(AppStateService);
  state.incLoading();
  return next(req).pipe(finalize(() => state.decLoading()));
};
