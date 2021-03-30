import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError, find, map} from 'rxjs/operators';
import {Jeu} from '../_models/jeu';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private http: HttpClient) { }

  list(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/jeux`, httpOptions)
      .pipe(
        map(g => g.data.item),
        catchError(err => throwError(err))
      );
  }

  getGameById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/jeux/${id}`, httpOptions)
      .pipe(
        map(g => g.data.item),
        catchError(err => throwError(err))
      );
  }
}
