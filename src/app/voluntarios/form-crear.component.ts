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
  veterinariasCercanas: any [] = [];

  constructor(
    private voluntarioService: VoluntarioService, 
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {   
    const id = +this.route.snapshot.paramMap.get('id');

    this.voluntario = Voluntario.build();

    if(id !== 0){
      this.voluntarioService.getVoluntario(id).subscribe((resp: any) => {
        this.voluntario = resp;
      })
    } 

      this.voluntarioService.getVeterinarias().subscribe((resp: any) => {
        this.veterinarias = resp;
        console.log('veterinariascercanas', this.veterinarias)
      })
  }

  voluntarioObj = {
    id: null,
    nombreCompleto: "", 
    telefono: null,
    direccion: "",
    idveterinarias: "",
    localidad: "",
    transito: "",
    traslado: "",
    presencial: ""
  }

  public agregar(): void {
    
    if(this.checkedPresencial === true){
      this.voluntarioObj.presencial = "SI";
    } else {
      this.voluntarioObj.presencial = "NO";
    }

    if(this.checkedTransito === true){
      this.voluntarioObj.transito = "SI";
    } else {
      this.voluntarioObj.transito = "NO";
    }

    if(this.checkedTraslado === true) {
      this.voluntarioObj.traslado = "SI";
    }else {
      this.voluntarioObj.traslado = "NO";
    }


    this.voluntarioService.crearVoluntario(this.voluntarioObj)
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

  public modificar(): void {

    if(this.checkedPresencial === true){
      this.voluntarioObj.presencial = "SI";
    } else {
      this.voluntarioObj.presencial = "NO";
    }

    if(this.checkedTransito === true){
      this.voluntarioObj.transito = "SI";
    } else {
      this.voluntarioObj.transito = "NO";
    }

    if(this.checkedTraslado === true) {
      this.voluntarioObj.traslado = "SI";
    }else {
      this.voluntarioObj.traslado = "NO";
    }

    this.voluntarioService.modificarVoluntario(this.voluntarioObj)
    .subscribe( response =>{
        this.router.navigate(['/voluntarios'])
        swal.fire({
          icon: 'success',
          title: 'El voluntario ha sido modificado',
          showConfirmButton: false,
          timer: 1500
        })
        return response;
      })
  }

  agregarVeterinaria(): void {
    this.veterinariasCercanas.push(this.voluntarioObj.idveterinarias);
    console.log('vete', this.veterinariasCercanas)

  }

  eliminarVeterinaria(i: any): void {
    this.veterinariasCercanas = this.veterinariasCercanas.splice(i, 1)[0];
    console.log('index', i)
      console.log('veteCercana', this.veterinariasCercanas)
  }
}
