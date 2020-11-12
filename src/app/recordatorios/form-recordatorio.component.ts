import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recordatorio } from './recordatorio';
import { RecordatorioService } from './recordatorio.service';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import swal from 'sweetalert2'



@Component({
  selector: 'app-form-recordatorio',
  templateUrl: './form-recordatorio.component.html',
  styleUrls: ['./form-recordatorio.component.css']
})
export class FormRecordatorioComponent implements OnInit {

  recordatorio: Recordatorio;
  

  constructor(
    private recordatorioService: RecordatorioService,
    private router: Router, 
    private route: ActivatedRoute,
    private formBuilder: FormBuilder

  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')

    this.recordatorio = Recordatorio.build();
    if(id !== 0){

      this.recordatorioService.getRecordatorio(id).subscribe((resp: any) => {
        this.recordatorioObj = resp; 
      })
    }
  }

  recordatorioObj = this.formBuilder.group( {
    idRecordatorio: [null], 
    descripcionRecordatorio: ["",Validators.required],
    fecha: [""]
  })
  submit(): void{
    const id = +this.route.snapshot.paramMap.get('id');

    console.log(this.recordatorioObj);  
     if (this.recordatorioObj.invalid)
     return  Object.values(this.recordatorioObj.controls).forEach(control => {
        control.markAsTouched();
     })
    }
  public agregar(): void{
    this.recordatorioService.crearRecordatorio(this.recordatorioObj)
    .subscribe(
      response => {
        this.router.navigate(['/recordatorios'])
        swal.fire({
          icon:'success',
          title: 'Creación exitosa',
          showConfirmButton: false,
          timer: 1500 
        })
        return response;
      }
    )
  }

  public modificar(): void {
    this.recordatorioService.modificarRecordatorio(this.recordatorioObj)
    .subscribe(
      response => {
        this.router.navigate(['/recordatorios'])
        swal.fire({
          icon: 'success',
          title: 'El recordatorio ha sido modificado',
          showConfirmButton: false, 
          timer: 1500
        })
        return response;
      }
    )
  }
}
