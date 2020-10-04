import { Component, OnInit } from '@angular/core';
import { Veterinaria } from './veterinaria';
import { VeterinariaService }from './veterinaria.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-veterinarias',
  templateUrl: './veterinarias.component.html',
})
export class VeterinariasComponent implements OnInit {


  veterinarias : Veterinaria[];

  constructor(private veterinariaService: VeterinariaService) {

  }

  ngOnInit(): void {
    this.veterinariaService.getVeterinarias().subscribe(
      veterinarias => this.veterinarias = veterinarias
    );
  }

  delete(veterinaria: Veterinaria): void {
    swal.fire({
      title: '',
      text: `¿Desea eliminar la veterinaria ${veterinaria.razonSocial}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'Cancelar',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.value) {

        console.log('se elimino: ', veterinaria)
        this.veterinariaService.delete(veterinaria.id).subscribe(
          response => {
            this.veterinarias = this.veterinarias.filter(vet => vet !== veterinaria)
            swal.fire(
              'Eliminado!',
              '',
              'success',
              )
            }
        )
      }
    })
  }

}
