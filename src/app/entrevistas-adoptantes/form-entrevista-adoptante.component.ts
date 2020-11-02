import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntrevistaAdoptante } from './entrevista-adoptante';
import { EntrevistaAdoptanteService } from './entrevista-adoptante.service';
import swal from 'sweetalert2';
import { Adoptante } from './adoptante';


@Component({
  selector: 'app-form-entrevista-adoptante',
  templateUrl: './form-entrevista-adoptante.component.html',
  styleUrls: ['./form-entrevista-adoptante.component.css']
})
export class FormEntrevistaAdoptanteComponent implements OnInit {

  entrevista: EntrevistaAdoptante;
  adoptantes: Adoptante[];
  
  constructor(
    private entrevistaService: EntrevistaAdoptanteService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    if(id !== 0){
      this.entrevistaService.getEntrevista(id).subscribe((resp: any) => {
        this.entrevistaObj = resp;
      })
    }


    this.entrevistaService.getAdoptantes().subscribe((data: any) => {
      this.adoptantes = data;
      this.adoptantes.unshift({
        nombreCompleto: 'Seleccione un adoptante',
        id: null
      })
    })

  }

  entrevistaObj = {
    id: null,
    idAdoptante: "",
    respuesta1: "",
    respuesta2: "",
    respuesta3: "",
    respuesta4: "",
    respuesta5: "",
    respuesta6: "",
    respuesta7: "",
    respuesta8: "",
    respuesta9: "",
    respuesta10: "",
    respuesta11: "",
    respuesta12: "",
    respuesta13: "",
    respuesta14: "",
    respuesta15: "",
    respuesta16: "",
    respuesta17: "",
    respuesta18: "",
    respuesta19: "",
    respuesta20: "",
    respuesta21: "",
    respuesta22: ""
  }

  public agregar(): void {
    this.entrevistaService.crearEntrevista(this.entrevistaObj)
    .subscribe((response: any) => {
      this.router.navigate(['/entrevistas'])
      swal.fire({
        icon: 'success',
        title: 'Creación exitosa',
        showConfirmButton: false,
        timer: 1500
      })
      return response;
    })
  }

  public modificar(): void {
    this.entrevistaService.modificarEntrevista(this.entrevistaObj)
    .subscribe(
      response => {
        this.router.navigate(['/entrevistas'])
        swal.fire({
          icon: 'success',
          title: `La entrevista adoptante ha sido modificada`,
          showConfirmButton: false,
          timer: 1500
        })
        return response;
      }
    )
  }

}
