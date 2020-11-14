import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuditoriaService } from '../auditoria/auditoria.service';
import { AuthService } from '../usuarios/auth.service';
import { Recordatorio } from './recordatorio';
import { RecordatorioService } from './recordatorio.service';

@Component({
  selector: 'app-editar-recordatorio',
  templateUrl: './editar-recordatorio.component.html',
  styleUrls: ['./editar-recordatorio.component.css']
})
export class EditarRecordatorioComponent implements OnInit {

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
        this.recordatorio = resp; 
      })
    }
  }
  
  recordatorioObj =  this.formBuilder.group({
    idRecordatorio: [null], 
    descripcionRecordatorio: ["",Validators.required],
    fecha: [null]
  })

  get recordatorioNoValido(){
    return this.recordatorioObj.get('descripcionRecordatorio').invalid && this.recordatorioObj.get('descripcionRecordatorio').touched;
  } 


  auditoriaModificarObj = {
    usuario: this.authService.usuario.username,
    accion: 'Modificación de recordatorio'
  }

  auditoriaModificar(){
    this.auditoriaService.crearAuditoria(this.auditoriaModificarObj).subscribe(response => {
      return response;
    })
  }

  public submit(): void {
    const id = +this.route.snapshot.paramMap.get('id')

    if (this.recordatorioObj.invalid)
    return  Object.values(this.recordatorioObj.controls).forEach(control => {
       control.markAsTouched();
    })
    this.recordatorioService.modificarRecordatorio(this.recordatorioObj.value, id)
    .subscribe(
      response => {
        this.router.navigate(['/recordatorios'])
        Swal.fire({
          icon: 'success',
          title: 'El recordatorio ha sido modificado',
          showConfirmButton: false, 
          timer: 1500
        })
        this.auditoriaModificar();
        return response;
      }
    )
  }
}
