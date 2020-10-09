import { Component, OnInit } from '@angular/core';
import { Contrato } from './contrato';
import { ContratoService } from './contrato.service';
import {ActivatedRoute,Router} from '@angular/router';
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
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.contrato = Contrato.build();
  this.contratoService.getContrato(id).subscribe((resp: any) => {
    this.contrato = resp;
    console.log('id' , this.contrato.id);
    console.log('se modifica', this.contrato)

  })
  }
  public agregar(mascota): void {
    console.log('vol', mascota)
    this.contratoService.crearContrato(this.contrato)
  .subscribe(
    response => {
      this.router.navigate(['/contratos'])
      swal.fire({
        icon: 'success',
        title: 'Creación exitosa',
        showConfirmButton: false,
        timer: 1500
      })
      return response;
    })

}
public modificar(mascota): void {
  console.log('vol', mascota)
  this.contratoService.modificarContrato(this.contrato)
.subscribe(
  response => {
    this.router.navigate(['/contratos'])
    swal.fire({
      icon: 'success',
      title: 'El contrato ha sido modificado',
      showConfirmButton: false,
      timer: 1500
    })
    return response;
  })
}
}