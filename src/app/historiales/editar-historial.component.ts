import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuditoriaService } from '../auditoria/auditoria.service';
import { AuthService } from '../usuarios/auth.service';
import { Historial } from './historial';
import { HistorialService } from './historial.service';
import { Mascota } from './mascota';
import { Voluntario } from './voluntario';

@Component({
  selector: 'app-editar-historial',
  templateUrl: './editar-historial.component.html',
  styleUrls: ['./editar-historial.component.css']
})
export class EditarHistorialComponent implements OnInit {

  historial: Historial;
  mascotas: Mascota[];
  voluntarios: Voluntario[];
  
  constructor(
    private historialService: HistorialService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private auditoriaService: AuditoriaService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    this.historial = Historial.build();
    
    if(id !== 0){
      this.historialService.getHistorial(id).subscribe((resp: any) => {
        this.historial = resp;
      })
    }

    this.historialService.getMascotas().subscribe((resp: any) => {
      this.mascotas = resp;
    })

    this.historialService.getVoluntarios().subscribe((resp: any) => {
      this.voluntarios = resp;

    })
  }




  get idVoluntarioNoValido(){
    return this.historialObj.get('idVoluntario').invalid && this.historialObj.get('idVoluntario').touched
  }
  get idMascotaNoValido(){
    return this.historialObj.get('idMascota').invalid && this.historialObj.get('idMascota').touched
  }
  get fechaNoValido(){
    return this.historialObj.get('fecha').invalid && this.historialObj.get('fecha').touched
  }



  historialObj = this.formBuilder.group({
    id: [null],
    idVoluntario: [null,Validators.required],
    idMascota:[null,Validators.required],
    fecha:  ["",Validators.required]
  })

  auditoriaModificarObj = {
    usuario: this.authService.usuario.username,
    accion: 'Modificación de historial'
  }

  auditoriaModificar(){
    this.auditoriaService.crearAuditoria(this.auditoriaModificarObj).subscribe(response => {
      return response;
    })
  }

  public submit(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    
    if (this.historialObj.invalid)
    return  Object.values(this.historialObj.controls).forEach(control => {
       control.markAsTouched();
     })
    this.historialService.modificarHistorial(this.historialObj.value, id)
    .subscribe(
      response => {
        this.router.navigate(['/historial'])
        Swal.fire({
          icon: 'success',
          title: 'El historial ha sido modificado',
          showConfirmButton: false,
          timer: 1500
        })
        this.auditoriaModificar();
        return response;
      }
    )
  }
}