import { Component, OnInit } from '@angular/core';
import {Adoptante} from './adoptante';
import {AdoptanteService} from './adoptante.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Mascota } from './mascota';
import {EstadoAdoptante} from './estado-adoptante';
import { FormArray,Validators, FormBuilder } from '@angular/forms';
import { Veterinaria } from './veterinaria';
import swal from 'sweetalert2';


@Component({
  selector: 'app-editar-adoptante',
  templateUrl: './editar-adoptante.component.html',
  styleUrls: ['./editar-adoptante.component.css']
})
export class EditarAdoptanteComponent implements OnInit {

  adoptante: Adoptante;
  mascotas: Mascota[];
  estados: EstadoAdoptante[];
  veterinarias: Veterinaria[];
  titulo: string = "Modificar Adoptante";

  constructor(
    private adoptanteService: AdoptanteService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  get idVeterinaria(){
    return this.adoptanteObj.get('idVeterinaria') as FormArray;
  }

 

  ngOnInit(): void {

    const id = +this.route.snapshot.paramMap.get('id');

    this.adoptanteService.getAdoptante(id).subscribe((data: any) => {

      this.adoptante = data;
      console.log('data', data);
    })


    this.adoptanteService.getMascotas().subscribe((resp: any) => {
      this.mascotas = resp;
      this.mascotas.unshift({
        nombre: 'Seleccione una mascota',
        idMascota: null
      })
    });
    
    this.adoptanteService.getVeterinaria().subscribe((resp: any) => {
      this.veterinarias = resp;
      this.veterinarias.unshift({
        razonSocial: 'Seleccione una veterinaria',
        id: null
      })

    });
  }
  get nombreNoValido(){
    return this.adoptanteObj.get('nombreCompleto').invalid && this.adoptanteObj.get('nombreCompleto').touched
  }

  get fechaNoValido(){
    return this.adoptanteObj.get('fecha').invalid && this.adoptanteObj.get('fecha').touched
  
  }
  get domicilioNoValido(){
    return this.adoptanteObj.get('domicilio').invalid && this.adoptanteObj.get('domicilio').touched
  
  }
  get barrioNoValido(){
    return this.adoptanteObj.get('barrioCompleto').invalid && this.adoptanteObj.get('barrioCompleto').touched
  
  }
  get emailNoValido(){
    return this.adoptanteObj.get('emailCompleto').invalid && this.adoptanteObj.get('emailCompleto').touched
  
  }
  get facebookNoValido(){
    return this.adoptanteObj.get('facebookCompleto').invalid && this.adoptanteObj.get('facebookCompleto').touched
  
  }
  get instagramNoValido(){
    return this.adoptanteObj.get('instagramCompleto').invalid && this.adoptanteObj.get('instagramCompleto').touched
  
  }
  get sLaboralNoValido(){
    return this.adoptanteObj.get('sLaboralCompleto').invalid && this.adoptanteObj.get('sLaboralCompleto').touched
  
  }

  adoptanteObj = this.formBuilder.group({
    idMascota: [null],
    numeroFormulario: [null], 
    nombreCompleto: ["",Validators.required],
    fechaNacimiento: ["",Validators.required],
    domicilio: ["",Validators.required],
    barrio: ["",Validators.required],
    celular: [""],
    email: ["",Validators.required],
    facebook: ["",Validators.required],
    instagram: ["",Validators.required],
    situacionLaboral: ["",Validators.required],
    idVeterinaria: this.formBuilder.array([]),
    observaciones: [""],
    idEstadoAdoptante: [null]

}) 

  agregarVeterinaria() {
    const veterinariaFormGroup = this.formBuilder.group({ 
      id: ''
  });
    this.idVeterinaria.push(veterinariaFormGroup)
  }

  eliminarVeterinaria(indice: number) {
    this.idVeterinaria.removeAt(indice)
  }

  submit(){
    const id = +this.route.snapshot.paramMap.get('id');

    console.log(this.adoptanteObj);  
     if (this.adoptanteObj.invalid)
     return  Object.values(this.adoptanteObj.controls).forEach(control => {
        control.markAsTouched();
      })

    this.adoptanteService.modificarAdoptante(this.adoptanteObj.value, id).subscribe((response: any ) => {
      this.router.navigate(['/adoptantes'])
      swal.fire({
        icon: 'success',
        title: 'El voluntario ha sido modificado',
        showConfirmButton: false,
        timer: 1500
      })
      return response;
    
    });
  
  }

}
