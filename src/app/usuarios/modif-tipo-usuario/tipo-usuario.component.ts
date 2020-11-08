import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-tipo-usuario',
  templateUrl: './tipo-usuario.component.html',
  styleUrls: ['./tipo-usuario.component.css']
})
export class TipoUsuarioComponent implements OnInit {

  usuarios: Usuario[];
  p: number = 1;
  
  constructor(
    private usuarioService: UsuarioService,

  ) { }

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe((data: any) => {
      this.usuarios = data;
    })
  }

  
}
