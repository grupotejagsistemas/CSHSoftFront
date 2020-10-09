import { Injectable } from '@angular/core';
//import {CONTRATOS} from './contratos.json';
import { Contrato } from './contrato';
import {of,  Observable, throwError } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from "@angular/router";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  private urlAPI: string = environment.urlCSH;
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  
  constructor(private http: HttpClient, private router: Router) { }

  getContratos(): Observable<Contrato[]> {
    return this.http.get<Contrato[]>(`${this.urlAPI}/contrato`)
     
  }

  crearContrato(contrato: Contrato) {
    console.log('vol ', contrato);
    return this.http.post(`${this.urlAPI}/contrato`, contrato)
  }

  getContrato(id: number): Observable<Contrato>{
    return this.http.get<Contrato>(`${this.urlAPI}/contrato/${id}`)
  }

  modificarContrato(contrato: Contrato) {
    console.log('modifica', contrato)
    return this.http.put(`${this.urlAPI}/contrato/${contrato.id}`, contrato)
  }

  borrarContrato(id: number) {
    return this.http.delete(`${this.urlAPI}/contrato/${id}`);
 }
  
}