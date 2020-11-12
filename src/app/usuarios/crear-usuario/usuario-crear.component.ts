import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuditoriaService } from 'src/app/auditoria/auditoria.service';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuario-crear',
  templateUrl: './usuario-crear.component.html',
  styleUrls: ['./usuario-crear.component.css']
})
export class UsuarioCrearComponent implements OnInit {


  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private auditoriaService: AuditoriaService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }


  usuarioObj = {
    id: null, 
    nombreUsuario: "",
    contrasena: "",
    activo: null,
    nombre: "",
    apellido: "",
    email: "",
    idRole: null
  } 

  auditoriaAgregarObj = {
    usuario: this.authService.usuario.username,
    accion: `Alta de usuario`
  }

  
  auditoriaAgregar() {
    this.auditoriaService.crearAuditoria(this.auditoriaAgregarObj).subscribe(response => {
      return response;
    })
  }
  


  public agregar(): void{
    
    this.usuarioService.crearUsuario(this.usuarioObj)
    .subscribe((response: any) => {
      this.router.navigate(['/'])
      Swal.fire({
        icon:'success',
        title: "Creación exitosa",
        showConfirmButton: false,
        timer: 1500
      })
      this.auditoriaAgregar();
      return response;
    })
  }
}
