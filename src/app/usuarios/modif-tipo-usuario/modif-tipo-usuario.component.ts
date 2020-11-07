import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from './usuario';
import { UsuarioService } from '../usuario.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-modif-tipo-usuario',
  templateUrl: './modif-tipo-usuario.component.html',
  styleUrls: ['./modif-tipo-usuario.component.css']
})
export class ModifTipoUsuarioComponent implements OnInit {

//  usuario: Usuario[] = [];

  constructor(
    public usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
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
        
        return response;
      }
    )
  }
}
