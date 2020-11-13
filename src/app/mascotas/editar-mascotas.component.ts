import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuditoriaService } from '../auditoria/auditoria.service';
import { AuthService } from '../usuarios/auth.service';
import { EstadoMascota } from './estadoMascota';
import { Mascota } from './mascota';
import { MascotaService } from './mascota.service';

@Component({
  selector: 'app-editar-mascotas',
  templateUrl: './editar-mascotas.component.html',
  styleUrls: ['./editar-mascotas.component.css']
})
export class EditarMascotasComponent implements OnInit {

  mascota: Mascota;

  estados: EstadoMascota[];

  private fotoSeleccionada: File;

  constructor(
    private mascotaService: MascotaService,
    private router: Router,
    private route: ActivatedRoute,
    private auditoriaService: AuditoriaService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    
    if(id !== 0){
      this.mascotaService.getMascota(id).subscribe((resp: any) => {
        console.log('mascota', id)
        this.mascota = resp;
      })
    }

    this.mascotaService.getEstados().subscribe((resp: any) => {
      this.estados = resp;
  })
}

  get nombreNoValido(){
    return this.mascotaObj.get('nombre').invalid && this.mascotaObj.get('nombre').touched
  }
  get fechaNacimientoNoValido(){
    return this.mascotaObj.get('fechaNacimiento').invalid && this.mascotaObj.get('fechaNacimiento').touched
  }
  get particularidadesNoValido(){
    return this.mascotaObj.get('particularidadesFisicas').invalid && this.mascotaObj.get('particularidadesFisicas').touched
  }
  get sexoNoValido(){
    return this.mascotaObj.get('sexo').invalid && this.mascotaObj.get('sexo').touched
  }
  get fechaRescateNoValido(){
    return this.mascotaObj.get('fechaRescate').invalid && this.mascotaObj.get('fechaRescate').touched
  }
  get lugarRescateNoValido(){
    return this.mascotaObj.get('lugarRescate').invalid && this.mascotaObj.get('lugarRescate').touched
  }
  get descripcionNoValido(){
    return this.mascotaObj.get('descripcionRescate').invalid && this.mascotaObj.get('descripcionRescate').touched
  }
  get especieNoValido(){
    return this.mascotaObj.get('especie').invalid && this.mascotaObj.get('especie').touched
  }
  get estadoNoValido(){
    return this.mascotaObj.get('estado').invalid && this.mascotaObj.get('estado').touched
  }
  

  mascotaObj = this.formBuilder.group({
    nombre : ["",Validators.required],
    fechaNacimiento : ["",Validators.required],
    particularidadesFisicas : ["",Validators.required],
    sexo: [null,Validators.required],
    fotoMascota: "",
    fechaRescate: ["",Validators.required],
    lugarRescate: ["",Validators.required],
    descripcionRescate: ["",Validators.required],
    especie: ["",Validators.required],
    idEstado: [null],
    estado: [null,Validators.required]
  });

  auditoriaModificarObj = {
    usuario: this.authService.usuario.username,
    accion: 'Modificación de mascotas'
  }

  auditoriaModificar(){
    this.auditoriaService.crearAuditoria(this.auditoriaModificarObj).subscribe(response => {
      return response;
    })
  }

  public submit(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    console.log('ID', id);
    console.log('mascota', this.mascotaObj);
     this.mascotaService.modificarMascota(this.mascotaObj.value, id)
     .subscribe(
       response => {
         this.router.navigate(['/mascotas'])
         Swal.fire({
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
