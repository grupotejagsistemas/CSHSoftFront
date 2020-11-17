import { Component, OnInit } from '@angular/core';
import { Mascota } from './mascota';
import {EstadoMascota } from './estadoMascota';
import { MascotaService } from './mascota.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { AuditoriaService } from '../auditoria/auditoria.service';
import { AuthService } from '../usuarios/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-form-mascotas',
  templateUrl: './form-mascotas.component.html',
  styleUrls: ['./form-mascotas.component.css']
})
export class FormMascotasComponent implements OnInit {


  imgSrc : string = '/assets/img/Subir-Imagen.png';
  selectedImage: any = null;
  mascota: Mascota;

  estados: EstadoMascota[];
  private fotoSeleccionada: File;


  constructor(
    private mascotaService: MascotaService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private auditoriaService: AuditoriaService,
    private authService: AuthService,
    private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
    
    this.mascotaService.getEstados().subscribe((resp: any) => {
      this.estados = resp;
      this.estados.unshift({
        descripcion: 'Seleccione estado',
        id: this.mascotaObj.value.estado.id
      })
  })
}

showPrewiew(event:any){
  if(event.target.files && event.target.files[0]){

    const reader = new FileReader();
    reader.onload = (e:any) => this.imgSrc = e.target.result;
    reader.readAsDataURL(event.target.files[0]);
    this.selectedImage = event.target.files[0];

  }
  else{
    this.imgSrc = '/assets/img/patitas.jpeg';
    this.selectedImage = null;
  }
}

get getFotoMascota(){
  return this.mascotaObj.get('fotoMascota')
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

mascotaObj = this.formBuilder.group( {
  id: [null],
  nombre : ["",Validators.required],
  fechaNacimiento : ["",Validators.required],
  particularidadesFisicas : ["",Validators.required],
  sexo: [null,Validators.required],
  fotoMascota: [""],
  fechaRescate: ["",Validators.required],
  lugarRescate: ["",Validators.required],
  descripcionRescate: ["",Validators.required],
  especie: ["",Validators.required],
  idEstado: [null],
  estado: [null,Validators.required]
});



auditoriaAgregarObj = {
  usuario: this.authService.usuario.username,
  accion: `Alta de mascotas`
}


auditoriaAgregar() {
  this.auditoriaService.crearAuditoria(this.auditoriaAgregarObj).subscribe(response => {
    return response;
  })
}

onSubmit(formValue: any){
  if(this.mascotaObj.valid){
    console.log("fromValue.especi líne 129 ", formValue.especie);
    var filePath = `${formValue.especie}/${this.selectedImage.name}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
      finalize(()=>{
        fileRef.getDownloadURL().subscribe((url)=>{
          formValue.fotoMascota=url;
          this.imgSrc = '/assets/img/Subir-Imagen.png';
          this.selectedImage = null;
        })
      })
    ).subscribe();
  }
}

submit(): void{
  const id = +this.route.snapshot.paramMap.get('id');

  console.log(this.mascotaObj);  
   if (this.mascotaObj.invalid)
   return  Object.values(this.mascotaObj.controls).forEach(control => {
      control.markAsTouched();
    })
  
  
    this.mascotaService.crearMascota(this.mascotaObj.value)
    .subscribe((response: any) => {
        this.router.navigate(['/mascotas'])
        swal.fire({
          icon: 'success',
          title: 'Creación exitosa',
          showConfirmButton: false,
          timer: 1500
        })
        this.mascota = response;
        this.onSubmit(this.mascotaObj.value);
        this.auditoriaAgregar();
        return response; 
      })

    }
    // seleccionarFoto(event){
    //   this.fotoSeleccionada = event.target.files[0];
    //   console.log(this.fotoSeleccionada);
    //   if(this.fotoSeleccionada.type.indexOf('image') < 0){
    //     Swal.fire('Error', 'El archivo debe ser del tipo imagen', 'error');
    //     this.fotoSeleccionada = null;
    //   } 
    // }
  
    // subirFoto(id: string){

    //   if(!this.fotoSeleccionada){
    //     Swal.fire('warning', 'La mascota fue creada sin imagen', 'warning') ;
    //   }else {
    //     console.log('id', id);
    //     this.mascotaService.subirFoto(this.fotoSeleccionada, id)
    //     .subscribe(mascota => {
    //       this.mascota = mascota;
    //     })
    //   }
    // }

  }
