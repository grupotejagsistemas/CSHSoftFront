import { Component, OnInit } from '@angular/core';
import { Veterinaria } from './veterinaria';
import { VeterinariaService } from './veterinaria.service';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2'
import { FormArray, FormBuilder, Validators } from '@angular/forms';

import { AuditoriaService } from '../auditoria/auditoria.service';
import { AuthService } from '../usuarios/auth.service';


@Component({
  selector: 'app-form-veterinaria',
  templateUrl: './form-veterinaria.component.html',
  styleUrls:['./form-veterinaria.component.css']
})
export class FormVeterinariaComponent implements OnInit {

  veterinaria: Veterinaria = new Veterinaria()
  checked: boolean;

  constructor(
    private veterinariaService: VeterinariaService, 
    private auditoriaService: AuditoriaService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');

  this.veterinaria = Veterinaria.build();


}

get razonSocialNoValido(){
  return this.veterinariaObj.get('razonSocial').invalid && this.veterinariaObj.get('razonSocial').touched
}
get horarioAtencionNoValido(){
  return this.veterinariaObj.get('horarioAtencion').invalid && this.veterinariaObj.get('horarioAtencion').touched
}
get direccionNoValido(){
  return this.veterinariaObj.get('direccion').invalid && this.veterinariaObj.get('direccion').touched
}

veterinariaObj = this.formBuilder.group({
  id: [null],
  razonSocial: ["",Validators.required],
  horarioAtencion: [null,Validators.required],
  direccion: ["",Validators.required],
  internacion: [false],
  observacion: [""]
})

auditoriaAgregarObj = {
  usuario: this.authService.usuario.username,
  accion: `Alta de veterinaria`
}


auditoriaAgregar() {
  this.auditoriaService.crearAuditoria(this.auditoriaAgregarObj).subscribe(response => {
    return response;
  })
}




public submit(): void {
  const id = +this.route.snapshot.paramMap.get('id');

  console.log(this.veterinariaObj);  
   if (this.veterinariaObj.invalid)
   return  Object.values(this.veterinariaObj.controls).forEach(control => {
      control.markAsTouched();
    })

    if(this.checked === true){
        this.veterinariaObj.value.internacion = "SI";
    } else {
        this.veterinariaObj.value.internacion = "NO";
    }

  this.veterinariaService.crearVeterinaria(this.veterinariaObj.value)
  .subscribe(
    response => {
      this.router.navigate(['/veterinarias'])
      swal.fire({
        icon: 'success',
        title: 'Creación exitosa',
      })
      this.auditoriaAgregar();
      return response;
    })

}

}
