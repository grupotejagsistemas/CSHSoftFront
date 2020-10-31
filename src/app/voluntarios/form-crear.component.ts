import { Component, OnInit } from '@angular/core';
import { Voluntario } from './voluntario';
import { Veterinaria} from './veterinaria';
import { FormArray, FormBuilder } from '@angular/forms';
import { VoluntarioService } from './voluntario.service';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2'


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
    private formBuilder: FormBuilder
    ) { }

    get idveterinarias(){
      return this.voluntarioObj.get('idveterinarias') as FormArray;
    }

  ngOnInit(): void {   

      this.voluntarioService.getVeterinarias().subscribe((resp: any) => {
        this.veterinarias = resp;
      })
  }

  voluntarioObj = this.formBuilder.group({
      id: [null],
      nombreCompleto: [""], 
      telefono: [null],
      direccion: [""],
      idveterinarias: this.formBuilder.array([]),
      localidad: [""],
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
  

  submit(): void{
    
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
        return response;
      })
  }

}
