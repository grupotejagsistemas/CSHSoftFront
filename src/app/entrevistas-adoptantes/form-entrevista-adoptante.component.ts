import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntrevistaAdoptante } from './entrevista-adoptante';
import { EntrevistaAdoptanteService } from './entrevista-adoptante.service';
import swal from 'sweetalert2';
import { Adoptante } from './adoptante';
import { AuditoriaService } from '../auditoria/auditoria.service';
import { AuthService } from '../usuarios/auth.service';


@Component({
  selector: 'app-form-entrevista-adoptante',
  templateUrl: './form-entrevista-adoptante.component.html',
  styleUrls: ['./form-entrevista-adoptante.component.css']
})
export class FormEntrevistaAdoptanteComponent implements OnInit {

  entrevista: EntrevistaAdoptante;
  adoptantes: Adoptante[];
  
  constructor(
    private entrevistaService: EntrevistaAdoptanteService,
    private router: Router,
    private route: ActivatedRoute,
    private auditoriaService: AuditoriaService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    if(id !== 0){
      this.entrevistaService.getEntrevista(id).subscribe((resp: any) => {
        this.entrevistaObj = resp;
      })
    }


    this.entrevistaService.getAdoptantes().subscribe((data: any) => {
      this.adoptantes = data;

    })

  }

  entrevistaObj = {
    id: null,
    idAdoptante: "",
    respuesta1: "",
    respuesta2: "",
    respuesta3: "",
    respuesta4: "",
    respuesta5: "",
    respuesta6: "",
    respuesta7: "",
    respuesta8: "",
    respuesta9: "",
    respuesta10: "",
    respuesta11: "",
    respuesta12: "",
    respuesta13: "",
    respuesta14: "",
    respuesta15: "",
    respuesta16: "",
    respuesta17: "",
    respuesta18: "",
    respuesta19: "",
    respuesta20: "",
    respuesta21: "",
    respuesta22: ""
  }

  auditoriaAgregarObj = {
    usuario: this.authService.usuario.username,
    accion: `Alta de entrevista adoptante`
  }
  
  auditoriaModificarObj = {
    usuario: this.authService.usuario.username,
    accion: 'Modificación de entrevista adoptante'
  }
  
  auditoriaAgregar() {
    this.auditoriaService.crearAuditoria(this.auditoriaAgregarObj).subscribe(response => {
      return response;
    })
  }
  
  auditoriaModificar(){
    this.auditoriaService.crearAuditoria(this.auditoriaModificarObj).subscribe(response => {
      return response;
    })
  }

  public agregar(): void {
    this.entrevistaService.crearEntrevista(this.entrevistaObj)
    .subscribe((response: any) => {
      this.router.navigate(['/entrevistas'])
      swal.fire({
        icon: 'success',
        title: 'Creación exitosa',
        showConfirmButton: false,
        timer: 1500
      })
      this.auditoriaAgregar();
      return response;
    })
  }

  public modificar(): void {
    this.entrevistaService.modificarEntrevista(this.entrevistaObj)
    .subscribe(
      response => {
        this.router.navigate(['/entrevistas'])
        swal.fire({
          icon: 'success',
          title: `La entrevista adoptante ha sido modificada`,
          showConfirmButton: false,
          timer: 1500
        })
        this.auditoriaModificar();
        return response;
      }
    )
  }

}
