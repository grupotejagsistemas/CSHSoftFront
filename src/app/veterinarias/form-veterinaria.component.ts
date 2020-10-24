import { Component, OnInit } from '@angular/core';
import { Veterinaria } from './veterinaria';
import { VeterinariaService } from './veterinaria.service';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2'


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
        showCancelButton:true,
        showConfirmButton: true,
        cancelButtonColor: 'Cancelar',
        confirmButtonText: 'Confirmar',
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
        confirmButtonText: 'Confirmar',
        timer: 1500
      })
      
      return response;
    }
  )
}



}
