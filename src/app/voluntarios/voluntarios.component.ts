import { Component, OnInit } from '@angular/core';
import { Voluntario } from './voluntario';
import { VoluntarioService }from './voluntario.service';
import swal from 'sweetalert2';


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

  constructor(public voluntarioService: VoluntarioService) {

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
      this.voluntarioService.filtrarPresencial("s").subscribe((data: any) => {
        this.voluntarios = data;
      })
    } else {
      this.voluntarioService.getVoluntarios().subscribe((data: any) => {
        this.voluntarios = data; 
      })
    }
  }

  filtroTransito(): void {
    if(this.checkedTransito === true){
      this.voluntarioService.filtrarTransito("s").subscribe((data: any) => {
        this.voluntarios = data; 
      })
    } else {
      this.voluntarioService.getVoluntarios().subscribe((data: any) => {
        this.voluntarios = data;
      })
    }
  }

  filtroTraslado(): void {
    if(this.checkedTraslado === true){
      this.voluntarioService.filtrarTraslado("s").subscribe((data: any) => {
        this.voluntarios = data;
      })
    } else {
      this.voluntarioService.getVoluntarios().subscribe((data: any) => {
        this.voluntarios = data;
      })
    }
  }

  borrarVoluntario(id: number, i: number): void {
      swal.fire({
        title: '',
        text: `¿Desea eliminar al voluntario ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: 'Cancelar',
        confirmButtonText: 'Confirmar'
      }).then((result) => {
        if (result.value) {
          this.voluntarios.splice(i, 1)
            this.voluntarioService.borrarVoluntario(id).subscribe()
        }
      })
  }
}
