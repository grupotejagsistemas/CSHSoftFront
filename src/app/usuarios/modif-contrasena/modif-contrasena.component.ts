import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuditoriaService } from 'src/app/auditoria/auditoria.service';
import swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-modif-contrasena',
  templateUrl: './modif-contrasena.component.html',
  styleUrls: ['./modif-contrasena.component.css']
})
export class ModifContrasenaComponent implements OnInit {

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  usuarioObj = {
    username: this.authService.usuario.username,
    oldPass: "",
    newPass: ""
  }


  public modificar(): void {

    console.log('ts', this.usuarioObj);
    this.usuarioService.modificarContrasena(this.usuarioObj)
    .subscribe((response: any) => {
      this.router.navigate(['/'])
      swal.fire({
        icon: 'success',
        title: "Se modificó la contraseña exitosamente",
        showConfirmButton: false, 
        timer: 1500
      })
      return response;
    })
  }

}
