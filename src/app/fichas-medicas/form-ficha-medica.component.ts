import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mascota } from '../mascotas/mascota';
import { FichaMedica } from './ficha-medica';
import { FichaMedicaService } from './ficha-medica.service';

@Component({
  selector: 'app-form-ficha-medica',
  templateUrl: './form-ficha-medica.component.html',
  styleUrls: ['./form-ficha-medica.component.css']
})
export class FormFichaMedicaComponent implements OnInit {

  mascota: Mascota;
  fichaMedica: FichaMedica;
  titulo: string = 'Nuevo Ficha Medica'

  constructor(
    private fichasMedicasService: FichaMedicaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

    ngOnInit(): void {

      const id = +this.route.snapshot.paramMap.get('id');

      this.fichaMedica = FichaMedica.build();
      this.fichasMedicasService.getFichaMedica(id).subscribe((resp: any) => { 
      this.fichaMedica = resp;
    })
    this.fichasMedicasService.getMascotas().subscribe((resp: any) => {
      this.mascota = resp; 
    })

  }

  public agregar(fichaMedica): void {
    console.log('ficham', fichaMedica);
    this.fichasMedicasService.crearFichaMedica(fichaMedica)
    .subscribe(
      response => {
        this.router.navigate(['/fichas-medicas'])
        return response;
      }
    )
  }

  public modificar(fichaMedica): void {
    console.log('modif ficha', fichaMedica);
    this.fichasMedicasService.modificarFichaMedica(fichaMedica)
    .subscribe(
      response => {
        this.router.navigate(['/fichas-medicas'])
        return response;
      }
    )
  }
}
