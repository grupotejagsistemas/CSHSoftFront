import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HeaderComponent} from './header/header.component'
import {FooterComponent} from './footer/footer.component';
import { VoluntariosComponent } from './voluntarios/voluntarios.component';
import {VoluntarioService} from './voluntarios/voluntario.service';
import {RouterModule, Routes} from '@angular/router';
import  {FormsModule} from '@angular/forms';
import { FormCrearComponent } from './voluntarios/form-crear.component';
import {HttpClientModule} from '@angular/common/http';
import { VeterinariasComponent } from './veterinarias/veterinarias.component';
import {FormVeterinariaComponent} from './veterinarias/form-veterinaria.component';
import { MascotasComponent } from './mascotas/mascotas.component';
import { FormMascotaComponent } from './mascotas/form-mascota.component';
import { AdoptantesComponent } from './adoptantes/adoptantes.component';
import { FormAdoptanteComponent } from './adoptantes/form-adoptante.component';
import {FichasMedicasComponent} from './fichas-medicas/fichas-medicas.component'
import { FormFichaMedicaComponent } from './fichas-medicas/form-ficha-medica.component';
import { BusquedaNombrePipe } from './voluntarios/pipes/busqueda-nombre.pipe';
import { BusquedaTransitoPipe } from './voluntarios/pipes/busqueda-transito.pipe';
import { BusquedaPresencialPipe } from './voluntarios/pipes/busqueda-presencial.pipe';
import { BusquedaTrasladoPipe } from './voluntarios/pipes/busqueda-traslado.pipe';


const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: 'voluntarios', component: VoluntariosComponent},
  {path: 'voluntarios/crear', component: FormCrearComponent},
  {path: 'voluntarios/editar/:id', component: FormCrearComponent},
  {path: 'fichas-medicas', component: FichasMedicasComponent},
  {path: 'fichas-medicas/crear', component: FormFichaMedicaComponent},
  {path: 'fichas-medicas/editar/:id', component: FormFichaMedicaComponent},
  {path: 'veterinarias', component: VeterinariasComponent},
  {path: 'veterinarias/crear',component: FormVeterinariaComponent },
  {path: 'veterinarias/editar/:id', component: FormVeterinariaComponent },
  {path: 'mascotas', component: MascotasComponent},
  {path: 'mascotas/crear',component: FormMascotaComponent },
  {path: 'mascotas/editar/:id', component: FormMascotaComponent },
  {path: 'adoptantes', component: AdoptantesComponent},
  {path: 'adoptantes/crear', component: FormAdoptanteComponent},
  {path: 'adoptantes/editar/:id', component: FormAdoptanteComponent}

]
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    VoluntariosComponent,
    FormCrearComponent,
    VeterinariasComponent,
    FormVeterinariaComponent,
    MascotasComponent,
    FormMascotaComponent,
    AdoptantesComponent,
    FormAdoptanteComponent,
    FormFichaMedicaComponent
    //BusquedaNombrePipe,
    //BusquedaTransitoPipe,
    //BusquedaPresencialPipe,
    //BusquedaTrasladoPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [VoluntarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
