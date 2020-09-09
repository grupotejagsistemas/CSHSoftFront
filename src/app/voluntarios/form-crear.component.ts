import { Component, OnInit } from '@angular/core';
import { Voluntario } from './voluntario';
import { VoluntarioService } from './voluntario.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-form-crear',
  templateUrl: './form-crear.component.html',
  styleUrls:['./form-crear.component.css']
})
export class FormCrearComponent implements OnInit {

  voluntario: Voluntario = new Voluntario()
  titulo: string = 'Nuevo Voluntario'

  constructor(
    private voluntarioService: VoluntarioService, 
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  public create(): void {
    this.voluntarioService.create(this.voluntario).subscribe(
      response => this.router.navigate(['/voluntarios'])
      )
      console.log('se guarda los datos: ')
      console.log(this.voluntario)
  }

}
