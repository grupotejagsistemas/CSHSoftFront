import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mascota } from '../mascota';
import { Veterinaria } from '../veterinaria';
import { FichaMedica } from '../ficha-medica';
import { FichaMedicaService } from '../ficha-medica.service';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import swal from 'sweetalert2'
import { AuditoriaService } from '../../auditoria/auditoria.service';
import { AuthService } from '../../usuarios/auth.service';

@Component({
  selector: 'app-editar-fichas-medicas',
  templateUrl: './editar-fichas-medicas.component.html',
  styleUrls: ['./editar-fichas-medicas.component.css']
})
export class EditarFichasMedicasComponent implements OnInit {

  
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
      
      if(id !== 0) {
        this.fichasMedicasService.getFichaMedica(id).subscribe((resp: any) => { 
        this.editarFichaMedicaObj = resp;
        
        if(this.editarFichaMedicaObj.value.desparasitacion === "SI"){
          this.checkedDesparasitacion = true;
        } else {
          this.checkedDesparasitacion = false;
        }

        if(this.editarFichaMedicaObj.value.vacuna === "SI"){
          this.checkedVacuna = true;
        } else {
          this.checkedVacuna = false;
        }

        if(this.editarFichaMedicaObj.value.tratamiento === "SI"){
          this.checkedTratamiento = true; 
        }else {
          this.checkedTratamiento = false;
        }

      })
  }
  this.fichasMedicasService.getMascotas().subscribe((resp: any) => {
    this.mascotas = resp; 
    this.mascotas.unshift({
      nombre: 'Seleccione una mascota',
      id: null
    })
  });

  this.fichasMedicasService.getVeterinarias().subscribe((resp: any) => {
    this.veterinarias = resp;
    this.veterinarias.unshift({
      razonSocial: 'Seleccione una veterinaria',
      id: null
    })
  })

}

get fechaNoValido(){
  return this.editarFichaMedicaObj.get('fecha').invalid && this.editarFichaMedicaObj.get('fecha').touched
}
get idMascotaNoValido(){
  return this.editarFichaMedicaObj.get('idMascota').invalid && this.editarFichaMedicaObj.get('idMascota').touched
}
get idVeterinariaNoValido(){
  return this.editarFichaMedicaObj.get('idVeterinaria').invalid && this.editarFichaMedicaObj.get('idVeterinaria').touched
}

editarFichaMedicaObj = this.formBuilder.group({
  id: null, 
  fecha: ["",Validators.required],
  desparasitacion: "",
  nombreProducto: "",
  vacuna: "", 
  nombreVacuna: "", 
  diagnostico: "", 
  idMascota: [null,Validators.required],
  idVeterinaria: [null,Validators.required],
  tratamiento: "",
  descripcionTratamiento: ""
})

submit(): void{
  const id = +this.route.snapshot.paramMap.get('id');

  console.log(this.editarFichaMedicaObj);  
   if (this.editarFichaMedicaObj.invalid)
   return  Object.values(this.editarFichaMedicaObj.controls).forEach(control => {
      control.markAsTouched();
   })
}

auditoriaModificarObj = {
  usuario: this.authService.usuario.username,
  accion: 'Modificación de ficha médica'
}


auditoriaModificar(){
  this.auditoriaService.crearAuditoria(this.auditoriaModificarObj).subscribe(response => {
    return response;
  })
}
public modificar(): void {

  if(this.checkedVacuna === true){
    this.editarFichaMedicaObj.value.vacuna = "SI";
  } else {
    this.editarFichaMedicaObj.value.vacuna = "NO";
  }

  if(this.checkedDesparasitacion === true){
    this.editarFichaMedicaObj.value.desparasitacion = "SI";
  } else {
    this.editarFichaMedicaObj.value.desparasitacion = "NO";
  }

  if(this.checkedTratamiento === true) {
    this.editarFichaMedicaObj.value.tratamiento = "SI";
  }else {
    this.editarFichaMedicaObj.value.tratamiento = "NO";
  }

  this.fichasMedicasService.modificarFichaMedica(this.editarFichaMedicaObj)
  .subscribe(
    response => {
      this.router.navigate(['/fichas-medicas'])
      swal.fire({
        icon: 'success',
        title: 'La ficha médica ha sido modificada',
        showConfirmButton: false,
        timer: 1500
      })
      this.auditoriaModificar();
      return response;
    }
  )
}

}


