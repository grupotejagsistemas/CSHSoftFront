import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { AuditoriaService } from '../auditoria/auditoria.service';
import { TipoMovimiento } from '../movimientos-recursos/tipoMovimiento';
import { AuthService } from '../usuarios/auth.service';
import { MovimientoMonetario } from './movimiento-monetario';
import { MovimientoMonetarioService } from './movimiento-monetario.service';

@Component({
  selector: 'app-form-mov-monetario',
  templateUrl: './form-mov-monetario.component.html',
  styleUrls: ['./form-mov-monetario.component.css']
})
export class FormMovMonetarioComponent implements OnInit {

  tiposMovimientos: TipoMovimiento[];

  titulo: string = "Nuevo Movimiento Monetario"

  movimientoMonetario: MovimientoMonetario = new MovimientoMonetario();


  constructor(
    private movimientoMonetarioService: MovimientoMonetarioService,
    private router: Router,
    private route: ActivatedRoute,
    private auditoriaService: AuditoriaService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.movimientoMonetarioService.getTipoMovimiento()
    .subscribe((resp: any) => {
      this.tiposMovimientos = resp;
      this.tiposMovimientos.unshift({
        descripcion: 'Seleccione un tipo de movimiento',
        id: null
      })
    })
  }

  movMonObj = {
  monto: null,
  idTipoMovimiento: null, 
  medio: "",
  autor: "",
  fecha: null 
  }

  auditoriaAgregarObj = {
    usuario: this.authService.usuario.username,
    accion: `Alta de movimiento monetario`
  }
  

  
  auditoriaAgregar() {
    this.auditoriaService.crearAuditoria(this.auditoriaAgregarObj).subscribe(response => {
      return response;
    })
  }
  


  public agregar(): void {
    this.movimientoMonetarioService.crearMovMonetarios(this.movMonObj)
    .subscribe(
      response => {
        this.router.navigate(['/movimientos-monetarios'])
        Swal.fire({
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
