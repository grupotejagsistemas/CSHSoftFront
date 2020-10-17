import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MovimientoRecurso } from './movimiento-recurso';

@Injectable({
  providedIn: 'root'
})
export class MovimientoRecursoService {

  private urlAPI: string = environment.urlCSH;
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient, private router: Router) { }

  getMovRecursos(): Observable<MovimientoRecurso[]> {
    return this.http.get<MovimientoRecurso[]>(`${this.urlAPI}/movimientorecursos`)
  }
  
}
