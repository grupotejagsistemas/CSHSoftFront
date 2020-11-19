import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntrevistaAdoptante } from './entrevista-adoptante';
import { EntrevistaAdoptanteService } from './entrevista-adoptante.service';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-respuestas',
  templateUrl: './respuestas.component.html',
  styleUrls: ['./respuestas.component.css']
})
export class RespuestasComponent implements OnInit {

  entrevista: EntrevistaAdoptante;

  constructor(
    public entrevistaService: EntrevistaAdoptanteService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
    ) { }


  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    if(id !== 0){
      this.entrevistaService.getEntrevista(id).subscribe((resp: any) => {
        this.entrevista  = resp;
      })
    }
  }

 

  entrevistaObj = {
    id: null,
    idAdoptante: "",
    respuesta1: "",
    respuesta2: "",
    respuesta3: "",
    respuesta4: "",
    respuesta5: "",
    respuesta6: "",
    respuesta7: "",
    respuesta8: "",
    respuesta9: "",
    respuesta10: "",
    respuesta11: "",
    respuesta12: "",
    respuesta13: "",
    respuesta14: "",
    respuesta15: "",
    respuesta16: "",
    respuesta17: "",
    respuesta18: "",
    respuesta19: "",
    respuesta20: "",
    respuesta21: "",
    respuesta22: ""
  }



}
