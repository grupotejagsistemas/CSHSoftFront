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

    this.veterinariaService.getVeterinarias().subscribe((data: any) => {

      this.veterinarias = data;
      console.log('array de veterinarias: ' + this.veterinarias);

    });

  }

  filtroNombre(nombre: string): void{
    console.log('nombre:', nombre)
    
    this.veterinariaService.getVeterinariasNombre(nombre).subscribe((data: any) => {
      this.veterinarias = data;
      
    })
  }

  borrarVeterinaria(id: number): void {
      swal.fire({
        title: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: 'Cancelar',
        confirmButtonText: 'Confirmar'
      }).then((result) => {
        if (result.value) {
            this.veterinariaService.borrarVeterinaria(id).subscribe()
        }
      })
  }
}
