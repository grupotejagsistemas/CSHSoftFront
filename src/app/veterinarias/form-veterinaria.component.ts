import { Component, OnInit } from '@angular/core';
import { Veterinaria } from './veterinaria';
import { VeterinariaService } from './veterinaria.service';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2'
import { AuditoriaService } from '../auditoria/auditoria.service';
import { AuthService } from '../usuarios/auth.service';


@Component({
  selector: 'app-form-veterinaria',
  templateUrl: './form-veterinaria.component.html',
  styleUrls:['./form-veterinaria.component.css']
})
export class FormVeterinariaComponent implements OnInit {

  veterinaria: Veterinaria = new Veterinaria()
  titulo: string = 'Nueva Veterinaria'
  checked: boolean;

  constructor(
    private veterinariaService: VeterinariaService, 
    private auditoriaService: AuditoriaService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
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

auditoriaAgregarObj = {
  usuario: this.authService.usuario.username,
  accion: `Alta de veterinaria`
}

auditoriaModificarObj = {
  usuario: this.authService.usuario.username,
  accion: 'Modificación de veterinaria'
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


public agregar(veterinaria): void {
    if(this.checked === true){
        veterinaria.internacion = 'SI' 
    } else {
        veterinaria.internacion = 'NO'
    }

  this.veterinariaService.crearVeterinaria(veterinaria)
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

public modificar(veterinaria): void {
  if(this.checked === true){
    veterinaria.internacion = 'SI' 
    this.checked = true;
} else {
    veterinaria.internacion = 'NO'
    this.checked = false;
}

  this.veterinariaService.modificarVeterinaria(veterinaria)
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
