import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuditoriaService } from '../auditoria/auditoria.service';
import { AuthService } from '../usuarios/auth.service';
import { FichaMedica } from './ficha-medica';
import { FichaMedicaService } from './ficha-medica.service';

@Component({
  selector: 'app-fichas-medicas',
  templateUrl: './fichas-medicas.component.html',
  styleUrls: ['./fichas-medicas.component.css']
})
export class FichasMedicasComponent implements OnInit {
  

  fichasMedicas: FichaMedica[] = [];
  p: number = 1;

  constructor(
    public fichaMedicaService: FichaMedicaService,
    private auditoriaService: AuditoriaService,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.fichaMedicaService.getFichasMedicas().subscribe((data: any) => {
      this.fichasMedicas = data; 
    })
  }

  auditoriaBorrarObj = {
    usuario: this.authService.usuario.username,
    accion: `Eliminación de ficha médica`
  }
  

  
  auditoriaBorrar() {
    this.auditoriaService.crearAuditoria(this.auditoriaBorrarObj).subscribe(response => {
      return response;
    })
  }
  


  borrarFichasMedicas(id: number): void {
    Swal.fire({
      title: '',
      text: `¿Desea eliminar la ficha médica?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'Cancelar',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.value) {
          this.auditoriaBorrar();
          this.fichaMedicaService.borrarFichasMedicas(id).subscribe(
            () => {
              this.fichasMedicas = this.fichasMedicas.filter(fic => fic.id !== id);

            }
          )
      }
    })
  }

  exportProductsPdf(id: number, nombre:string){
    this.fichaMedicaService.exportPdfProducts(id).subscribe(x => {
      const blob = new Blob([x], {type: 'application/pdf'});
      
      if(window.navigator && window.navigator.msSaveOrOpenBlob){
        window.navigator.msSaveOrOpenBlob(blob);
        return;
      }
      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data;
      link.download = nombre + " " + 'ficha-medica.pdf';
      link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));

      setTimeout(function() {
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100)
    });

  }
}
