import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class MecaniquesService {

  constructor(private http: HttpClient) { }

  getMeca(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/mecanics`, httpOptions)
      .pipe(
        map(g => g.data.item),
        catchError(err => throwError(err))
      );
  }
}
