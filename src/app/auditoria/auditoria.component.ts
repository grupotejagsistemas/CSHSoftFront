import { Component, OnInit } from '@angular/core';
import { Auditoria } from './auditoria';
import { AuditoriaService } from './auditoria.service';

@Component({
  selector: 'app-auditoria',
  templateUrl: './auditoria.component.html',
  styleUrls: ['./auditoria.component.css']
})
export class AuditoriaComponent implements OnInit {

  auditoria: Auditoria[];
  busquedaUsuario: string;
  p:number = 1;
  
  constructor(private auditoriaService: AuditoriaService) { }

  ngOnInit(): void {

    this.auditoriaService.getAuditorias().subscribe((data: any) => {
      this.auditoria = data;
    })
  }


  filtroUsuario(usuario: string): void {
    this.auditoriaService.getAuditoriaUsuario(usuario).subscribe((data: any) => {
      this.auditoria = data; 
    })
  }
}
