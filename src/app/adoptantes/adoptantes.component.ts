import { Component, OnInit } from '@angular/core';
import { Adoptante } from './adoptante';
import { AdoptanteService }from './adoptante.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-adoptantes',
  templateUrl: './adoptantes.component.html',
  styleUrls: ['./adoptantes.component.css']
})
export class AdoptantesComponent implements OnInit {

  busquedaNombre: string;
  adoptantes: Adoptante[];
  p: number = 1;

  constructor(private adoptanteService: AdoptanteService) { }

  ngOnInit(): void {

    this.adoptanteService.getAdoptantes().subscribe((data: any) => {
      this.adoptantes = data;
      console.log('array de adoptantes: ' + this.adoptantes)
    })
  }
  

  filtroNombre(nombre: string): void {
    this.adoptanteService.getAdoptanteNombre(nombre).subscribe((data: any) => {
      this.adoptantes = data;
    })
  }
 }
