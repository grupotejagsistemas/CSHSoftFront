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

  constructor(private contratoService: ContratoService) {

  }

  ngOnInit(): void {
    
    this.contratoService.getContratos().subscribe((data: any) => {
      this.contratos = data;
    })
  }


  borrarContrato(id: number, i: number): void {
    swal.fire({
      title: '',
      text: `¿Desea eliminar el contrato ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'Cancelar',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.value) {
        this.contratos.splice(i, 1)
          this.contratoService.borrarContrato(id).subscribe()
      }
    })
}

}