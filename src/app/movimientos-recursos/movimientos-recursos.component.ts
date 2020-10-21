import { Component, OnInit } from '@angular/core';
import { MovimientoRecurso } from './movimiento-recurso';
import { MovimientoRecursoService } from './movimiento-recurso.service';

@Component({
  selector: 'app-movimientos-recursos',
  templateUrl: './movimientos-recursos.component.html',
  styleUrls: ['./movimientos-recursos.component.css']
})
export class MovimientosRecursosComponent implements OnInit {

  movimientosRecursos: MovimientoRecurso[];
  p: number = 1;


  constructor(private movimientoRecursoService: MovimientoRecursoService) { }

  ngOnInit(): void {

    this.movimientoRecursoService.getMovRecursos().subscribe((data: any) => {
      this.movimientosRecursos = data;
    })
  }

}
