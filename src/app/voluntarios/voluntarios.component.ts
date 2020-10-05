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

  constructor(public voluntarioService: VoluntarioService) {

  }

  ngOnInit(): void {

    this.voluntarioService.getVoluntarios().subscribe((data: any) => {

      this.voluntarios = data;
      console.log('array de voluntarios: ' + this.voluntarios);

    });

  }

  filtroNombre(nombre: string): void{
    console.log('nombre:', nombre)
    
    this.voluntarioService.getVoluntariosNombre(nombre).subscribe((data: any) => {
      this.voluntarios = data;
      
    })
  }

 delete(id: any): void {
   swal.fire({
     title: '',
  //   text: `¿Desea eliminar al voluntario ${voluntario.nombrecompleto}?`,
     icon: 'warning',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: 'Cancelar',
     confirmButtonText: 'Confirmar'
   }).then((result) => {
     if (result.value) {

       console.log('se elimino: ', id)
       this.voluntarioService.delete(id)
       //  response => {
       //    this.voluntarios = this.voluntarios.filter(vol => vol !== voluntario)
       //    swal.fire(
       //      'Eliminado!',
       //      '',
       //      'success',
       //      )
       //    }
     }
   })
 }

}
