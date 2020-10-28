import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
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
  
  constructor(public historialService: HistorialService) { }

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

  borrarHistorial(id: number, i: number): void {
    Swal.fire({
      title: '¿Desea eliminar el historial?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'Cancelar',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if(result.value){
        this.historiales.splice(i, 1)
        this.historialService.borrarHistorial(id).subscribe()
      }
    })
  }
}

