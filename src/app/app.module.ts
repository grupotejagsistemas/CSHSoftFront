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
import { FichaMedicaComponent } from './ficha-medica/ficha-medica.component';
import { FormComponent } from './ficha-medica/form.component';
import { VeterinariasComponent } from './veterinarias/veterinarias.component';
import {FormVeterinariaComponent} from './veterinarias/form-veterinaria.component';
import { MascotasComponent } from './mascotas/mascotas.component';
import { FormMascotaComponent } from './mascotas/form-mascota.component';
import { ContratosComponent } from './contratos/contratos.component';
import { FormContratoComponent } from './contratos/form-contrato.component';


const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: 'voluntarios', component: VoluntariosComponent},
  {path: 'voluntarios/crear', component: FormCrearComponent},
  {path: 'voluntarios/editar/:id', component: FormCrearComponent},
  {path: 'fichas-medicas', component: FichaMedicaComponent},
  {path: 'fichas-medicas/crear', component: FormComponent},
  {path: 'fichas-medicas/editar/:id', component: FormComponent},
  {path: 'veterinarias', component: VeterinariasComponent},
  {path: 'veterinarias/crear',component: FormVeterinariaComponent },
  {path: 'veterinarias/editar/:id', component: FormVeterinariaComponent },
  {path: 'mascotas', component: MascotasComponent},
  {path: 'mascotas/crear',component: FormMascotaComponent },
  {path: 'mascotas/editar/:id', component: FormMascotaComponent },
  {path: 'contratos', component: ContratosComponent},
  {path: 'contratos/crear', component: FormContratoComponent},
  {path: 'contratos/editar/id', component: FormContratoComponent}

]
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    VoluntariosComponent,
    FormCrearComponent,
    FichaMedicaComponent,
    FormComponent,
    VeterinariasComponent,
    FormVeterinariaComponent,
    MascotasComponent,
    FormMascotaComponent,
    ContratosComponent,
    FormContratoComponent,
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
