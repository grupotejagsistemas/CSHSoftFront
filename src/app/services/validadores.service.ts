import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }


  contrasenasIguales(contrasena: string, confirmacion: string){

    return (formGroup: FormGroup) =>{
      const contrasenaControl = formGroup.controls[contrasena];
      const confirmacionControl = formGroup.controls[confirmacion];

      if(contrasenaControl.value === confirmacionControl.value){
        confirmacionControl.setErrors(null);
      }  else{
            confirmacionControl.setErrors({noEsIgual:true})
          }
        }
      }
    }

