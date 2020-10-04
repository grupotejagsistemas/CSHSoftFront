import { Component, OnInit } from '@angular/core';
import { Voluntario } from './voluntario';
import { Veterinaria} from './veterinaria';
import { VoluntarioService } from './voluntario.service';
import {Router} from '@angular/router';
import swal from 'sweetalert2'


@Component({
  selector: 'app-form-crear',
  templateUrl: './form-crear.component.html',
  styleUrls:['./form-crear.component.css']
})
export class FormCrearComponent implements OnInit {

  voluntario: Voluntario = new Voluntario()
  veterinarias: Veterinaria[]
  titulo: string = 'Nuevo Voluntario'

  constructor(
    private voluntarioService: VoluntarioService, 
    private router: Router
    ) { }

  ngOnInit(): void {
    this.voluntarioService.getVeterinarias().subscribe(veterinarias => this.veterinarias = veterinarias)
  }

  public create(): void {
    this.voluntarioService.create(this.voluntario).subscribe(
      response => {
        this.router.navigate(['/voluntarios'])
   
      }
      )
      console.log('se guarda los datos: ')
      console.log(this.voluntario)
  }

}
