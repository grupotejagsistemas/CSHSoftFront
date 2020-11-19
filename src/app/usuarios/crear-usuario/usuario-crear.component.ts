import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuditoriaService } from 'src/app/auditoria/auditoria.service';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import { UsuarioService } from '../usuario.service';
import { FormArray, FormBuilder, MinLengthValidator, PatternValidator, Validators } from '@angular/forms';
import { ValidadoresService } from 'src/app/services/validadores.service';

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
    private formBuilder: FormBuilder,
    private validadores: ValidadoresService,
    private auditoriaService: AuditoriaService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }
  get nombreUsuarioNoValido(){
    return this.usuarioObj.get('nombreUsuario').invalid && this.usuarioObj.get('nombreUsuario').touched
  }
  get activoNoValido(){
    return this.usuarioObj.get('activo').invalid && this.usuarioObj.get('activo').touched
  }
  get nombreNoValido(){
    return this.usuarioObj.get('nombre').invalid && this.usuarioObj.get('nombre').touched
  }
  get apellidoNoValido(){
    return this.usuarioObj.get('apellido').invalid && this.usuarioObj.get('apellido').touched
  }
  get emailNoValido(){
    return this.usuarioObj.get('email').invalid && this.usuarioObj.get('email').touched
  }
  get idRoleNoValido(){
    return this.usuarioObj.get('idRole').invalid && this.usuarioObj.get('idRole').touched
  }
  get contrasenaNoValido(){
    return this.usuarioObj.get('contrasena').invalid && this.usuarioObj.get('contrasena').touched
  }
  get confirmacionNoValido(){
    const contrasena = this.usuarioObj.get('contrasena').value;
    const confirmacion = this.usuarioObj.get('confirmacion').value;

    return (contrasena === confirmacion) ? false : true;
  }

  usuarioObj = this.formBuilder.group({
    id: [null],
    nombreUsuario: ["",Validators.required],
    contrasena: ["",[Validators.required, Validators.minLength(8),Validators.pattern('^(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
    confirmacion: ["",Validators.required,Validators.minLength(8)],
    activo: [null,Validators.required],
    nombre: ["",Validators.required],
    apellido: ["",Validators.required],
    email: ["",[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    idRole:[null,Validators.required]
  },{
    validators: this.validadores.contrasenasIguales('contrasena','confirmacion')
  })




  auditoriaAgregarObj = {
    usuario: this.authService.usuario.username,
    accion: `Alta de usuario`
  }

  
  auditoriaAgregar() {
    this.auditoriaService.crearAuditoria(this.auditoriaAgregarObj).subscribe(response => {
      return response;
    })
  }
  


  public submit(): void{

    console.log(this.usuarioObj);  
     if (this.usuarioObj.invalid)
     return  Object.values(this.usuarioObj.controls).forEach(control => {
        control.markAsTouched();
     })
    this.usuarioService.crearUsuario(this.usuarioObj.value)
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
