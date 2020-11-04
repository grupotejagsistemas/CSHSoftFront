import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
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
    private route: ActivatedRoute
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

      return response;
    })
  }
}
