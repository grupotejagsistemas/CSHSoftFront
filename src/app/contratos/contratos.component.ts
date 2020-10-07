import { Component, OnInit } from '@angular/core';
import { Contrato } from './contrato';
import { ContratoService }from './contrato.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
})
export class ContratosComponent implements OnInit {


  contratos : Contrato[];

  constructor(private contratoService: ContratoService) {

  }

  ngOnInit(): void {
    this.contratoService.getContratos().subscribe(
      contratos => this.contratos = contratos
    );
  }
/*
  delete(contrato: Contrato): void {
    swal.fire({
      title: '',
      text: `¿Desea eliminar el contrato ${contrato.id}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'Cancelar',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.value) {

        console.log('se elimino: ', contrato)
        this.contratoService.delete(contrato.id).subscribe(
          response => {
            this.contratos = this.contratos.filter(vet => vet !== contrato)
            swal.fire(
              'Eliminado!',
              '',
              'success',
              )
            }
        )
      }
    })
  }*/

}