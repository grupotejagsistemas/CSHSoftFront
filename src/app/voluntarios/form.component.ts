import { Component, OnInit } from '@angular/core';
import { Voluntario } from './voluntario';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  
  private voluntario: Voluntario = new Voluntario();
  private titulo: string = "Crear Voluntario"
  constructor() { }

  ngOnInit(): void {
  }

  public create(): void{
    console.log('Guardar datos')
  }

}
