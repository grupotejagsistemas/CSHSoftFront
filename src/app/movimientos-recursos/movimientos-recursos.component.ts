import { Component, OnInit } from '@angular/core';
import { AuditoriaService } from '../auditoria/auditoria.service';
import { AuthService } from '../usuarios/auth.service';
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


  constructor(
    private movimientoRecursoService: MovimientoRecursoService,
    private auditoriaService: AuditoriaService,
    private authService: AuthService
    ) { }

  ngOnInit(): void {

    this.movimientoRecursoService.getMovRecursos().subscribe((data: any) => {
      this.movimientosRecursos = data;
    })
  }

}
