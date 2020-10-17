import { Component, OnInit } from '@angular/core';
import { MovimientoMonetario } from './movimiento-monetario';
import { MovimientoMonetarioService } from './movimiento-monetario.service';

@Component({
  selector: 'app-movimientos-monetarios',
  templateUrl: './movimientos-monetarios.component.html',
  styleUrls: ['./movimientos-monetarios.component.css']
})

export class MovimientosMonetariosComponent implements OnInit {

  movimientosMonetarios: MovimientoMonetario[];
  
  constructor(private movimientoMonetarioService: MovimientoMonetarioService) { }



  ngOnInit(): void {
  
    this.movimientoMonetarioService.getMovMonetarios().subscribe((data: any) => {
      this.movimientosMonetarios = data;
    })
  
  }

}
