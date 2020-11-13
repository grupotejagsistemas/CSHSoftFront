import { Component, OnInit } from '@angular/core';
import { Veterinaria } from './veterinaria';
import { VeterinariaService } from './veterinaria.service';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2'
import { FormArray, FormBuilder, Validators } from '@angular/forms';

import { AuditoriaService } from '../auditoria/auditoria.service';
import { AuthService } from '../usuarios/auth.service';


@Component({
  selector: 'app-editar-veterinaria',
  templateUrl: './editar-veterinaria.component.html',
  styleUrls: ['./editar-veterinaria.component.css']
})
export class EditarVeterinariaComponent implements OnInit {

  veterinaria: Veterinaria;
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

  if(id !== 0 ){
    this.veterinariaService.getVeterinaria(id).subscribe((resp: any) => {
      this.veterinaria = resp;
      console.log(this.veterinaria)
      if(this.veterinaria.internacion === "SI"){
        this.checked = true;
      } else {
        this.checked = false;
      }
    })
  }
}
get razonSocialNoValido(){
  return this.editarVeterinariaObj.get('razonSocial').invalid && this.editarVeterinariaObj.get('razonSocial').touched
}
get horarioAtencionNoValido(){
  return this.editarVeterinariaObj.get('horarioAtencion').invalid && this.editarVeterinariaObj.get('horarioAtencion').touched
}
get direccionNoValido(){
  return this.editarVeterinariaObj.get('direccion').invalid && this.editarVeterinariaObj.get('direccion').touched
}

editarVeterinariaObj = this.formBuilder.group({
  id: null,
  razonSocial: ["",Validators.required],
  horarioAtencion: [null,Validators.required],
  direccion: ["",Validators.required],
  observacion: "",
})



auditoriaModificarObj = {
  usuario: this.authService.usuario.username,
  accion: 'Modificación de veterinaria'
}


auditoriaModificar(){
  this.auditoriaService.crearAuditoria(this.auditoriaModificarObj).subscribe(response => {
    return response;
  })
}

  
  
public submit(): void {
  const id = +this.route.snapshot.paramMap.get('id');

  if(this.checked === true){
   this.editarVeterinariaObj.value.internacion = 'SI' 
    this.checked = true;
} else {
    this.editarVeterinariaObj.value.internacion = 'NO'
    this.checked = false;
}

  this.veterinariaService.modificarVeterinaria(this.editarVeterinariaObj.value,id)
  .subscribe(
    response =>{
      this.router.navigate(['/veterinarias'])
      swal.fire({
        icon: 'success',
        title: 'La veterinaria ha sido modificada',
        showConfirmButton: true,
        timer: 1500
      })
      this.auditoriaModificar();
      return response;
    }
  )
}

}

