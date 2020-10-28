import { Injectable } from '@angular/core';
import { Mascota } from './mascota';
import { EstadoMascota } from './estadoMascota';
import {of,  Observable, throwError } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from "@angular/router";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  private urlAPI: string = environment.urlCSH;
  
  constructor(private http: HttpClient, private router: Router) { }


  getMascotas(): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this.urlAPI}/mascotas`);
  }

  getEstados(): Observable<EstadoMascota[]> {
    return this.http.get<EstadoMascota[]>(`${this.urlAPI}/estadoMascota`);
  }
 

  getMascotasNombre(nombre: any): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this.urlAPI}/mascotas/filtrar?nombre=${nombre}`);
  }

  crearMascota(mascota: any) {
    return this.http.post(`${this.urlAPI}/mascotas`, mascota);
  }

  getMascota(id: number): Observable<Mascota> {
    return this.http.get<Mascota>(`${this.urlAPI}/mascotas/${id}`);
  }

  modificarMascota(mascota: any){
    return this.http.put(`${this.urlAPI}/mascotas/${mascota.id}`, mascota);
  }

  borrarMascota(id: number){ 
    return this.http.delete(`${this.urlAPI}/mascotas/${id}`);
  }
  
  filtroMascotaMacho(sexo: string){
    return this.http.get(`${this.urlAPI}/mascotas/filtrarSexo?sexo=${sexo}`);
  }

  filtroMascotaHembra(sexo: string){ 
    return this.http.get(`${this.urlAPI}/mascotas/filtrarSexo?sexo=${sexo}`);
  }

  subirFoto(file: File, id): Observable<Mascota>{

    let formData = new FormData();
    
    formData.append("file", file);
    formData.append('id', id);

    return this.http.post(`${this.urlAPI}/mascotas/upload`, formData).pipe(
      map((resp: any) => resp.mascota as Mascota)
      )
  }
}
