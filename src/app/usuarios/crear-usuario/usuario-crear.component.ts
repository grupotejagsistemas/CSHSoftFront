import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../usuario.service';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
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
    private validadores: ValidadoresService
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
    id: null,
    nombreUsuario: ["",Validators.required],
    contrasena: ["",Validators.required],
    confirmacion: ["",Validators.required],
    activo: [null,Validators.required],
    nombre: ["",Validators.required],
    apellido: ["",Validators.required],
    email: ["",Validators.required],
    idRole:[null,Validators.required]
  },{
    validators: this.validadores.contrasenasIguales('contrasena','confirmacion')
  })
  submit(): void{
    const id = +this.route.snapshot.paramMap.get('id');

    console.log(this.usuarioObj);  
     if (this.usuarioObj.invalid)
     return  Object.values(this.usuarioObj.controls).forEach(control => {
        control.markAsTouched();
     })
    }


  public agregar(): void{
    
    this.usuarioService.crearUsuario(this.usuarioObj.value)
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
