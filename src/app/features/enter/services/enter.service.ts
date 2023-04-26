import { Injectable } from '@angular/core';
import { catchError, filter, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MovieDataResponse, MovieInterface } from '../types/movie.interface';

@Injectable({
  providedIn: 'root'
})
export class EnterService {
  private apiKey = 83513884;
  private url = 'https://www.omdbapi.com/'
  constructor(private http: HttpClient) { }

  getMovies(movie: string): Observable<MovieInterface[]> {
    return this.http.get<MovieDataResponse>(`${this.url}?apikey=${this.apiKey}&type=movie&s=${movie}`)
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
