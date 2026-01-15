import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { MovieDetailsComponent } from './pages/details/movie-details.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { GenreComponent } from './pages/genre/genre.component';

export const APP_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'movie/:imdbId', component: MovieDetailsComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'genre/:genreName', component: GenreComponent },
  { path: '**', redirectTo: 'home' }
];
