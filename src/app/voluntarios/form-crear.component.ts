import { Component, OnInit } from '@angular/core';
import { Voluntario } from './voluntario';
import { VoluntarioService } from './voluntario.service';
import {Router, ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';
import { strictEqual } from 'assert';

@Component({
  selector: 'app-form-crear',
  templateUrl: './form-crear.component.html',
  styleUrls:['./form-crear.component.css']
})
export class FormCrearComponent implements OnInit {

  voluntario: Voluntario = new Voluntario()
  titulo: string = 'Nuevo Voluntario'

  constructor(
    public voluntarioService: VoluntarioService, 
    public router: Router,
    public activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.cargarVoluntario();
  }

  cargarVoluntario(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.voluntarioService.getVoluntario(id).subscribe(
          (voluntario) => this.voluntario = voluntario
        )
      }
    })

    console.log('datos a modificar: ' , this.voluntario)
  }

  public create(): void {
    this.voluntarioService.create(this.voluntario)
    .subscribe(voluntario => {
      this.router.navigate(['/voluntarios'])
      swal.fire('', 'Creación exitosa', 'success')
    }
      )
      console.log('se guarda los datos: ')
      console.log(this.voluntario)
  }

  update(): void {
    this.voluntarioService.update(this.voluntario)
    .subscribe(
      voluntario => {
        this.router.navigate(['/voluntarios'])
        swal.fire('', `El voluntario ${voluntario.nombreCompleto} ha sido modificado`, 'success')
      }
    )

    console.log('Se modifican los datos:' )
    console.log(this.voluntario)
  }
}
