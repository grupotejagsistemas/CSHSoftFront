import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuditoriaService } from 'src/app/auditoria/auditoria.service';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-baja-usuario',
  templateUrl: './baja-usuario.component.html',
  styleUrls: ['./baja-usuario.component.css']
})
export class BajaUsuarioComponent implements OnInit {

  usuarios: Usuario[];
  p: number = 1;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private auditoriaService: AuditoriaService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe((data: any) => {
      this.usuarios = data;
    })
  }

  auditoriaBorrarObj = {
    usuario: this.authService.usuario.username,
    accion: `Alta de historial`
  }
  

  auditoriaBorrar() {
    this.auditoriaService.crearAuditoria(this.auditoriaBorrarObj).subscribe(response => {
      return response;
    })
  }
  
 

  borrarUsuario(id: number, usuario: string):  void {
    Swal.fire({
      title: '',
      text: `¿Desea eliminar al usuario ${usuario} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'Cancelar',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.value) {
          this.auditoriaBorrar();
          this.usuarioService.eliminarUsuario(id).subscribe(
            () => {
              this.usuarios = this.usuarios.filter(usu => usu.id !== id)
            }
          )
      }
    })
  }
}
