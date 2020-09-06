import { Component, OnInit } from '@angular/core';
import { Voluntario } from './voluntario';
import { VoluntarioService }from './voluntario.service';

@Component({
  selector: 'app-voluntarios',
  templateUrl: './voluntarios.component.html',
})
export class VoluntariosComponent implements OnInit {


  voluntarios: Voluntario[];

  constructor(private voluntarioService: VoluntarioService) {

  }

  ngOnInit(): void {
    this.voluntarioService.getVoluntarios().subscribe(
      voluntarios => this.voluntarios = voluntarios
    );
  }

}
