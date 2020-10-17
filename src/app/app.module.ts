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
import { ContratosComponent } from './contratos/contratos.component';
import { FormContratoComponent } from './contratos/form-contrato.component';
import { AdoptantesComponent } from './adoptantes/adoptantes.component';
import { FormAdoptanteComponent } from './adoptantes/form-adoptante.component';
import {FichasMedicasComponent} from './fichas-medicas/fichas-medicas.component';
import { FormFichaMedicaComponent } from './fichas-medicas/form-ficha-medica.component';
import { MascotasComponent } from './mascotas/mascotas.component';
import { FormMascotasComponent } from './mascotas/form-mascotas.component';
import { MovimientosRecursosComponent } from './movimientos-recursos/movimientos-recursos.component';
import { FormMovRecursoComponent } from './movimientos-recursos/form-mov-recurso.component';
import { MovimientosMonetariosComponent } from './movimientos-monetarios/movimientos-monetarios.component';
import { FormMovMonetarioComponent } from './movimientos-monetarios/form-mov-monetario.component';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: 'voluntarios', component: VoluntariosComponent},
  {path: 'voluntarios/crear', component: FormCrearComponent},
  {path: 'voluntarios/editar/:id', component: FormCrearComponent},
  {path: 'fichas-medicas', component: FichasMedicasComponent},
  {path: 'fichas-medicas/crear', component: FormFichaMedicaComponent},
  {path: 'fichas-medicas/editar/:id', component: FormFichaMedicaComponent},
  {path: 'mascotas', component: MascotasComponent},
  {path: 'mascotas/crear', component: FormMascotasComponent},
  {path: 'mascotas/editar/:id', component: FormMascotasComponent},
  {path: 'veterinarias', component: VeterinariasComponent},
  {path: 'veterinarias/crear',component: FormVeterinariaComponent },
  {path: 'veterinarias/editar/:id', component: FormVeterinariaComponent },
  {path: 'contratos', component: ContratosComponent},
  {path: 'contratos/crear', component: FormContratoComponent},
  {path: 'contratos/editar/id', component: FormContratoComponent},
  {path: 'adoptantes', component: AdoptantesComponent},
  {path: 'adoptantes/crear', component: FormAdoptanteComponent},
  {path: 'adoptantes/editar/:id', component: FormAdoptanteComponent},
  {path: 'movimientos-recursos', component: MovimientosRecursosComponent},
  {path: 'movimientos-recursos/crear', component: FormMovRecursoComponent},
  {path: 'movimientos-monetarios', component: MovimientosMonetariosComponent},
  {path: 'movimientos-monetarios/crear', component: FormMovMonetarioComponent}
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
    ContratosComponent,
    FormContratoComponent,
    AdoptantesComponent,
    FormAdoptanteComponent,
    FormFichaMedicaComponent,
    FichasMedicasComponent,
    MascotasComponent,
    FormMascotasComponent,
    MovimientosRecursosComponent,
    FormMovRecursoComponent,
    MovimientosMonetariosComponent,
    FormMovMonetarioComponent,
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
