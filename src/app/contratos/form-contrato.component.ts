import { Component, OnInit } from '@angular/core';
import { Contrato } from './contrato';
import { ContratoService } from './contrato.service';
import {ActivatedRoute,Router} from '@angular/router';
import swal from 'sweetalert2'
import { Mascota } from '../adoptantes/mascota';
import { Adoptante } from '../adoptantes/adoptante';

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
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    this.contrato = Contrato.build();
    if(id !== 0) {
      this.contratoService.getAdoptantes()
        .subscribe((resp: any) => {
          this.adoptantes = resp;
        })
    }

    this.contratoService.getMascotas()
      .subscribe((resp: any) => {
        this.mascotas = resp;
      })
  }

  contratoObj = {
    idMascota: 1, 
    idAdoptante: 2, 
    nuevoNombre: ""
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