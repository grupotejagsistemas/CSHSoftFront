/*import { Component, OnInit } from '@angular/core';
import { Adoptante } from './adoptante';
import { AdoptanteService }from './adoptante.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-adoptantes',
  templateUrl: './adoptantes.component.html',
  styleUrls: ['./adoptantes.component.css']
})
export class AdoptantesComponent implements OnInit {

  adoptantes: Adoptante[]

  constructor(private adoptanteService: AdoptanteService) { }

  ngOnInit(): void {

    this.adoptanteService.getAdoptantes().subscribe((data: any) => {
      this.adoptantes = data;
      console.log('array de adoptantes: ' + this.adoptantes)
    })
  }

   // delete(adoptante: Adoptante): void {
  //   swal.fire({
  //     title: '',
  //     text: `¿Desea eliminar al adoptante ${adoptante.nombreCompleto}?`,
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: 'Cancelar',
  //     confirmButtonText: 'Confirmar'
  //   }).then((result) => {
  //     if (result.value) {

  //       console.log('se elimino: ', adoptante)
  //       this.adoptanteService.delete(adoptante.idAdoptante).subscribe(
  //         response => {
  //           this.adoptantes = this.adoptantes.filter(adop => adop !== adoptante)
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
*/