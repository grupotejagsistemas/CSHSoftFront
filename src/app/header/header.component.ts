import { Component } from '@angular/core';
import { AuthService } from '../usuarios/auth.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent{

    title: string = 'CSH Soft'

    constructor(public authService: AuthService, private router: Router){}

    
    logout(): void {
        this.authService.usuario.username;
        this.authService.logout();
        this.router.navigate(['/login']);
      }



}