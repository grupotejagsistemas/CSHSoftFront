import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MovimientoRecurso } from '../movimientos-recursos/movimiento-recurso';
import { TipoMovimiento } from '../movimientos-recursos/tipoMovimiento';
import { MovimientoMonetario } from './movimiento-monetario';

@Injectable({
  providedIn: 'root'
})
export class MovimientoMonetarioService {
  
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


  getMovMonetarios(): Observable<MovimientoMonetario[]>{
    return this.http.get<MovimientoMonetario[]>(`${this.urlAPI}/movimientomonetarios`).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  crearMovMonetarios(movMonetarios: any){
    return this.http.post(`${this.urlAPI}/movimientomonetarios`, movMonetarios).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError;
        }
      })
    );
  }

  getTipoMovimiento(): Observable<TipoMovimiento[]>{
    return this.http.get<TipoMovimiento[]>(`${this.urlAPI}/tipomovimiento`)
  }

}
