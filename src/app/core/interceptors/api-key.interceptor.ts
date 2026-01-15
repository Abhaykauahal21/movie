import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const base = environment.omdbBaseUrl.replace(/\/+$/, '');
  const url = req.url.replace(/\/+$/, '');
  if (url.startsWith(base)) {
    const hasKey = req.params.has('apikey');
    const apiKey = environment.apiKey;
    const newReq = hasKey || !apiKey
      ? req
      : req.clone({ params: req.params.set('apikey', apiKey) });
    return next(newReq);
  }
  return next(req);
};
