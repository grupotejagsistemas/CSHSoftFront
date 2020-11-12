import { Component, OnInit } from '@angular/core';
import { Adoptante } from './adoptante';
import { AdoptanteService }from './adoptante.service';
import swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';
import { AuditoriaService } from '../auditoria/auditoria.service';

@Component({
  selector: 'app-adoptantes',
  templateUrl: './adoptantes.component.html',
  styleUrls: ['./adoptantes.component.css']
})
export class AdoptantesComponent implements OnInit {

  checkedApto: boolean;
  checkedNoApto: boolean;
  checkedEnProceso: boolean;
  checkedRechazado: boolean;
  checkedFinalizado: boolean;
  busquedaNombre: string;
  adoptantes: Adoptante[];
  p: number = 1;

  constructor(
    private adoptanteService: AdoptanteService,
    private auditoriaService: AuditoriaService,
    private authService: AuthService
    
    ) { }

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

  filtroApto(): void{
    if(this.checkedApto === true){
      this.adoptanteService.filtrarApto("Apto").subscribe((data: any ) => {
        this.adoptantes = data;
        this.checkedNoApto = false;
        this.checkedEnProceso = false; 
        this.checkedFinalizado = false; 
        this.checkedRechazado = false;
      })
    } else {
      this.adoptanteService.getAdoptantes().subscribe((data: any) => {
        this.adoptantes = data; 
      })
    }
  }
  
  filtroNoApto(): void {
    if(this.checkedNoApto === true){
      this.adoptanteService.filtrarNoApto("NoApto").subscribe((data: any) => {
        this.adoptantes = data;
        this.checkedApto = false;
        this.checkedEnProceso = false; 
        this.checkedFinalizado = false; 
        this.checkedRechazado = false;
      })
    }else {
      this.adoptanteService.getAdoptantes().subscribe((data: any) => {
        this.adoptantes = data; 
      })
    }
  }
  
  filtroEnProceso(): void{
    if(this.checkedEnProceso === true){
      this.adoptanteService.filtrarEnProceso("EnProceso").subscribe((data: any) => {
        this.adoptantes = data;
        this.checkedApto = false;
        this.checkedNoApto = false; 
        this.checkedFinalizado = false; 
        this.checkedRechazado = false;
      })
    }else {
      this.adoptanteService.getAdoptantes().subscribe((data: any) => {
        this.adoptantes = data; 
      })
    }
  }

  filtroRechazado(): void{
    if(this.checkedRechazado === true) {
      this.adoptanteService.filtrarRechazado('Rechazado').subscribe((data: any) => {
        this.adoptantes = data;
        this.checkedApto = false;
        this.checkedNoApto = false; 
        this.checkedEnProceso = false;
        this.checkedFinalizado = false; 
      })
    }else {
      this.adoptanteService.getAdoptantes().subscribe((data: any) => {
        this.adoptantes = data; 
      })
    }

  }
  
  filtroFinalizado(): void {
    if(this.checkedFinalizado === true){
      this.adoptanteService.filtrarFinalizado("Finalizado").subscribe((data: any) => {
        this.adoptantes = data; 
        this.checkedApto = false;
        this.checkedNoApto = false; 
        this.checkedEnProceso = false;
        this.checkedRechazado = false; 
      })
    }else {
      this.adoptanteService.getAdoptantes().subscribe((data: any) => {
        this.adoptantes = data; 
      })
    }
  }

 }
