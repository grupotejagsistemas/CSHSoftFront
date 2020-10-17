import { Component, OnInit } from '@angular/core';
import { Contrato } from './contrato';
import { ContratoService }from './contrato.service';
import swal from 'sweetalert2';
import { runInThisContext } from 'vm';


@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
})
export class ContratosComponent implements OnInit {


  contratos : Contrato[];
  busquedaMascota: string;

  constructor(private contratoService: ContratoService) {

  }

  ngOnInit(): void {
    
    this.contratoService.getContratos().subscribe((data: any) => {
      this.contratos = data;
    })
  }

  filtroMascota(mascota: string): void {
    this.contratoService.getContratosMascota(mascota).subscribe((data: any) => {
      this.contratos = data;
    })
  }
}