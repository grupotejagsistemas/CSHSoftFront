import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuditoriaService } from 'src/app/auditoria/auditoria.service';
import swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import { UsuarioService } from '../usuario.service';
import { FormArray, FormBuilder, MinLengthValidator, Validators } from '@angular/forms';
import { ValidadoresService } from 'src/app/services/validadores.service';

@Component({
  selector: 'app-modif-contrasena',
  templateUrl: './modif-contrasena.component.html',
  styleUrls: ['./modif-contrasena.component.css']
})
export class ModifContrasenaComponent implements OnInit {

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private validadores: ValidadoresService
  ) { }

  ngOnInit(): void {
  }

  get oldPassNoValido(){
    return this.usuarioObj.get('oldPass').invalid && this.usuarioObj.get('oldPass').touched
  }

  get newPassNoValido(){
    return this.usuarioObj.get('newPass').invalid && this.usuarioObj.get('newPass').touched
  }
  get confirmaNoValido(){
    const newPass = this.usuarioObj.get('newPass').value;
    const confirmaContraseña = this.usuarioObj.get('confirmaContraseña').value;

    return (newPass === confirmaContraseña) ? false : true;
  }
  usuarioObj = this.formBuilder.group({
    username: this.authService.usuario.username,
    oldPass: ["",Validators.required],
    newPass: ["",Validators.required],
    confirmaContraseña: ["",Validators.required]
  },{
    validators: this.validadores.contrasenasIguales('newPass','confirmaContraseña')
  })



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
