import { Component, OnInit } from '@angular/core';
import { Mascota } from './mascota';
import { MascotaService }from './mascota.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
})
export class MascotasComponent implements OnInit {


  mascotas : Mascota[];

  constructor(private mascotaService: MascotaService) {

  }

  ngOnInit(): void {
    this.mascotaService.getMascotas().subscribe(
      mascotas => this.mascotas = mascotas
    );
  }

  delete(mascota: Mascota): void {
    swal.fire({
      title: '',
      text: `¿Desea eliminar la mascota ${mascota.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'Cancelar',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.value) {

        console.log('se elimino: ', mascota)
        this.mascotaService.delete(mascota.id).subscribe(
          response => {
            this.mascotas = this.mascotas.filter(vet => vet !== mascota)
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