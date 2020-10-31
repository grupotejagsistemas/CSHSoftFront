import { Component, OnInit } from '@angular/core';
import {Adoptante} from './adoptante';
import {AdoptanteService} from './adoptante.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Mascota } from './mascota';
import {EstadoAdoptante} from './estado-adoptante';
import { FormArray, FormBuilder } from '@angular/forms';
import { Veterinaria } from './veterinaria';

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
  p: number = 1;


  

  constructor(
    private adoptanteService: AdoptanteService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
    ) { }

    get idVeterinaria(){
      return this.adoptanteObj.get('idVeterinaria') as FormArray;
    }


    adoptanteObj = this.formBuilder.group({
      id: [null], 
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

  ngOnInit(): void {

    this.adoptanteService.getMascotas().subscribe((resp: any) => {
      this.mascotas = resp;
      this.mascotas.unshift({
        nombre: 'Seleccione una mascota',
        idMascota: null
      })
    });
    
    this.adoptanteService.getEstadosAdoptante().subscribe((resp: any) => {
      this.estados = resp;
      this.estados.unshift({
        descripcion: 'Seleccione estado',
        id: null
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
    this.adoptanteService.crearAdoptante(this.adoptanteObj.value).subscribe((response: any ) => response);
  }





}