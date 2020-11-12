import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from './usuario';
import { UsuarioService } from '../usuario.service';
import swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import { AuditoriaService } from 'src/app/auditoria/auditoria.service';


@Component({
  selector: 'app-modif-tipo-usuario',
  templateUrl: './modif-tipo-usuario.component.html',
  styleUrls: ['./modif-tipo-usuario.component.css']
})
export class ModifTipoUsuarioComponent implements OnInit {

//  usuario: Usuario[] = [];

  constructor(
    public usuarioService: UsuarioService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
     private auditoriaService: AuditoriaService,
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    if(id !== 0){
      this.usuarioService.getUsuario(id).subscribe((resp: any) => {
        this.usuarioObj = resp;
      })
    }
  }
  
usuarioObj = { 
  username: "",
  idRole: null,
}


auditoriaModificarObj = {
  usuario: this.authService.usuario.username,
  accion: 'Modificación de tipo de usuario'
}


auditoriaModificar(){
  this.auditoriaService.crearAuditoria(this.auditoriaModificarObj).subscribe(response => {
    return response;
  })
}


  public modificar(): void {
    this.usuarioService.modificarTipoUsuario(this.usuarioObj)
    .subscribe(
      response =>{
        this.router.navigate(['/modificacion-tipo-usuario'])
        swal.fire({
          icon: 'success',
          title: 'El tipo de usuario ha sido modificado',
          showConfirmButton: true,
          timer: 1500
        })
        this.auditoriaModificar();
        return response;
      }
    )
  }
}
