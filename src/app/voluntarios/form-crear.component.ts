import { Component, OnInit } from '@angular/core';
import { Voluntario } from './voluntario';
import { Veterinaria} from './veterinaria';
import { VoluntarioService } from './voluntario.service';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2'


@Component({
  selector: 'app-form-crear',
  templateUrl: './form-crear.component.html',
  styleUrls:['./form-crear.component.css']
})
export class FormCrearComponent implements OnInit {

  checkedTransito: boolean;
  checkedPresencial: boolean; 
  checkedTraslado: boolean; 
  voluntario:  Voluntario;
  veterinarias: any [] = [] ;
  titulo: string = 'Nuevo Voluntario'

  constructor(
    private voluntarioService: VoluntarioService, 
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {   
    const id = +this.route.snapshot.paramMap.get('id');

    this.voluntario = Voluntario.build();
    this.voluntarioService.getVoluntario(id).subscribe((resp: any) => {
      this.voluntario = resp;
      console.log('id' , this.voluntario.id);
    })
      this.voluntarioService.getVeterinarias().subscribe((resp: any) => {
        this.veterinarias = resp;
        console.log('veterinariascercanas', this.veterinarias)
      })
  }


  public agregar(voluntario): void {
    
    if(this.checkedPresencial === true){
      voluntario.presencial = "SI";
    } else {
      voluntario.presencial = "NO";
    }

    if(this.checkedTransito === true){
      voluntario.transito = "SI";
    } else {
      voluntario.transito = "NO";
    }

    if(this.checkedTraslado === true) {
      voluntario.traslado = "SI";
    }else {
      voluntario.traslado = "NO";
    }


    this.voluntarioService.crearVoluntario(voluntario)
    .subscribe(
      response => {
        this.router.navigate(['/voluntarios'])
        swal.fire({
          icon: 'success',
          title: 'Creación exitosa',
          showConfirmButton: false,
          timer: 1500
        })
        return response;
      })
  }

  public modificar(voluntario): void {

    if(this.checkedPresencial === true){
      voluntario.presencial = "SI";
    } else {
      voluntario.presencial = "NO";
    }

    if(this.checkedTransito === true){
      voluntario.transito = "SI";
    } else {
      voluntario.transito = "NO";
    }

    if(this.checkedTraslado === true) {
      voluntario.traslado = "SI";
    }else {
      voluntario.traslado = "NO";
    }

    this.voluntarioService.modificarVoluntario(voluntario)
    .subscribe(
      response =>{
        this.router.navigate(['/voluntarios'])
        swal.fire({
          icon: 'success',
          title: 'El voluntario ha sido modificado',
          showConfirmButton: false,
          timer: 1500
        })
        return response;
      }
    )
  }
}
