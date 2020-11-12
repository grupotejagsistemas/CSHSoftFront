import { Component, OnInit } from '@angular/core';
import { Veterinaria } from './veterinaria';
import { VeterinariaService } from './veterinaria.service';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2'
import { FormArray, FormBuilder, Validators } from '@angular/forms';



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
  return this.veterinariaObj.get('razonSocial').invalid && this.veterinariaObj.get('razonSocial').touched
}
get horarioAtencionNoValido(){
  return this.veterinariaObj.get('horarioAtencion').invalid && this.veterinariaObj.get('horarioAtencion').touched
}
get direccionNoValido(){
  return this.veterinariaObj.get('direccion').invalid && this.veterinariaObj.get('direccion').touched
}

veterinariaObj = this.formBuilder.group({
  id: null,
  razonSocial: ["",Validators.required],
  horarioAtencion: [null,Validators.required],
  direccion: ["",Validators.required],
  observacion: "",
})

submit(): void{
  const id = +this.route.snapshot.paramMap.get('id');

  console.log(this.veterinariaObj);  
   if (this.veterinariaObj.invalid)
   return  Object.values(this.veterinariaObj.controls).forEach(control => {
      control.markAsTouched();
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
      swal.fire({
        icon: 'success',
        title: 'Creación exitosa',
      }).then((result) => {
        if(result.value){
          this.router.navigate(['/veterinarias'])
          return response;
        }
      })
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
      
      return response;
    }
  )
}



}
