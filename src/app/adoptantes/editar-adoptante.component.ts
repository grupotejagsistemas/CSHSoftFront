import { Component, OnInit } from '@angular/core';
import {Adoptante} from './adoptante';
import {AdoptanteService} from './adoptante.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Mascota } from './mascota';
import {EstadoAdoptante} from './estado-adoptante';
import { FormArray, FormBuilder } from '@angular/forms';
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

  adoptanteObj = this.formBuilder.group({
    idMascota: [null],
    numeroFormulario: [null], 
    nombreCompleto: [""],
    fechaNacimiento: [""],
    domicilio: [""],
    barrio: [""],
    celular: [""],
    email: [""],
    facebook: [""],
    instagram: [""],
    situacionLaboral: [""],
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
