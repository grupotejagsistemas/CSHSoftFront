import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auditoria } from './auditoria';

@Injectable({
  providedIn: 'root'
})
export class AuditoriaService {

  private urlAPI: string = environment.urlCSH;

  constructor(
    private http: HttpClient, private router: Router
  ) { }

  getAuditorias(): Observable<Auditoria[]>{
    return this.http.get<Auditoria[]>(`${this.urlAPI}/auditoria`)
  }

  getAuditoriaUsuario(usuario: any): Observable<Auditoria[]>{
    return this.http.get<Auditoria[]>(`${this.urlAPI}/filtronombre?usuario=${usuario}`)
  }

}
