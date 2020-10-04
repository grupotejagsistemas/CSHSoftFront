import { Component, OnInit } from '@angular/core';
import { Veterinaria } from './veterinaria';
import { VeterinariaService } from './veterinaria.service';
import {Router} from '@angular/router';
import swal from 'sweetalert2'


@Component({
  selector: 'app-form-veterinaria',
  templateUrl: './form-veterinaria.component.html',
  styleUrls:['./form-veterinaria.component.css']
})
export class FormVeterinariaComponent implements OnInit {

  veterinaria: Veterinaria = new Veterinaria()
  titulo: string = 'Nueva Veterinaria'

  constructor(
    private veterinariaService: VeterinariaService, 
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  public create(): void {
    this.veterinariaService.create(this.veterinaria).subscribe(
      response => {
        this.router.navigate(['/veterinarias'])
   
      }
      )
      console.log('se guarda los datos: ')
      console.log(this.veterinaria)
  }

}
