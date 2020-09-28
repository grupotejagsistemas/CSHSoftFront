import { Component, OnInit } from '@angular/core';
import {FichaMedica } from './ficha-medica';
import {Mascota} from './mascota';
import {Veterinaria} from './veterinaria';
import {FichaMedicaService} from './ficha-medica.service';
import {Router, ActivatedRoute, RouterModule} from '@angular/router';
import swal from 'sweetalert2';
import {strictEqual} from 'assert';

@Component({
  selector: 'app-form-ficha-medica',
  templateUrl: './form-ficha-medica.component.html',
  styleUrls: ['./form-ficha-medica.component.css']
})
export class FormFichaMedicaComponent implements OnInit {

  fichaMedica: FichaMedica = new FichaMedica()
  mascotas: Mascota[];
  veterinarias: Veterinaria[];
  titulo: string = 'Nueva Ficha Médica'

  constructor(
    public fichaMedicaService: FichaMedicaService,
    public router: Router,
    public activatedRoute: ActivatedRoute


  ) { }

  ngOnInit(): void {
    this.cargarFichaMedica();
    this.fichaMedicaService.getMascotas().subscribe(mascotas => this.mascotas = mascotas)
    this.fichaMedicaService.getVeterinaria().subscribe(veterinarias => this.veterinarias = veterinarias)
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
