import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MovimientoRecurso } from './movimiento-recurso';
import { TipoMovimiento } from './tipoMovimiento';

@Injectable({
  providedIn: 'root'
})
export class MovimientoRecursoService {

  private urlAPI: string = environment.urlCSH;
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient, private router: Router) { }

  private isNoAutorizado(e): boolean {
    if(e.status == 401 || e.status==403){
      this.router.navigate(['/login'])
      return true;
    }
    return false;
  }

  getMovRecursos(): Observable<MovimientoRecurso[]> {
    return this.http.get<MovimientoRecurso[]>(`${this.urlAPI}/movimientorecursos`).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  getTipoMovimiento(): Observable<TipoMovimiento[]> {
    return this.http.get<TipoMovimiento[]>(`${this.urlAPI}/tipomovimiento`)
  }

  crearMovRecursos(movRecurso: any){
    return this.http.post(`${this.urlAPI}/movimientorecursos`, movRecurso).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError;
        }
      })
    );
  }
}
