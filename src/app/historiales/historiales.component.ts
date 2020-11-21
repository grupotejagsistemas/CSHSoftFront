import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuditoriaService } from '../auditoria/auditoria.service';
import { AuthService } from '../usuarios/auth.service';
import { Historial } from './historial';
import { HistorialService } from './historial.service';

@Component({
  selector: 'app-historiales',
  templateUrl: './historiales.component.html',
  styleUrls: ['./historiales.component.css']
})
export class HistorialesComponent implements OnInit {

  busquedaNombreMascota: string; 
  historiales: Historial[];
  p: number = 1;
  
  constructor(
    public historialService: HistorialService,
    private auditoriaService: AuditoriaService,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
  this.historialService.getHistoriales().subscribe((data: any) => {
    this.historiales = data;
  })
  }

  filtroNombreMascota(nombreMascota: string): void{
    this.historialService.getNombreMascota(nombreMascota).subscribe((data: any) => {
      this.historiales = data;
    })
  }

  auditoriaBorrarObj = {
    usuario: this.authService.usuario.username,
    accion: `Eliminación de historial`
  }
  

  
  auditoriaBorrar() {
    this.auditoriaService.crearAuditoria(this.auditoriaBorrarObj).subscribe(response => {
      return response;
    })
  }
  
  


  borrarHistorial(id: number, i: number): void {
    Swal.fire({
      text: '¿Desea eliminar el historial?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'Cancelar',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if(result.value){
        this.auditoriaBorrar();
        this.historialService.borrarHistorial(id).subscribe(() => {
          this.historiales = this.historiales.filter(historial => historial.id !== id);
        })
      }
    })
  }
}

