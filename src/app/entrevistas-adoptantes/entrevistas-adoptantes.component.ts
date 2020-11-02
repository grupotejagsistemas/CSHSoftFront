import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { EntrevistaAdoptante } from './entrevista-adoptante';
import { EntrevistaAdoptanteService } from './entrevista-adoptante.service';

@Component({
  selector: 'app-entrevistas-adoptantes',
  templateUrl: './entrevistas-adoptantes.component.html',
  styleUrls: ['./entrevistas-adoptantes.component.css']
})
export class EntrevistasAdoptantesComponent implements OnInit {

  busquedaAdoptante: string; 
  entrevistas: EntrevistaAdoptante[];
  p: number = 1;

  constructor(public entrevistaService: EntrevistaAdoptanteService) { }

  ngOnInit(): void {
    this.entrevistaService.getEntrevistas().subscribe((data: any ) => {
      this.entrevistas = data;
    })
  }

  filtroAdoptante(adoptante: string): void {
    this.entrevistaService.getAdoptanteNombre(adoptante).subscribe((data: any) => {
      this.entrevistas = data;
    })
  }


}
