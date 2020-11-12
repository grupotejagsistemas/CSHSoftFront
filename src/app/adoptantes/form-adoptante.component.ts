import { Component, OnInit } from '@angular/core';
import {Adoptante} from './adoptante';
import {AdoptanteService} from './adoptante.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Mascota } from './mascota';
import {EstadoAdoptante} from './estado-adoptante';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Veterinaria } from './veterinaria';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form-adoptante',
  templateUrl: './form-adoptante.component.html',
  styleUrls: ['./form-adoptante.component.css']
})
export class FormAdoptanteComponent implements OnInit {

  adoptante: Adoptante = new Adoptante();
  mascotas: Mascota[];
  estados: EstadoAdoptante[];
  veterinarias: Veterinaria[];
  titulo: string = "Nuevo Adoptante";

  constructor(
    private adoptanteService: AdoptanteService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {

      this.adoptanteService.getMascotas().subscribe((resp: any) => {
        this.mascotas = resp;
  
      });
  
      this.adoptanteService.getVeterinaria().subscribe((resp: any) => {
        this.veterinarias = resp;
  
      });
    }

    get idVeterinaria(){
      return this.adoptanteObj.get('idVeterinaria') as FormArray;
    }
    get nombreNoValido(){
      return this.adoptanteObj.get('nombreCompleto').invalid && this.adoptanteObj.get('nombreCompleto').touched
    }

    get fechaNoValido(){
      return this.adoptanteObj.get('fechaNacimiento').invalid && this.adoptanteObj.get('fechaNacimiento').touched
    }
    get domicilioNoValido(){
      return this.adoptanteObj.get('domicilio').invalid && this.adoptanteObj.get('domicilio').touched
    }
    get barrioNoValido(){
      return this.adoptanteObj.get('barrio').invalid && this.adoptanteObj.get('barrio').touched
    }
    get emailNoValido(){
      return this.adoptanteObj.get('email').invalid && this.adoptanteObj.get('email').touched
    }
    get facebookNoValido(){
      return this.adoptanteObj.get('facebook').invalid && this.adoptanteObj.get('facebook').touched
    }
    get instagramNoValido(){
      return this.adoptanteObj.get('instagram').invalid && this.adoptanteObj.get('instagram').touched
    }
    get sLaboralNoValido(){
      return this.adoptanteObj.get('situacionLaboral').invalid && this.adoptanteObj.get('situacionLaboral').touched
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

  submit(): void{
    
    console.log(this.adoptanteObj);  
    if (this.adoptanteObj.invalid)
    return  Object.values(this.adoptanteObj.controls).forEach(control => {
       control.markAsTouched();
     })
    
    this.adoptanteService.crearAdoptante(this.adoptanteObj.value).subscribe((response: any ) =>{
      this.router.navigate(['/adoptantes'])
      swal.fire({
        icon: 'success',
        title: 'Creación exitosa',
        showConfirmButton: false,
        timer: 1500
      })
    return response;
    }
    );
  }
}