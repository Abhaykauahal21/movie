import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/app.routes';
import { apiKeyInterceptor } from './app/core/interceptors/api-key.interceptor';
import { httpStatusInterceptor } from './app/core/interceptors/http-status.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(APP_ROUTES),
    provideHttpClient(withInterceptors([apiKeyInterceptor, httpStatusInterceptor]))
  ]
}).catch(err => console.error(err));
