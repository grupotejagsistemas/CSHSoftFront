import { Component, OnInit } from '@angular/core';
import {FichaMedica} from './ficha-medica';
import {FichaMedicaService} from './ficha-medica.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-ficha-medica',
  templateUrl: './ficha-medica.component.html',
  styleUrls: ['./ficha-medica.component.css']
})
export class FichaMedicaComponent implements OnInit {

  fichasMedicas: FichaMedica[];

  constructor(private fichaMedicaService: FichaMedicaService) { }

  ngOnInit(): void {
    this.fichaMedicaService.getFichasMedicas().subscribe(
      fichasMedicas => this.fichasMedicas = fichasMedicas
    );
  }

  delete(fichaMedica: FichaMedica): void {
    swal.fire({
    title: '',
    text: `¿Desea eliminar la ficha médica?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: 'Cancelar',
    confirmButtonText: 'Confirmar'
  }).then((result) => {
    if (result.value) {

      console.log('se elimino: ', fichaMedica)
      this.fichaMedicaService.delete(fichaMedica.id).subscribe(
        response => {
          this.fichasMedicas = this.fichasMedicas.filter(ficha => ficha !== fichaMedica)
          swal.fire(
            'Eliminado!',
            '',
            'success',
            )
          }
      )
    }
  })
}

}
