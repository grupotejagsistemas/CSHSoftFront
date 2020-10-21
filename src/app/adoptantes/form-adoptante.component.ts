/*import { Component, OnInit } from '@angular/core';
import {Adoptante} from './adoptante';
import {AdoptanteService} from './adoptante.service';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import { Mascota } from './mascota';
import {EstadoAdoptante} from './estado-adoptante';

@Component({
  selector: 'app-form-adoptante',
  templateUrl: './form-adoptante.component.html',
  styleUrls: ['./form-adoptante.component.css']
})
export class FormAdoptanteComponent implements OnInit {

  adoptante: Adoptante = new Adoptante();
  mascotas: Mascota[];
  estados: EstadoAdoptante[];
  titulo: string = "Nuevo Adoptante";
  p: number = 1;

  constructor(
    private adoptanteService: AdoptanteService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.adoptanteService.getMascotas().subscribe(mascotas => this.mascotas = mascotas);
    this.adoptanteService.getEstadosAdoptante().subscribe(estados => this.estados = estados);
  }

/*  public create(): void {
    this.adoptanteService.create(this.adoptante).subscribe(
      response=> {
        this.router.navigate(['/adoptantes'])
      }
    )
    console.log('se guarda los datos: ' + this.adoptante)
  }
}
*/