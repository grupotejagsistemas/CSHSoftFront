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

  constructor(
    private veterinariaService: VeterinariaService, 
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
  const id = +this.route.snapshot.paramMap.get('id');

  this.veterinaria = Veterinaria.build();
  this.veterinariaService.getVeterinaria(id).subscribe((resp: any) => {
    this.veterinaria = resp;
    console.log('id' , this.veterinaria.id);
    console.log('se modifica', this.veterinaria)
  })
}


public agregar(veterinaria): void {
  console.log('veterinaria', veterinaria);
  this.veterinariaService.crearVeterinaria(veterinaria)
  .subscribe(
    response => {
      this.router.navigate(['/veterinarias'])
      return response;
    })
}

public modificar(veterinaria): void {
  console.log('vol', veterinaria)
  this.veterinariaService.modificarVeterinaria(veterinaria)
  .subscribe(
    response =>{
      this.router.navigate(['/veterinarias'])
      swal.fire({
        icon: 'success',
        title: 'Modificación exitosa',
        showConfirmButton: false,
        timer: 1500
      })
      
      return response;
    }
  )
}
}
