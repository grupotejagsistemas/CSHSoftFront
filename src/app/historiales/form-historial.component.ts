import { Component, OnInit } from '@angular/core';
import { Mascota } from './mascota';
import { Historial } from './historial';
import { Voluntario } from './voluntario';
import { HistorialService } from './historial.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-historial',
  templateUrl: './form-historial.component.html',
  styleUrls: ['./form-historial.component.css']
})
export class FormHistorialComponent implements OnInit {
  
  historial: Historial;
  mascotas: Mascota[];
  voluntarios: Voluntario[];

  constructor(
    private historialService: HistorialService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    this.historial = Historial.build();
    
    if(id !== 0){
      this.historialService.getHistorial(id).subscribe((resp: any) => {
        this.historialObj = resp;
      })
    }

    this.historialService.getMascotas().subscribe((resp: any) => {
      this.mascotas = resp;
      this.mascotas.unshift({
        nombre: 'Seleccione una mascota',
        id: null
      })
    })

    this.historialService.getVoluntarios().subscribe((resp: any) => {
      this.voluntarios = resp;
      this.voluntarios.unshift({
        nombrecompleto: 'Seleccione un voluntario',
        id: null
      })
    })
  }

  historialObj = {
    id: null,
    idVoluntario: null,
    idMascota: null, 
    fecha: new Date()
  }

  public agregar(): void {
    this.historialService.crearHistorial(this.historialObj)
    .subscribe(
      response => {
        this.router.navigate(['/historial'])
        Swal.fire({
          icon: 'success',
          title: 'Creación exitosa',
          showConfirmButton: false, 
          timer: 1500
        })
        return response;
      }
    )
  }

  public modificar(): void {
    console.log('modif', this.historialObj)
    this.historialService.modificarHistorial(this.historialObj)
    .subscribe(
      response => {
        this.router.navigate(['/historial'])
        Swal.fire({
          icon: 'success',
          title: 'El historial ha sido modificado',
          showConfirmButton: false,
          timer: 1500
        })
        return response;
      }
    )
  }

}
