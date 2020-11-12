import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { MovimientoRecurso } from './movimiento-recurso';
import { MovimientoRecursoService } from './movimiento-recurso.service';
import { TipoMovimiento } from './tipoMovimiento';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-mov-recurso',
  templateUrl: './form-mov-recurso.component.html',
  styleUrls: ['./form-mov-recurso.component.css']
})
export class FormMovRecursoComponent implements OnInit {

  tiposMovimientos: TipoMovimiento[];

  titulo: string = "Nuevo Movimiento de Recursos"

  movimientoRecurso: MovimientoRecurso = new MovimientoRecurso()

  constructor(
    private movimientoRecursoService: MovimientoRecursoService,
    private router:  Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    this.movimientoRecurso = MovimientoRecurso.build();

    this.movimientoRecursoService.getTipoMovimiento()
    .subscribe((resp: any) => {
      this.tiposMovimientos = resp;
      this.tiposMovimientos.unshift({
        descripcion: 'Seleccione un tipo de movimiento',
        id: null
      })
    })
  }
  get donanteNoValido(){
    return this.movRecObj.get('donante').invalid && this.movRecObj.get('donante').touched
  }
  get idTipoMovimientoNoValido(){
    return this.movRecObj.get('idTipoMovimiento').invalid && this.movRecObj.get('idTipoMovimiento').touched
  }
  get cantidadNoValido(){
    return this.movRecObj.get('cantidad').invalid && this.movRecObj.get('cantidad').touched
  }
  get descripcionNoValido(){
    return this.movRecObj.get('descripcion').invalid && this.movRecObj.get('descripcion').touched
  }
  get fechaNoValido(){
    return this.movRecObj.get('fecha').invalid && this.movRecObj.get('fecha').touched
  }

  movRecObj = this.formBuilder.group({
    donante:["",Validators.required],
    fecha: [null,Validators.required], 
    idTipoMovimiento: [null,Validators.required],
    descripcion: ["",Validators.required],
    cantidad: ["",Validators.required],
  })

  submit(): void{
    const id = +this.route.snapshot.paramMap.get('id');

    console.log(this.movRecObj);  
     if (this.movRecObj.invalid)
     return  Object.values(this.movRecObj.controls).forEach(control => {
        control.markAsTouched();
     })
    }

  public agregar(): void {
    this.movimientoRecursoService.crearMovRecursos(this.movRecObj)
    .subscribe(
      response => {
        this.router.navigate(['/movimientos-recursos'])
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
}
