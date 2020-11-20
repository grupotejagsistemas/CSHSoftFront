import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mascota } from './mascota';
import { Veterinaria } from './veterinaria';
import { FichaMedica } from './ficha-medica';
import { FichaMedicaService } from './ficha-medica.service';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import swal from 'sweetalert2'
import { AuditoriaService } from '../auditoria/auditoria.service';
import { AuthService } from '../usuarios/auth.service';

@Component({
  selector: 'app-form-ficha-medica',
  templateUrl: './form-ficha-medica.component.html',
  styleUrls: ['./form-ficha-medica.component.css']
})
export class FormFichaMedicaComponent implements OnInit {

  checkedVacuna: boolean;
  checkedTratamiento: boolean;
  checkedDesparasitacion: boolean;
  mascotas: Mascota[];
  veterinarias: Veterinaria[];
  fichaMedica: FichaMedica;
  disabledDesparasitacion: boolean  = false;

  
  constructor(
    private fichasMedicasService: FichaMedicaService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private auditoriaService: AuditoriaService,
    private authService: AuthService
  ) { }

    ngOnInit(): void {

      const id = +this.route.snapshot.paramMap.get('id');

      this.fichaMedica = FichaMedica.build();
      
    
    this.fichasMedicasService.getMascotas().subscribe((resp: any) => {
      this.mascotas = resp; 
 
    });

    this.fichasMedicasService.getVeterinarias().subscribe((resp: any) => {
      this.veterinarias = resp;

    })

  }
  get diagnosticoNoValido(){
    return this.fichaMedicaObj.get('diagnostico').invalid && this.fichaMedicaObj.get('diagnostico').touched
  }

  get fechaNoValido(){
    return this.fichaMedicaObj.get('fecha').invalid && this.fichaMedicaObj.get('fecha').touched
  }
  get idMascotaNoValido(){
    return this.fichaMedicaObj.get('idMascota').invalid && this.fichaMedicaObj.get('idMascota').touched
  }
  get idVeterinariaNoValido(){
    return this.fichaMedicaObj.get('idVeterinaria').invalid && this.fichaMedicaObj.get('idVeterinaria').touched
  }

  fichaMedicaObj = this.formBuilder.group({
    id: [null], 
    fecha: ["",Validators.required],
    desparasitacion: [""],
    nombreProducto: [""],
    vacuna: [""], 
    nombreVacuna: [""], 
    diagnostico: ["",Validators.required],
    idMascota: [null,Validators.required],
    idVeterinaria: [null,Validators.required],
    tratamiento: [""],
    descripcionTratamiento: [""]
  })



  auditoriaAgregarObj = {
    usuario: this.authService.usuario.username,
    accion: `Alta de ficha médica`
  }
  

  auditoriaAgregar() {
    this.auditoriaService.crearAuditoria(this.auditoriaAgregarObj).subscribe(response => {
      return response;
    })
  }
  



  public submit(): void {

    const id = +this.route.snapshot.paramMap.get('id');

    console.log(this.fichaMedicaObj);  
     if (this.fichaMedicaObj.invalid)
     return  Object.values(this.fichaMedicaObj.controls).forEach(control => {
        control.markAsTouched();
     })

    if(this.checkedVacuna === true){
      this.fichaMedicaObj.value.vacuna = "SI";
    } else {
      this.fichaMedicaObj.value.vacuna = "NO";
    }

    if(this.checkedDesparasitacion === true){
      this.fichaMedicaObj.value.desparasitacion = "SI";
    } else {
      this.fichaMedicaObj.value.desparasitacion = "NO";
    }

    if(this.checkedTratamiento === true) {
      this.fichaMedicaObj.value.tratamiento = "SI";
    }else {
      this.fichaMedicaObj.value.tratamiento = "NO";
    }

    console.log('this.fichaMedica', this.fichaMedicaObj.value)
    this.fichasMedicasService.crearFichaMedica(this.fichaMedicaObj.value)
    .subscribe(
      response => {
        this.router.navigate(['/fichas-medicas'])
        swal.fire({
          icon: 'success',
          title: 'Creación exitosa',
          showConfirmButton: false,
          timer: 1500
        })
        this.auditoriaAgregar();
        return response;
      }
    )
  }

 
  
}
