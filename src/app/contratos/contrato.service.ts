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


  getContratos(): Observable<Contrato[]> {
    return this.http.get<Contrato[]>(`${this.urlAPI}/contrato`)
  }

  getContratosMascota(mascota: any): Observable<Contrato[]>{
    return this.http.get<Contrato[]>(`${this.urlAPI}/contrato/filtrar?nombreMascota=${mascota}`)
  }

  getMascotas(): Observable<Mascota[]>{
    return this.http.get<Mascota[]>(`${this.urlAPI}/mascotas` )
  }

  getAdoptantes(): Observable<Adoptante[]>{
    return this.http.get<Adoptante[]>(`${this.urlAPI}/adoptante`)
  }

  crearContrato(contrato: any) {
    return this.http.post(`${this.urlAPI}/contrato`, contrato)
  }

  exportPdfProducts(id: number): Observable<Blob>{
    return this.http.get(`${this.urlAPI}/export/pdf/${id}`, {responseType: 'blob'})
  }

}