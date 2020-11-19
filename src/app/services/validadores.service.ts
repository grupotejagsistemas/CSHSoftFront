import { Injectable } from '@angular/core';
import { FormGroup, Validators} from '@angular/forms';


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


      contrasenasIgualesMod(newPass: string, confirmaContraseña: string){

        return (formGroup: FormGroup) =>{
          const newPassControl = formGroup.controls[newPass];
          const confirmaContraseñaControl = formGroup.controls[confirmaContraseña];
    
          if(newPassControl.value === confirmaContraseñaControl.value){
            confirmaContraseñaControl.setErrors(null);
          }  else{
                confirmaContraseñaControl.setErrors({noEsIgual:true})
              }
            }
          }
        }
    

