import { Component, OnInit } from '@angular/core';
import { Voluntario } from './voluntario';
import { VoluntarioService }from './voluntario.service';
import swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';
import { AuditoriaService } from '../auditoria/auditoria.service';


@Component({
  selector: 'app-voluntarios',
  templateUrl: './voluntarios.component.html',
})
export class VoluntariosComponent implements OnInit {

  busquedaNombre: string;
  voluntarios: Voluntario[];
  checkedTransito: boolean;
  checkedTraslado: boolean;
  checkedPresencial: boolean;
  p: number = 1;

  constructor(
    public voluntarioService: VoluntarioService,
    private auditoriaService: AuditoriaService,
    private authService: AuthService
    ) {

  }

  ngOnInit(): void {

    this.voluntarioService.getVoluntarios().subscribe((data: any) => {

      this.voluntarios = data;

    });

  }

  filtroNombre(nombre: string): void{
    this.voluntarioService.getVoluntariosNombre(nombre).subscribe((data: any) => {
      this.voluntarios = data;
      
    })
  }

  filtroPresencial(): void{
    if(this.checkedPresencial === true) {
      this.voluntarioService.filtrarPresencial("presencial").subscribe((data: any) => {
        this.voluntarios = data;
        this.checkedTransito = false;
        this.checkedTraslado = false;
      })
    } else {
      this.voluntarioService.getVoluntarios().subscribe((data: any) => {
        this.voluntarios = data; 
      })
    }
  }

  filtroTransito(): void {
    if(this.checkedTransito === true){
      this.voluntarioService.filtrarTransito("transito").subscribe((data: any) => {
        this.voluntarios = data; 
        this.checkedPresencial = false;
        this.checkedTraslado = false; 
      })
    } else {
      this.voluntarioService.getVoluntarios().subscribe((data: any) => {
        this.voluntarios = data;
      })
    }
  }

  filtroTraslado(): void {
    if(this.checkedTraslado === true){
      this.voluntarioService.filtrarTraslado("traslado").subscribe((data: any) => {
        this.voluntarios = data;
        this.checkedPresencial = false; 
        this.checkedTransito = false; 
      })
    } else {
      this.voluntarioService.getVoluntarios().subscribe((data: any) => {
        this.voluntarios = data;
      })
    }
  }

  auditoriaAgregarObj = {
    usuario: this.authService.usuario.username,
    accion: `Alta de voluntario`
  }
  
  
  auditoriaBorrar() {
    this.auditoriaService.crearAuditoria(this.auditoriaAgregarObj).subscribe(response => {
      return response;
    })
  }
  
  

  borrarVoluntario(id: number, voluntario: string): void {

      swal.fire({
        text: `¿Desea eliminar al voluntario ${voluntario} ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: 'Cancelar',
        confirmButtonText: 'Confirmar'
      }).then((result) => {
        if (result.value) {
          this.auditoriaBorrar();
            this.voluntarioService.borrarVoluntario(id).subscribe(
              () => {
                this.voluntarios = this.voluntarios.filter(vol => vol.id !== id);
              }
            )
        }
      })
  }
}
