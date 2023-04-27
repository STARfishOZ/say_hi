import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, filter, map, Observable, of } from 'rxjs';
import { Movie, MovieDataResponse } from '@app/features/enter/types/movie';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EnterService {
  constructor(private http: HttpClient) { }

  getMovies(movie: string): Observable<Movie[]> {
    return this.http.get<MovieDataResponse>(`${environment.omdbApi}?apikey=${environment.apiKey}&type=movie&s=${movie}`)
      .pipe(
        filter((data) => data.Response !== 'False'),
        map((data) =>
          data.Search.map(({Title}) => ({title: Title})),
        ),
        catchError((err) => {
          console.warn(err);
          return of([]);
        })
      );
  }

}
