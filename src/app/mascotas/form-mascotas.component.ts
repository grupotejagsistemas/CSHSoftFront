import { Component, OnInit } from '@angular/core';
import { Mascota } from './mascota';
import {EstadoMascota } from './estadoMascota';
import { MascotaService } from './mascota.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2'
import Swal from 'sweetalert2';
@Component({
  selector: 'app-form-mascotas',
  templateUrl: './form-mascotas.component.html',
  styleUrls: ['./form-mascotas.component.css']
})
export class FormMascotasComponent implements OnInit {


  mascota: Mascota;

  estados: EstadoMascota[];
  private fotoSeleccionada: File;


  constructor(
    private mascotaService: MascotaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    
    if(id !== 0){
      this.mascotaService.getMascota(id).subscribe((resp: any) => {
        console.log('mascota', id)
        this.mascotaObj = resp;
      })
    }

    this.mascotaService.getEstados().subscribe((resp: any) => {
        this.estados = resp;
        this.estados.unshift({
          descripcion: 'Seleccione estado',
          id: this.mascotaObj.estado.id
        })

    })
}

mascotaObj = {
  id: null,
  nombre : "",
  fechaNacimiento : new Date(),
  particularidadesFisicas : "",
  sexo: null,
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
    .subscribe((response: any) => {
        this.router.navigate(['/mascotas'])
        swal.fire({
          icon: 'success',
          title: 'Creación exitosa',
          showConfirmButton: false,
          timer: 1500
        })
        this.mascota = response;
        this.subirFoto(response.id.toString())
        return response; 
      })
    }

  public modificar(): void{
     const id = +this.route.snapshot.paramMap.get('id');

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
          if(id !== 0){
            this.subirFoto(id.toString())
          }
          return response;
        }
      ) 
    }

    seleccionarFoto(event){
      this.fotoSeleccionada = event.target.files[0];
      console.log(this.fotoSeleccionada);
      if(this.fotoSeleccionada.type.indexOf('image') < 0){
        Swal.fire('Error', 'El archivo debe ser del tipo imagen', 'error');
        this.fotoSeleccionada = null;
      } 
    }
  
    subirFoto(id: string){

      if(!this.fotoSeleccionada){
        Swal.fire('warning', 'La mascota fue creada sin imagen', 'warning') ;
      }else {
        console.log('id', id);
        this.mascotaService.subirFoto(this.fotoSeleccionada, id)
        .subscribe(mascota => {
          this.mascota = mascota;
        })
      }
    }

    compararEstado(o1: EstadoMascota, o2: EstadoMascota): boolean {
      if (o1 === undefined && o2 === undefined) {
        return true;
      }
  
      return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
    }
}
