import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mascota } from '../mascotas/mascota';
import { Veterinaria } from '../voluntarios/veterinaria';
import { FichaMedica } from './ficha-medica';
import { FichaMedicaService } from './ficha-medica.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-form-ficha-medica',
  templateUrl: './form-ficha-medica.component.html',
  styleUrls: ['./form-ficha-medica.component.css']
})
export class FormFichaMedicaComponent implements OnInit {

  checkedVacuna: boolean;
  checkedTratamiento: boolean;
  checkedDesparasitacion: boolean;
  mascotas: Mascota[];
  veterinarias: Veterinaria[];
  fichaMedica: FichaMedica;
  
  constructor(
    private fichasMedicasService: FichaMedicaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

    ngOnInit(): void {

      const id = +this.route.snapshot.paramMap.get('id');

      this.fichaMedica = FichaMedica.build();
      this.fichasMedicasService.getFichaMedica(id).subscribe((resp: any) => { 
      this.fichaMedicaObj = resp;
    })
    
    this.fichasMedicasService.getMascotas().subscribe((resp: any) => {
      this.mascotas = resp; 
    });

    this.fichasMedicasService.getVeterinarias().subscribe((resp: any) => {
      this.veterinarias = resp;
    })

  }

  fichaMedicaObj = {
    id: null, 
    fecha: new Date(), 
    desparasitacion: "",
    nombreProducto: "",
    vacuna: "", 
    nombreVacuna: "", 
    diagnostico: "", 
    idMascota: null,
    idVeterinaria: null, 
    tratamiento: "", 
    descripcionTratamiento: ""
  }

  public agregar(): void {

    if(this.checkedVacuna === true){
      this.fichaMedicaObj.vacuna = "SI";
    } else {
      this.fichaMedicaObj.vacuna = "NO";
    }

    if(this.checkedDesparasitacion === true){
      this.fichaMedicaObj.desparasitacion = "SI";
    } else {
      this.fichaMedicaObj.desparasitacion = "NO";
    }

    if(this.checkedTratamiento === true) {
      this.fichaMedicaObj.tratamiento = "SI";
    }else {
      this.fichaMedicaObj.tratamiento = "NO";
    }

    this.fichasMedicasService.crearFichaMedica(this.fichaMedicaObj)
    .subscribe(
      response => {
        this.router.navigate(['/fichas-medicas'])
        swal.fire({
          icon: 'success',
          title: 'Creación exitosa',
          showConfirmButton: false,
          timer: 1500
        })
        return response;
      }
    )
  }

  public modificar(fichaMedica): void {

    if(this.checkedVacuna === true){
      this.fichaMedicaObj.vacuna = "SI";
    } else {
      this.fichaMedicaObj.vacuna = "NO";
    }

    if(this.checkedDesparasitacion === true){
      this.fichaMedicaObj.desparasitacion = "SI";
    } else {
      this.fichaMedicaObj.desparasitacion = "NO";
    }

    if(this.checkedTratamiento === true) {
      this.fichaMedicaObj.tratamiento = "SI";
    }else {
      this.fichaMedicaObj.tratamiento = "NO";
    }

    this.fichasMedicasService.modificarFichaMedica(this.fichaMedicaObj)
    .subscribe(
      response => {
        this.router.navigate(['/fichas-medicas'])
        swal.fire({
          icon: 'success',
          title: 'La ficha médica ha sido modificada',
          showConfirmButton: false,
          timer: 1500
        })
        return response;
      }
    )
  }
}
