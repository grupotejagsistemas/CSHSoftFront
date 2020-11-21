import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import swal from 'sweetalert2';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo: string = "Iniciar Sesion";
  usuario: Usuario;

  constructor(private authService: AuthService, private router: Router) {
    this.usuario = new Usuario();
   }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/']);
    }
  }

  login(): void{
    if(this.usuario.username == null || this.usuario.password == null){
      swal.fire('Error', 'Usuario o contraseña vacías', 'error');
      return;
    }

    this.authService.login(this.usuario).subscribe(response => {

      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token)
      this.router.navigate(['/'])
    }, err => {
      if(err.status == 400){
        swal.fire('Error', "Usuario o contraseña incorrectas", 'error');
      }
   })
  }
}
