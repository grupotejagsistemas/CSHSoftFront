import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Veterinaria } from './veterinaria';
import { Voluntario } from './voluntario';
import { VoluntarioService } from './voluntario.service';
import swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';
import { AuditoriaService } from '../auditoria/auditoria.service';

@Component({
  selector: 'app-editar-voluntarios',
  templateUrl: './editar-voluntarios.component.html',
  styleUrls: ['./editar-voluntarios.component.css']
})
export class EditarVoluntariosComponent implements OnInit {
  checkedTransito: boolean;
  checkedPresencial: boolean; 
  checkedTraslado: boolean; 
  voluntario:  Voluntario;
  veterinarias: Veterinaria[] ;
  veterinariasArray:  any [] = [];

  constructor(
    private voluntarioService: VoluntarioService, 
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private auditoriaService: AuditoriaService
  ) { }

  get idveterinarias(){
    return this.voluntarioObj.get('idveterinarias') as FormArray;
  }


  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    this.voluntarioService.getVoluntario(id).subscribe((data: any) => {
      this.voluntario = data;
      this.idveterinariasArray();

      if(this.voluntario.presencial === "SI"){
          this.checkedPresencial = true;
        } else {
          this.checkedPresencial = false;
        }
  
        if(this.voluntario.transito ==="SI"){
          this.checkedTransito = true;
        } else {
          this.checkedTransito = false;
        }
  
        if(this.voluntario.traslado === "SI"){
          this.checkedTraslado = true;
        } else {
          this.checkedTraslado = false;
        }
      }) 
    this.voluntarioService.getVeterinarias().subscribe((resp: any) => {
      this.veterinarias = resp;
      this.veterinarias.unshift({
        razonSocial: 'Seleccione una veterinaria',
        id: null
      })
  })
}
get nombreNoValido(){
  return this.voluntarioObj.get('nombreCompleto').invalid && this.voluntarioObj.get('nombreCompleto').touched

}
get direccionNoValido(){
  return this.voluntarioObj.get('direccion').invalid && this.voluntarioObj.get('direccion').touched

}
get localidadNoValido(){
  return this.voluntarioObj.get('localidad').invalid && this.voluntarioObj.get('localidad').touched

}
  
voluntarioObj = this.formBuilder.group({
  id: [null],
  nombreCompleto: ["",Validators.required], 
  telefono: [null],
  direccion: ["",Validators.required],
  idveterinarias: this.formBuilder.array([]),
  localidad: ["",Validators.required],
  transito: "",
  traslado: "",
  presencial: ""
}) 

  idveterinariasArray() {
    this.veterinariasArray = this.voluntario.idveterinarias.map(vete => {
      return vete.razonSocial;
    })

    return this.veterinariasArray;
  }
  

  agregarVeterinaria() {
    const veterinariaFormGroup = this.formBuilder.group({ 
      id: ''
  });
    this.idveterinarias.push(veterinariaFormGroup)
  }

  eliminarVeterinaria(indice: number) {
    this.idveterinarias.removeAt(indice)
  }

  auditoriaModificarObj = {
    usuario: this.authService.usuario.username,
    accion: 'Modificación de voluntario'
  }
  
  
  auditoriaModificar(){
    this.auditoriaService.crearAuditoria(this.auditoriaModificarObj).subscribe(response => {
      return response;
    })
  }


  submit(): void{
    
     if (this.voluntarioObj.invalid)
     return  Object.values(this.voluntarioObj.controls).forEach(control => {
        control.markAsTouched();
      })

    const id = +this.route.snapshot.paramMap.get('id');

    if(this.checkedPresencial === true){
      this.voluntarioObj.value.presencial = "SI";
    } else {
      this.voluntarioObj.value.presencial = "NO";
    }

    if(this.checkedTransito === true){
      this.voluntarioObj.value.transito = "SI";
    } else {
      this.voluntarioObj.value.transito = "NO";
    }

    if(this.checkedTraslado === true) {
      this.voluntarioObj.value.traslado = "SI";
    }else {
      this.voluntarioObj.value.traslado = "NO";
    }


    this.voluntarioService.modificarVoluntario(this.voluntarioObj.value, id)
    .subscribe(
      response => {
        this.router.navigate(['/voluntarios'])
        swal.fire({
          icon: 'success',
          title: 'El voluntario ha sido modificado',
          showConfirmButton: false,
          timer: 1500
        })
        this.auditoriaModificar();
        return response;
      })
  }

}
 

