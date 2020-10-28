import { Injectable } from '@angular/core';
import { Contrato } from './contrato';
import {Observable, throwError } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from "@angular/router";
import { environment } from 'src/environments/environment';
import { Mascota } from '../adoptantes/mascota';
import { Adoptante } from '../adoptantes/adoptante';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../usuarios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  private urlAPI: string = environment.urlCSH;
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  
  constructor(private http: HttpClient, private router: Router, public authService : AuthService) { }

  private agregarAuthorizationHeader() {
    let token = this.authService.token;
    if(token != null){
      return this.httpHeaders.append('Authorization', 'Bearer' + token);
    }
    return this.httpHeaders;
  }

  private isNoAutorizado(e): boolean {
    if(e.status == 401){
      if(this.authService.isAuthenticated()){
        this.authService.logout();
      }
      this.router.navigate(['/login'])
      return true;
    }

    if(e.status === 403){
      this.router.navigate(["/"]);
      return true;
    }
    return false;
  }

  getContratos(): Observable<Contrato[]> {
    return this.http.get<Contrato[]>(`${this.urlAPI}/contrato`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
          return throwError(e);
      })
    );
  }

  getContratosMascota(mascota: any): Observable<Contrato[]>{
    return this.http.get<Contrato[]>(`${this.urlAPI}/contrato/filtrar?nombreMascota=${mascota}`,  {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError;
        }
      })
    );
  }

  getMascotas(): Observable<Mascota[]>{
    return this.http.get<Mascota[]>(`${this.urlAPI}/mascotas`, {headers: this.agregarAuthorizationHeader()} )
  }

  getAdoptantes(): Observable<Adoptante[]>{
    return this.http.get<Adoptante[]>(`${this.urlAPI}/adoptante`,  {headers: this.agregarAuthorizationHeader()})
  }

  crearContrato(contrato: any) {
    return this.http.post(`${this.urlAPI}/contrato`, contrato,  {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError;
        }
      })
    )
  }

  exportPdfProducts(id: number): Observable<Blob>{
    return this.http.get(`${this.urlAPI}/export/pdf/${id}`, {responseType: 'blob'}).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError;
        }
      })
    )
  }
}