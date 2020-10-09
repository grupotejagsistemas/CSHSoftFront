import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Mascota } from '../adoptantes/mascota';
import { MascotaService } from './mascota.service';

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.css']
})
export class MascotasComponent implements OnInit {

  busquedaNombre: string;
  mascotas: Mascota[]

  constructor(public mascotaService: MascotaService) { }

  ngOnInit(): void {
    this.mascotaService.getMascotas().subscribe((data: any) => {
      this.mascotas = data;
    })
  }

  filtroNombre(nombre: string): void {
    console.log('nombre', nombre)

    this.mascotaService.getMascotasNombre(nombre).subscribe((data: any ) => {
      this.mascotas = data;
      console.log('mascotas', data)
     })
  }

  borrarMascota(id: number, i: number): void {
    Swal.fire({
      title: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'Cancelar',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.value) {
        this.mascotas.splice(i, 1)
          this.mascotaService.borrarMascota(id).subscribe()
      }
    })
  }

}
