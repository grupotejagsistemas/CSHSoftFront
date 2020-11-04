import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-baja-usuario',
  templateUrl: './baja-usuario.component.html',
  styleUrls: ['./baja-usuario.component.css']
})
export class BajaUsuarioComponent implements OnInit {

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {

  }

  

}
