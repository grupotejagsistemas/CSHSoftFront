import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { MovimientoRecurso } from './movimiento-recurso';
import { MovimientoRecursoService } from './movimiento-recurso.service';
import { TipoMovimiento } from './tipoMovimiento';

@Component({
  selector: 'app-form-mov-recurso',
  templateUrl: './form-mov-recurso.component.html',
  styleUrls: ['./form-mov-recurso.component.css']
})
export class FormMovRecursoComponent implements OnInit {

  tiposMovimientos: TipoMovimiento[];

  titulo: string = "Nuevo Movimiento de Recursos"

  movimientoRecurso: MovimientoRecurso = new MovimientoRecurso()

  constructor(
    private movimientoRecursoService: MovimientoRecursoService,
    private router:  Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.movimientoRecurso = MovimientoRecurso.build();

    this.movimientoRecursoService.getTipoMovimiento()
    .subscribe((resp: any) => {
      this.tiposMovimientos = resp;
    })
  }

  movRecObj = {
    donante: "",
    fecha: null, 
    idTipoMovimiento: null, 
    descripcion: "",
    cantidad: ""
  }

  public agregar(): void {
    this.movimientoRecursoService.crearMovRecursos(this.movRecObj)
    .subscribe(
      response => {
        this.router.navigate(['/movimientos-recursos'])
        swal.fire({
          icon: 'success',
          title: 'Creación exitosa',
          showConfirmButton: false, 
          timer: 1500
        })

        return response;
      
      }
    )
  }
}
