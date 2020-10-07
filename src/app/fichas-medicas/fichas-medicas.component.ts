import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FichaMedica } from './ficha-medica';
import { FichaMedicaService } from './ficha-medica.service';

@Component({
  selector: 'app-fichas-medicas',
  templateUrl: './fichas-medicas.component.html',
  styleUrls: ['./fichas-medicas.component.css']
})
export class FichasMedicasComponent implements OnInit {

  fichasMedicas: FichaMedica[];
  constructor(public fichaMedicaService: FichaMedicaService) { }

  ngOnInit(): void {
    this.fichaMedicaService.getFichasMedicas().subscribe((data: any) => {
      this.fichasMedicas = data; 
    })
  }

  borrarFichasMedicas(id: number): void {
    Swal.fire({
      title: '',
      // text: `¿Desea eliminar al voluntario ${voluntarios.nombrecompleto}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'Cancelar',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.value) {
          this.fichaMedicaService.borrarFichasMedicas(id).subscribe()
      }
    })
  }
}
