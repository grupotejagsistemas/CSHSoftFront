import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { TipoMovimiento } from '../movimientos-recursos/tipoMovimiento';
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
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.movimientoMonetarioService.getTipoMovimiento()
    .subscribe((resp: any) => {
      this.tiposMovimientos = resp;
    })
  }

  movMonObj = {
  monto: null,
  idTipoMovimiento: null, 
  medio: "",
  autor: "",
  fecha: null 
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

        return response;
      
      })
    }
}
