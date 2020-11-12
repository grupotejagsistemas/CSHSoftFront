import { Component, OnInit } from '@angular/core';
import { Mascota } from './mascota';
import {EstadoMascota } from './estadoMascota';
import { MascotaService } from './mascota.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2'
import Swal from 'sweetalert2';
import { AuditoriaService } from '../auditoria/auditoria.service';
import { AuthService } from '../usuarios/auth.service';
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
    private route: ActivatedRoute,
    private auditoriaService: AuditoriaService,
    private authService: AuthService
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
  id: 0,
  nombre : "",
  fechaNacimiento : new Date(),
  particularidadesFisicas : "",
  sexo: null,
  fotoMascota: "",
  fechaRescate: new Date(),
  lugarRescate: "",
  descripcionRescate: "",
  especie: "",
  idEstado: "",
  estado: null
};

auditoriaAgregarObj = {
  usuario: this.authService.usuario.username,
  accion: `Alta de mascotas`
}

auditoriaModificarObj = {
  usuario: this.authService.usuario.username,
  accion: 'Modificación de mascotas'
}

auditoriaAgregar() {
  this.auditoriaService.crearAuditoria(this.auditoriaAgregarObj).subscribe(response => {
    return response;
  })
}

auditoriaModificar(){
  this.auditoriaService.crearAuditoria(this.auditoriaModificarObj).subscribe(response => {
    return response;
  })
}


  public agregar(): void {
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
        this.subirFoto(response.id.toString());
        this.auditoriaAgregar();
        return response; 
      })
    }

  public modificar(): void{
     const id = +this.route.snapshot.paramMap.get('id');

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
          this.auditoriaModificar();
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

}
