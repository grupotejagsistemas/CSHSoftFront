import { Component, OnInit } from '@angular/core';
import { Mascota } from './mascota';
import {EstadoMascota } from './estadoMascota';
import { MascotaService } from './mascota.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-mascotas',
  templateUrl: './form-mascotas.component.html',
  styleUrls: ['./form-mascotas.component.css']
})
export class FormMascotasComponent implements OnInit {


  mascota: Mascota;
  estados: EstadoMascota[];
  titulo: string = 'Nueva Mascota'


  constructor(
    private mascotaService: MascotaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    this.mascota = Mascota.build();

    this.mascotaService.getMascota(id).subscribe((resp: any) => {
      this.mascota = resp;
      console.log('id', this.mascota.id)
    })

    this.mascotaService.getEstados()
    .subscribe((resp: any) => {
        this.estados = resp;
        console.log('estados', this.estados);

    })
}

mascotaPost = {
  nombre : "",
  fechaNacimiento : new Date(),
  particularidadesFisicas : "",
  sexo: "",
  fotoMascota: "",
  fechaRescate: new Date(),
  lugarRescate: "",
  descripcionRescate: "",
  especie: "",
  estado:0
};

  public agregar(): void {
    console.log(' agregar mascota', this.mascotaPost);
    this.mascotaService.crearMascota(this.mascotaPost)
    .subscribe(
    response => {
        this.router.navigate(['/mascotas'])
        return response;
    })
}

public modificar(mascota): void{
  console.log('modificar mascota', mascota);
  this.mascotaService.modificarMascota(mascota)
  .subscribe(
    response => {
      this.router.navigate(['/mascotas'])
      return response;
    }
  )
}

}
