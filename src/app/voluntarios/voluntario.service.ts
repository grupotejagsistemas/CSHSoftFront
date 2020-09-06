import { Injectable } from '@angular/core';
import {VOLUNTARIOS} from './voluntarios.json';
import { Voluntario } from './voluntario';
import {of,  Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoluntarioService {

  constructor() { }

  getVoluntarios(): Observable<Voluntario[]> {
    return of(VOLUNTARIOS);
  }
}
