import { Injectable } from '@angular/core';
import {VOLUNTARIOS} from './voluntarios.json';
import { Voluntario } from './voluntario';
import {of,  Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VoluntarioService {

  private url: string = 'http://localhost:8080/api/voluntarios';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  
  constructor(private http: HttpClient) { }

  getVoluntarios(): Observable<Voluntario[]> {
    return of(VOLUNTARIOS);
    //  return this.http.get(this.url).pipe(
     //   map(response => response as Voluntario[])
     // );
  }

  create(voluntario: Voluntario) : Observable<Voluntario>{
    return this.http.post<Voluntario>(this.url, voluntario, {headers: this.httpHeaders})
  } 

  getVoluntario(id): Observable<Voluntario>{
    return this.http.get<Voluntario>(`${this.url}/${id}`);
  }

  update(voluntario: Voluntario): Observable<Voluntario>{
    return this.http.put<Voluntario>(`${this.url}/${voluntario.id}`, voluntario, {headers:this.httpHeaders})
  }

  delete(id: number): Observable<Voluntario>{
    return this.http.delete<Voluntario>(`${this.url}/${id}`, {headers: this.httpHeaders})
  }
}
