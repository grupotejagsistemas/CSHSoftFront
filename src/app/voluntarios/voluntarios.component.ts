import { Component, OnInit } from '@angular/core';
import { Voluntario } from './voluntario';
import { VoluntarioService }from './voluntario.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-voluntarios',
  templateUrl: './voluntarios.component.html',
})
export class VoluntariosComponent implements OnInit {


  voluntarios: Voluntario[];

  constructor(public voluntarioService: VoluntarioService) {

  }

  ngOnInit(): void {

    this.voluntarioService.getVoluntarios().subscribe((data: any) => {

      this.voluntarios = data;
      console.log('array de voluntarios: ' + this.voluntarios);

    });

  }

  // delete(voluntario: Voluntario): void {
  //   swal.fire({
  //     title: '',
  //     text: `¿Desea eliminar al voluntario ${voluntario.nombreCompleto}?`,
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: 'Cancelar',
  //     confirmButtonText: 'Confirmar'
  //   }).then((result) => {
  //     if (result.value) {

  //       console.log('se elimino: ', voluntario)
  //       this.voluntarioService.delete(voluntario.id).subscribe(
  //         response => {
  //           this.voluntarios = this.voluntarios.filter(vol => vol !== voluntario)
  //           swal.fire(
  //             'Eliminado!',
  //             '',
  //             'success',
  //             )
  //           }
  //       )
  //     }
  //   })
  // }

}
