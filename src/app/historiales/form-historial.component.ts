import { Component, OnInit } from '@angular/core';
import { Mascota } from './mascota';
import { Historial } from './historial';
import { Voluntario } from './voluntario';
import { HistorialService } from './historial.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, Validators  } from '@angular/forms';
import { AuditoriaService } from '../auditoria/auditoria.service';
import { AuthService } from '../usuarios/auth.service';

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
    id: null,
    idVoluntario: [null,Validators.required],
    idMascota:[null,Validators.required],
    fecha:  ["",Validators.required]
  })

  submit(): void{
    const id = +this.route.snapshot.paramMap.get('id');

    console.log(this.historialObj);  
     if (this.historialObj.invalid)
     return  Object.values(this.historialObj.controls).forEach(control => {
        control.markAsTouched();
      })
    }



  auditoriaAgregarObj = {
    usuario: this.authService.usuario.username,
    accion: `Alta de historial`
  }
  
  auditoriaModificarObj = {
    usuario: this.authService.usuario.username,
    accion: 'Modificación de historial'
  }
  
  auditoriaAgregar() {
    this.auditoriaService.crearAuditoria(this.auditoriaAgregarObj).subscribe(response => {
      return response;
    })
  }
  
  auditoriaModificar(){
    this.auditoriaService.crearAuditoria(this.auditoriaModificarObj).subscribe(response => {
      return response;
    })
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
        this.auditoriaAgregar();
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
        this.auditoriaModificar();
        return response;
      }
    )
  }

}
