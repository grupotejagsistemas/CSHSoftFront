import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { AuditoriaService } from '../auditoria/auditoria.service';
import { AuthService } from '../usuarios/auth.service';
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
    private route: ActivatedRoute,
    private auditoriaService: AuditoriaService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.movimientoRecurso = MovimientoRecurso.build();

    this.movimientoRecursoService.getTipoMovimiento()
    .subscribe((resp: any) => {
      this.tiposMovimientos = resp;
      this.tiposMovimientos.unshift({
        descripcion: 'Seleccione un tipo de movimiento',
        id: null
      })
    })
  }

  movRecObj = {
    donante: "",
    fecha: null, 
    idTipoMovimiento: null, 
    descripcion: "",
    cantidad: ""
  }

  auditoriaAgregarObj = {
    usuario: this.authService.usuario.username,
    accion: `Alta de movimiento de recurso`
  }
  

  auditoriaAgregar() {
    this.auditoriaService.crearAuditoria(this.auditoriaAgregarObj).subscribe(response => {
      return response;
    })
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
        this.auditoriaAgregar();
        return response;
      
      }
    )
  }
}
