import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuditoriaService } from '../auditoria/auditoria.service';
import { AuthService } from '../usuarios/auth.service';
import { Mascota } from './mascota';
import { MascotaService } from './mascota.service';
import { ImagenService } from '../shared/imagen.service';

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.css']
})
export class MascotasComponent implements OnInit {

  imageList : any[];
  rowIndexArray: any[];

  busquedaNombre: string;
  mascotas: Mascota[];
  checkedM: boolean;
  checkedH: boolean;
  p: number = 1;

  constructor(
    public mascotaService: MascotaService,
    private auditoriaService: AuditoriaService,
    private authService: AuthService,
    private service: ImagenService
    
    ) { }

  ngOnInit(): void {
    this.service.getImageDetailList();
    this.mascotaService.getMascotas().subscribe((data: any) => {
      this.mascotas = data;
    })
    // this.service.imageDetailList.snapshotChanges().subscribe(
    //   list => {
    //     this.imageList = list.map(item => { return item.payload.val(); });
    //     this.rowIndexArray = Array.from(Array(Math.ceil(this.imageList.length / 3)).keys());
    // }
    // );
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
