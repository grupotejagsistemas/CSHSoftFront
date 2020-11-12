import { Component, OnInit } from '@angular/core';
import { Voluntario } from './voluntario';
import { Veterinaria} from './veterinaria';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { VoluntarioService } from './voluntario.service';
import {ActivatedRoute, GuardsCheckStart, Router} from '@angular/router';
import swal from 'sweetalert2'
import { AuthService } from '../usuarios/auth.service';
import { AuditoriaService } from '../auditoria/auditoria.service';


@Component({
  selector: 'app-form-crear',
  templateUrl: './form-crear.component.html',
  styleUrls:['./form-crear.component.css']
})
export class FormCrearComponent implements OnInit {

  

  checkedTransito: boolean;
  checkedPresencial: boolean; 
  checkedTraslado: boolean; 
  voluntario:  Voluntario;
  veterinarias: Veterinaria[] ;
  veterinariasCercanas: any [];

  constructor(
    private voluntarioService: VoluntarioService, 
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,    
    private auditoriaService: AuditoriaService,
    private authService: AuthService

    ) { }

    get idveterinarias(){
      return this.voluntarioObj.get('idveterinarias') as FormArray;
    }

  ngOnInit(): void {   

      this.voluntarioService.getVeterinarias().subscribe((resp: any) => {
        this.veterinarias = resp;
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
      transito: [false],
      traslado: [false],
      presencial: [false]
    }) 

    agregarVeterinaria() {
      const veterinariaFormGroup = this.formBuilder.group({ 
        id: ''
    });
      this.idveterinarias.push(veterinariaFormGroup)
    }
  
    eliminarVeterinaria(indice: number) {
      this.idveterinarias.removeAt(indice)
    }
  

    auditoriaAgregarObj = {
      usuario: this.authService.usuario.username,
      accion: `Alta de voluntario`
    }
    
    auditoriaAgregar() {
      this.auditoriaService.crearAuditoria(this.auditoriaAgregarObj).subscribe(response => {
        return response;
      })
    }
    

  
  submit(): void{

    console.log(this.voluntarioObj);  
     if (this.voluntarioObj.invalid)
     return  Object.values(this.voluntarioObj.controls).forEach(control => {
        control.markAsTouched();
      })
    
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

    this.voluntarioService.crearVoluntario(this.voluntarioObj.value)
    .subscribe(
      response => {
        this.router.navigate(['/voluntarios'])
        swal.fire({
          icon: 'success',
          title: 'Creación exitosa',
          showConfirmButton: false,
          timer: 1500
        })
        console.log('AGREGAR', response);
        this.auditoriaAgregar();
        return response;
      })
  }

}
