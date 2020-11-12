import { Component, OnInit } from '@angular/core';
import { Contrato } from './contrato';
import { ContratoService } from './contrato.service';
import {ActivatedRoute,Router} from '@angular/router';
import swal from 'sweetalert2'
import { Mascota } from './mascota';
import { Adoptante } from './adoptante';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-contrato',
  templateUrl: './form-contrato.component.html',
  styleUrls: ['./form-contrato.component.css']
})
export class FormContratoComponent implements OnInit {

  mascotas: Mascota[];
  adoptantes: Adoptante[];
  contrato: Contrato = new Contrato()
  

  titulo: string = 'Nuevo Contrato'

  constructor(
    private contratoService: ContratoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    this.contrato = Contrato.build();

      this.contratoService.getAdoptantes()
        .subscribe((resp: any) => {
          this.adoptantes = resp;
          this.adoptantes.unshift({
            nombreCompleto: 'Seleccione un adoptante',
            id: null
          })
        })

    this.contratoService.getMascotas()
      .subscribe((resp: any) => {
        this.mascotas = resp;
        this.mascotas.unshift({
          nombre: 'Seleccione una mascota',
          id: null
        })
      })
  }
  get idMascotaNoValido(){
    return this.contratoObj.get('idMascota').invalid && this.contratoObj.get('idMascota').touched
  }
  get idAdoptanteNoValido(){
    return this.contratoObj.get('idAdoptante').invalid && this.contratoObj.get('idAdoptante').touched
  }
  get nombreNoValido(){
    return this.contratoObj.get('nuevoNombre').invalid && this.contratoObj.get('nuevoNombre').touched
  }

  contratoObj = this.formBuilder.group({
    idMascota: [null,Validators.required],
    idAdoptante: [null,Validators.required],
    nuevoNombre: ["",Validators.required]
  })

  submit(): void{
    const id = +this.route.snapshot.paramMap.get('id');

    console.log(this.contratoObj);  
     if (this.contratoObj.invalid)
     return  Object.values(this.contratoObj.controls).forEach(control => {
        control.markAsTouched();
      })
    }

  public agregar(): void {
    console.log('vol', this.contratoObj)
    this.contratoService.crearContrato(this.contratoObj)
  .subscribe(
    response => {
      this.router.navigate(['/contratos'])
      swal.fire({
        icon: 'success',
        title: 'Creación exitosa',
        showConfirmButton: false,
        timer: 1500
      })
      return response;
    })

}

}