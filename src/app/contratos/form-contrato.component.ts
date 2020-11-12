import { Component, OnInit } from '@angular/core';
import { Contrato } from './contrato';
import { ContratoService } from './contrato.service';
import {ActivatedRoute,Router} from '@angular/router';
import swal from 'sweetalert2'
import { Mascota } from './mascota';
import { Adoptante } from './adoptante';
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
    private auditoriaService: AuditoriaService,
    private authService: AuthService
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

  contratoObj = {
    idMascota: null, 
    idAdoptante: null, 
    nuevoNombre: ""
  }


  auditoriaAgregarObj = {
    usuario: this.authService.usuario.username,
    accion: `Alta de contrato`
  }
  

  
  auditoriaAgregar() {
    this.auditoriaService.crearAuditoria(this.auditoriaAgregarObj).subscribe(response => {
      return response;
    })
  }
  
  

  public agregar(): void {
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
      this.auditoriaAgregar();
      return response;
    })

}

}