import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recordatorio } from './recordatorio';
import { RecordatorioService } from './recordatorio.service';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import swal from 'sweetalert2'
import { AuditoriaService } from '../auditoria/auditoria.service';
import { AuthService } from '../usuarios/auth.service';



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
    private auditoriaService: AuditoriaService,
    private authService: AuthService,
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


  get recordatorioNoValido(){
    return this.recordatorioObj.get('descripcionRecordatorio').invalid && this.recordatorioObj.get('descripcionRecordatorio').touched;
  } 

  recordatorioObj =  this.formBuilder.group({
    idRecordatorio: [null], 
    descripcionRecordatorio: ["",Validators.required],
    fecha: [null]
  })

  auditoriaAgregarObj = {
    usuario: this.authService.usuario.username,
    accion: `Alta de recordatorio`
  }
  

  
  auditoriaAgregar() {
    this.auditoriaService.crearAuditoria(this.auditoriaAgregarObj).subscribe(response => {
      return response;
    })
  }
  
  public submit(): void{

    if (this.recordatorioObj.invalid)
     return  Object.values(this.recordatorioObj.controls).forEach(control => {
        control.markAsTouched();
     })

    this.recordatorioService.crearRecordatorio(this.recordatorioObj.value)
    .subscribe(
      response => {
        this.router.navigate(['/recordatorios'])
        swal.fire({
          icon:'success',
          title: 'Creación exitosa',
          showConfirmButton: false,
          timer: 1500 
        })
        this.auditoriaAgregar();
        return response;
      }
    )
  }

 
}
