import { Component, OnInit } from '@angular/core';
import { Contrato } from './contrato';
import { ContratoService } from './contrato.service';
import {Router} from '@angular/router';
import swal from 'sweetalert2'

@Component({
  selector: 'app-form-contrato',
  templateUrl: './form-contrato.component.html',
  styleUrls: ['./form-contrato.component.css']
})
export class FormContratoComponent implements OnInit {

  contrato: Contrato = new Contrato()
  titulo: string = 'Nuevo Contrato'

  constructor(
    private contratoService: ContratoService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

 /* public create(): void {
    this.contratoService.create(this.contrato).subscribe(
      response => {
        this.router.navigate(['/contratos'])
      }
    )
    console.log('se guarda los datos: ')
    console.log(this.contrato)
  }*/
}