import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntrevistaAdoptante } from './entrevista-adoptante';
import { EntrevistaAdoptanteService } from './entrevista-adoptante.service';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { Adoptante } from './adoptante';


@Component({
  selector: 'app-form-entrevista-adoptante',
  templateUrl: './form-entrevista-adoptante.component.html',
  styleUrls: ['./form-entrevista-adoptante.component.css']
})
export class FormEntrevistaAdoptanteComponent implements OnInit {

  entrevista: EntrevistaAdoptante;
  adoptantes: Adoptante[];
  
  constructor(
    private entrevistaService: EntrevistaAdoptanteService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    if(id !== 0){
      this.entrevistaService.getEntrevista(id).subscribe((resp: any) => {
        this.entrevistaObj = resp;
      })
    }


    this.entrevistaService.getAdoptantes().subscribe((data: any) => {
      this.adoptantes = data;

    })

  }

  
  get respuesta1NoValido(){
    return this.entrevistaObj.get('respuesta1').invalid && this.entrevistaObj.get('respuesta1').touched
  
  }
  get respuesta2NoValido(){
    return this.entrevistaObj.get('respuesta2').invalid && this.entrevistaObj.get('respuesta2').touched
  
  }
  get respuesta3NoValido(){
    return this.entrevistaObj.get('respuesta3').invalid && this.entrevistaObj.get('respuesta3').touched
  
  }
  get respuesta4NoValido(){
    return this.entrevistaObj.get('respuesta4').invalid && this.entrevistaObj.get('respuesta4').touched
  
  }
  get respuesta5NoValido(){
    return this.entrevistaObj.get('respuesta5').invalid && this.entrevistaObj.get('respuesta5').touched
  
  }
  get respuesta6NoValido(){
    return this.entrevistaObj.get('respuesta6').invalid && this.entrevistaObj.get('respuesta6').touched
  
  }
  get respuesta7NoValido(){
    return this.entrevistaObj.get('respuesta7').invalid && this.entrevistaObj.get('respuesta7').touched
  
  }
  get respuesta8NoValido(){
    return this.entrevistaObj.get('respuesta8').invalid && this.entrevistaObj.get('respuesta8').touched
  
  }
  get respuesta9NoValido(){
    return this.entrevistaObj.get('respuesta9').invalid && this.entrevistaObj.get('respuesta9').touched
  
  }
  get respuesta10NoValido(){
    return this.entrevistaObj.get('respuesta10').invalid && this.entrevistaObj.get('respuesta10').touched
  
  }
  get respuesta11NoValido(){
    return this.entrevistaObj.get('respuesta11').invalid && this.entrevistaObj.get('respuesta11').touched
  
  }
  get respuesta12NoValido(){
    return this.entrevistaObj.get('respuesta12').invalid && this.entrevistaObj.get('respuesta12').touched
  
  }
  get respuesta13NoValido(){
    return this.entrevistaObj.get('respuesta13').invalid && this.entrevistaObj.get('respuesta13').touched
  
  }
  get respuesta14NoValido(){
    return this.entrevistaObj.get('respuesta14').invalid && this.entrevistaObj.get('respuesta14').touched
  
  }
  get respuesta15NoValido(){
    return this.entrevistaObj.get('respuesta15').invalid && this.entrevistaObj.get('respuesta15').touched
  
  }
  get respuesta16NoValido(){
    return this.entrevistaObj.get('respuesta16').invalid && this.entrevistaObj.get('respuesta16').touched
  
  }
  get respuesta17NoValido(){
    return this.entrevistaObj.get('respuesta17').invalid && this.entrevistaObj.get('respuesta17').touched
  
  }
  get respuesta18NoValido(){
    return this.entrevistaObj.get('respuesta18').invalid && this.entrevistaObj.get('respuesta18').touched
  
  }
  get respuesta19NoValido(){
    return this.entrevistaObj.get('respuesta19').invalid && this.entrevistaObj.get('respuesta19').touched
  
  }
  get respuesta20NoValido(){
    return this.entrevistaObj.get('respuesta20').invalid && this.entrevistaObj.get('respuesta20').touched
  
  }
  get respuesta21NoValido(){
    return this.entrevistaObj.get('respuesta21').invalid && this.entrevistaObj.get('respuesta21').touched
  
  }
  get respuesta22NoValido(){
    return this.entrevistaObj.get('respuesta22').invalid && this.entrevistaObj.get('respuesta22').touched
  
  }


  entrevistaObj = this.formBuilder.group({
    id: null,
    idAdoptante: ["",Validators.required],
    respuesta1: ["",Validators.required],
    respuesta2: ["",Validators.required],
    respuesta3: ["",Validators.required],
    respuesta4: ["",Validators.required],
    respuesta5: ["",Validators.required],
    respuesta6: ["",Validators.required],
    respuesta7: ["",Validators.required],
    respuesta8: ["",Validators.required],
    respuesta9: ["",Validators.required],
    respuesta10: ["",Validators.required],
    respuesta11: ["",Validators.required],
    respuesta12: ["",Validators.required],
    respuesta13: ["",Validators.required],
    respuesta14: ["",Validators.required],
    respuesta15: ["",Validators.required],
    respuesta16: ["",Validators.required],
    respuesta17: ["",Validators.required],
    respuesta18: ["",Validators.required],
    respuesta19: ["",Validators.required],
    respuesta20: ["",Validators.required],
    respuesta21: ["",Validators.required],
    respuesta22: ["",Validators.required]
  })

  submit(): void{
    const id = +this.route.snapshot.paramMap.get('id');

    console.log(this.entrevistaObj);  
     if (this.entrevistaObj.invalid)
     return  Object.values(this.entrevistaObj.controls).forEach(control => {
        control.markAsTouched();
      })
    }

  public agregar(): void {
    this.entrevistaService.crearEntrevista(this.entrevistaObj)
    .subscribe((response: any) => {
      this.router.navigate(['/entrevistas'])
      swal.fire({
        icon: 'success',
        title: 'Creación exitosa',
        showConfirmButton: false,
        timer: 1500
      })
      return response;
    })
  }

  public modificar(): void {
    this.entrevistaService.modificarEntrevista(this.entrevistaObj)
    .subscribe(
      response => {
        this.router.navigate(['/entrevistas'])
        swal.fire({
          icon: 'success',
          title: `La entrevista adoptante ha sido modificada`,
          showConfirmButton: false,
          timer: 1500
        })
        return response;
      }
    )
  }

}
