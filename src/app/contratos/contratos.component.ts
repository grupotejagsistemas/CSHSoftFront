import { Component, OnInit } from '@angular/core';
import { Contrato } from './contrato';
import { ContratoService }from './contrato.service';
import swal from 'sweetalert2';
import { timeout } from 'rxjs/operators';


@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
})
export class ContratosComponent implements OnInit {


  contratos : Contrato[];
  busquedaMascota: string;
  p: number = 1;

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

  exportProductsPdf(id: number, nombre:string){
    this.contratoService.exportPdfProducts(id).subscribe(x => {
      const blob = new Blob([x], {type: 'application/pdf'});
      
      if(window.navigator && window.navigator.msSaveOrOpenBlob){
        window.navigator.msSaveOrOpenBlob(blob);
        return;
      }
      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data;
      link.download = nombre + " " + 'contrato.pdf';
      link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));

      setTimeout(function() {
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100)
    });

  }
}