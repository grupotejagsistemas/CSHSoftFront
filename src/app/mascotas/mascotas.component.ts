import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuditoriaService } from '../auditoria/auditoria.service';
import { AuthService } from '../usuarios/auth.service';
import { Mascota } from './mascota';
import { MascotaService } from './mascota.service';

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.css']
})
export class MascotasComponent implements OnInit {

  busquedaNombre: string;
  mascotas: Mascota[];
  checkedM: boolean;
  checkedH: boolean;
  p: number = 1;

  constructor(
    public mascotaService: MascotaService,
    private auditoriaService: AuditoriaService,
    private authService: AuthService
    
    ) { }

  ngOnInit(): void {
    this.mascotaService.getMascotas().subscribe((data: any) => {
      this.mascotas = data;
    })
  }

  filtroNombre(nombre: string): void {
    console.log('nombre', nombre)

    this.mascotaService.getMascotasNombre(nombre).subscribe((data: any ) => {
      this.mascotas = data;
      console.log('mascotas', data)
     })
  }

  filtroMacho(): void {
    if(this.checkedM === true){
      this.mascotaService.filtroMascotaMacho("Macho").subscribe((data: any) => {
        this.mascotas = data;
        this.checkedH = false;
      })
    } else {
      this.mascotaService.getMascotas().subscribe((data: any) => {
        this.mascotas = data;
      })
    }
  }

  filtroHembra(): void {
    if(this.checkedH === true) {
      this.mascotaService.filtroMascotaHembra("Hembra").subscribe((data: any) => {
        this.mascotas = data;
        this.checkedM = false;
      })
    } else {
      this.mascotaService.getMascotas().subscribe((data: any) => {
        this.mascotas = data;
      })
    }
  }
  
  auditoriaBorrarObj = {
    usuario: this.authService.usuario.username,
    accion: `Eliminación de mascotas`
  }
  

  auditoriaBorrar() {
    this.auditoriaService.crearAuditoria(this.auditoriaBorrarObj).subscribe(response => {
      return response;
    })
  }
  

  borrarMascota(id: number, mascota: string): void {
    Swal.fire({
      title: '',
      text: `¿Desea eliminar al voluntario ${mascota} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'Cancelar',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.value) {
          this.auditoriaBorrar();
          this.mascotaService.borrarMascota(id).subscribe(
            () => {
              this.mascotas = this.mascotas.filter(mas => mas.id !== id)
            }
          )
      }
    })
  }


}
