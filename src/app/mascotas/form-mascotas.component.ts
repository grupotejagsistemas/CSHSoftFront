import { Component, OnInit } from '@angular/core';
import { Mascota } from './mascota';
import {EstadoMascota } from './estadoMascota';
import { MascotaService } from './mascota.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2'
@Component({
  selector: 'app-form-mascotas',
  templateUrl: './form-mascotas.component.html',
  styleUrls: ['./form-mascotas.component.css']
})
export class FormMascotasComponent implements OnInit {


  mascota: Mascota;
  estados: EstadoMascota[];
  titulo: string = 'Nueva Mascota'


  constructor(
    private mascotaService: MascotaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    
    if(id !== 0){
      this.mascotaService.getMascota(this.mascota.id).subscribe((resp: any) => {
        this.mascotaObj = resp;
      })
    }

    this.mascotaService.getEstados().subscribe((resp: any) => {
        this.estados = resp;

    })
}

mascotaObj = {
  id: null,
  nombre : "",
  fechaNacimiento : new Date(),
  particularidadesFisicas : "",
  sexo: "",
  fotoMascota: "",
  fechaRescate: new Date(),
  lugarRescate: "",
  descripcionRescate: "",
  especie: "",
  estado: null
};

  public agregar(): void {
    console.log(' agregar mascota', this.mascotaObj);
    this.mascotaService.crearMascota(this.mascotaObj)
    .subscribe(
    response => {
        this.router.navigate(['/mascotas'])
        swal.fire({
          icon: 'success',
          title: 'Creación exitosa',
          showConfirmButton: false,
          timer: 1500
        })
        return response; 
      })
    }

  public modificar(): void{
    console.log('modificar mascota', this.mascotaObj);
      this.mascotaService.modificarMascota(this.mascotaObj)
      .subscribe(
        response => {
          this.router.navigate(['/mascotas'])
          swal.fire({
            icon: 'success',
            title: 'La mascota ha sido modificada',
            showConfirmButton: false,
            timer: 1500
          })
          return response;
        }
      ) 
    }

}
