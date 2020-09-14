import { Component, OnInit } from '@angular/core';
import {FichaMedica } from './ficha-medica';
import {FichaMedicaService} from './ficha-medica.service';
import {Router, ActivatedRoute, RouterModule} from '@angular/router';
import swal from 'sweetalert2';
import {strictEqual} from 'assert';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  fichaMedica: FichaMedica = new FichaMedica()
  titulo: string = 'Nueva Ficha Médica'

  constructor(
    public fichaMedicaService: FichaMedicaService,
    public router: Router,
    public activatedRoute: ActivatedRoute


  ) { }

  ngOnInit(): void {
    this.cargarFichaMedica();
  }

  cargarFichaMedica(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.fichaMedicaService.getFichaMedica(id).subscribe(
          (fichaMedica) => this.fichaMedica = fichaMedica
        )
      }
    })

    console.log('datos a modificar: ', this.fichaMedica)
  }

  public create(): void {
    this.fichaMedicaService.create(this.fichaMedica)
    .subscribe(fichaMedica => {
      this.router.navigate(['/fichas-medicas'])
      swal.fire('', 'Creación exitosa', 'success')
    })
    console.log('se guarda los datos: ', this.fichaMedica)
  }

  update(): void {
    this.fichaMedicaService.update(this.fichaMedica)
    .subscribe(
      json => {
        this.router.navigate(['/fichas-medicas'])
        swal.fire('', 'La ficha médica ha sido modificada', 'success')
      }
    )

    console.log('Se modifican los datos: ', this.fichaMedica)
  }

}
