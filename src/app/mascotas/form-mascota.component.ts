import { Component, OnInit } from '@angular/core';
import { Mascota } from './mascota';
import { MascotaService } from './mascota.service';
import {Router} from '@angular/router';
import swal from 'sweetalert2'


@Component({
  selector: 'app-form-mascota',
  templateUrl: './form-mascota.component.html',
  styleUrls:['./form-mascota.component.css']
})
export class FormMascotaComponent implements OnInit {

  mascota: Mascota = new Mascota()
  titulo: string = 'Nueva Mascota'

  constructor(
    private mascotaService: MascotaService, 
    private router: Router
    ) { }

  ngOnInit(): void {
  }
/*
  public create(): void {
    this.mascotaService.create(this.mascota).subscribe(
      response => {
        this.router.navigate(['/mascotas'])
   
      }
      )
      console.log('se guarda los datos: ')
      console.log(this.mascota)
  }
*/
}