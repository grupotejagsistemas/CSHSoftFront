import { Component, OnInit } from '@angular/core';
import { Contrato } from './contrato';
import { ContratoService } from './contrato.service';
import {ActivatedRoute,Router} from '@angular/router';
import swal from 'sweetalert2'
import { Mascota } from './mascota';
import { Adoptante } from './adoptante';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../usuarios/auth.service';
import { AuditoriaService } from '../auditoria/auditoria.service';

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
    private formBuilder: FormBuilder,
    private auditoriaService: AuditoriaService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    this.contrato = Contrato.build();

      this.contratoService.getAdoptantes()
        .subscribe((resp: any) => {
          this.adoptantes = resp;

        })

    this.contratoService.getMascotas()
      .subscribe((resp: any) => {
        this.mascotas = resp;

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


  auditoriaAgregarObj = {
    usuario: this.authService.usuario.username,
    accion: `Alta de contrato`
  }
  

  
  auditoriaAgregar() {
    this.auditoriaService.crearAuditoria(this.auditoriaAgregarObj).subscribe(response => {
      return response;
    })
  }
  
  

  public submit(): void {

    if (this.contratoObj.invalid)
     return  Object.values(this.contratoObj.controls).forEach(control => {
        control.markAsTouched();
      })
    this.contratoService.crearContrato(this.contratoObj.value)
  .subscribe(
    response => {
      this.router.navigate(['/contratos'])
      swal.fire({
        icon: 'success',
        title: 'Creación exitosa',
        showConfirmButton: false,
        timer: 1500
      })
      this.auditoriaAgregar();
      return response;
    })

}

}