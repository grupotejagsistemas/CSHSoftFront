import { Component, OnInit } from '@angular/core';
import { Veterinaria } from './veterinaria';
import { VeterinariaService }from './veterinaria.service';
import swal from 'sweetalert2';
import { AuditoriaService } from '../auditoria/auditoria.service';
import { AuthService } from '../usuarios/auth.service';


@Component({
  selector: 'app-veterinarias',
  templateUrl: './veterinarias.component.html',
})
export class VeterinariasComponent implements OnInit {


  veterinarias : Veterinaria[];
  busquedaRazonSocial: string;
  checked: boolean; 
  checkedNo: boolean;
  p: number = 1;

  constructor(
    private veterinariaService: VeterinariaService,
    private auditoriaService: AuditoriaService,
    private authService: AuthService
    ) { }

  ngOnInit(): void {

    this.veterinariaService.getVeterinarias().subscribe((data: any) => {
      this.veterinarias = data;

    });

  }

  filtroRazonSocial(razonSocial: string): void{
    this.veterinariaService.getVeterinariasRazonSocial(razonSocial).subscribe((data: any) => {
      this.veterinarias = data;
      
    })
  }

  filtroInternacion(): void {
    if(this.checked === true){
      this.veterinariaService.filtrarInternacion("si").subscribe((data: any) => {
        this.veterinarias = data;
        this.checkedNo = false;
      })
    } else {
      this.veterinariaService.getVeterinarias().subscribe((data: any) => {
      this.veterinarias = data;
    })
    }
  }

  filtroNoInternacion(): void {
    if(this.checkedNo === true){
      this.veterinariaService.filtrarNoInternacion("no").subscribe((data: any) => {
        this.veterinarias = data;
        this.checked = false;
      })
    } else {
      this.veterinariaService.getVeterinarias().subscribe((data: any) => {
        this.veterinarias = data;
      })
    }
  }


  borrarAuditoriaObj = {
    usuario: this.authService.usuario.username,
    accion: 'Eliminación de veterinaria'
  }

  borrarAuditoria() {
    this.auditoriaService.crearAuditoria(this.borrarAuditoriaObj)
    .subscribe(response => {
      return response;
    })
  }
  
  
  borrarVeterinaria(id: number, veterinaria: string): void {
    console.log('vet', id)
      swal.fire({
        text: `¿Desea eliminar la veterinaria ${veterinaria}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: 'Cancelar',
        confirmButtonText: 'Confirmar'
      }).then((result) => {
        if (result.value) {
          this.borrarAuditoria();
          this.veterinariaService.borrarVeterinaria(id).subscribe(
            () => {
              this.veterinarias = this.veterinarias.filter(vet => vet.id !== id);
            }
          )

        }
      })
  }
}
