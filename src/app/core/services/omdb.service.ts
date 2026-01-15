import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { OmdbSearchResponse, OmdbMovieDetail } from '../models/omdb.models';

@Injectable({ providedIn: 'root' })
export class OmdbService {
  private http = inject(HttpClient);
  private base = environment.omdbBaseUrl;

  search(term: string, page = 1): Observable<OmdbSearchResponse> {
    const params = new HttpParams()
      .set('s', term)
      .set('type', 'movie')
      .set('page', page.toString());
    return this.http.get<OmdbSearchResponse>(this.base, { params });
  }

  detailsById(imdbId: string): Observable<OmdbMovieDetail> {
    const params = new HttpParams()
      .set('i', imdbId)
      .set('plot', 'full');
    return this.http.get<OmdbMovieDetail>(this.base, { params });
  }
}
