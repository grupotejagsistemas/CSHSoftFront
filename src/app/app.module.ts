import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination';
import { AppComponent } from './app.component';
import {HeaderComponent} from './header/header.component'
import {FooterComponent} from './footer/footer.component';
import { VoluntariosComponent } from './voluntarios/voluntarios.component';
import {VoluntarioService} from './voluntarios/voluntario.service';
import {RouterModule, Routes} from '@angular/router';
import  {FormsModule} from '@angular/forms';
import { FormCrearComponent } from './voluntarios/form-crear.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
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
import { RecordatoriosComponent } from './recordatorios/recordatorios.component';
import { FormRecordatorioComponent } from './recordatorios/form-recordatorio.component';
import { HistorialesComponent } from './historiales/historiales.component';
import { FormHistorialComponent } from './historiales/form-historial.component';
import { LoginComponent } from './usuarios/login.component';
import { UsuarioCrearComponent } from './usuarios/crear-usuario/usuario-crear.component';
import { ModifContrasenaComponent } from './usuarios/modif-contrasena/modif-contrasena.component';
import { BajaUsuarioComponent } from './usuarios/baja-usuario/baja-usuario.component';
import { ModifTipoUsuarioComponent } from './usuarios/modif-tipo-usuario/modif-tipo-usuario.component';
import { TipoUsuarioComponent } from './usuarios/modif-tipo-usuario/tipo-usuario.component';
import { AuthGuard } from './usuarios/guards/auth.guard';
import { RoleGuard } from './usuarios/guards/role.guard';
import { TokenInterceptor } from './usuarios/interceptors/token.interceptor';
import { EntrevistasAdoptantesComponent } from './entrevistas-adoptantes/entrevistas-adoptantes.component';
import { FormEntrevistaAdoptanteComponent } from './entrevistas-adoptantes/form-entrevista-adoptante.component';
import { RespuestasComponent } from './entrevistas-adoptantes/respuestas.component';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: 'voluntarios', component: VoluntariosComponent 
//  canActivate: [AuthGuard, RoleGuard]
},
  {path: 'voluntarios/crear', component: FormCrearComponent 
//  canActivate: [AuthGuard, RoleGuard]
},
  {path: 'voluntarios/editar/:id', component: FormCrearComponent 
//  canActivate: [AuthGuard, RoleGuard]
},
  {path: 'fichas-medicas', component: FichasMedicasComponent 
//  canActivate: [AuthGuard, RoleGuard]
},
  {path: 'fichas-medicas/crear', component: FormFichaMedicaComponent 
//  canActivate: [AuthGuard, RoleGuard]
},
  {path: 'fichas-medicas/editar/:id', component: FormFichaMedicaComponent 
//  canActivate: [AuthGuard, RoleGuard]
},
  {path: 'mascotas', component: MascotasComponent 
//  canActivate: [AuthGuard, RoleGuard]
},
  {path: 'mascotas/crear', component: FormMascotasComponent 
//  canActivate: [AuthGuard, RoleGuard]
},
  {path: 'mascotas/editar/:id', component: FormMascotasComponent 
//  canActivate: [AuthGuard, RoleGuard]
},
  {path: 'veterinarias', component: VeterinariasComponent 
//  canActivate: [AuthGuard, RoleGuard]
},
  {path: 'veterinarias/crear',component: FormVeterinariaComponent , 
//  canActivate: [AuthGuard, RoleGuard]
},
  {path: 'veterinarias/editar/:id', component: FormVeterinariaComponent , 
//  canActivate: [AuthGuard, RoleGuard]
},
  {path: 'contratos', component: ContratosComponent 
//  canActivate: [AuthGuard, RoleGuard]
},
  {path: 'contratos/crear', component: FormContratoComponent 
//  canActivate: [AuthGuard, RoleGuard]
},
  {path: 'contratos/editar/:id', component: FormContratoComponent 
//  canActivate: [AuthGuard, RoleGuard]
},
  {path: 'adoptantes', component: AdoptantesComponent 
//  canActivate: [AuthGuard, RoleGuard]
},
  {path: 'adoptantes/crear', component: FormAdoptanteComponent 
//  canActivate: [AuthGuard, RoleGuard]
},
  {path: 'adoptantes/editar/:id', component: FormAdoptanteComponent 
//  canActivate: [AuthGuard, RoleGuard]
},
{path: 'entrevistas', component: EntrevistasAdoptantesComponent 
//  canActivate: [AuthGuard, RoleGuard]
},
  {path: 'entrevistas/crear', component: FormEntrevistaAdoptanteComponent 
//  canActivate: [AuthGuard, RoleGuard]
},
  {path: 'entrevistas/editar/:id', component: FormEntrevistaAdoptanteComponent 
//  canActivate: [AuthGuard, RoleGuard]
},
{path: 'entrevistas/respuestas/:id', component: RespuestasComponent 
//  canActivate: [AuthGuard, RoleGuard]
},
  {path: 'movimientos-recursos', component: MovimientosRecursosComponent 
//  canActivate: [AuthGuard, RoleGuard]
},
  {path: 'movimientos-recursos/crear', component: FormMovRecursoComponent 
//  canActivate: [AuthGuard, RoleGuard]
},
  {path: 'movimientos-monetarios', component: MovimientosMonetariosComponent 
//  canActivate: [AuthGuard, RoleGuard]
},
  {path: 'movimientos-monetarios/crear', component: FormMovMonetarioComponent 
//  canActivate: [AuthGuard, RoleGuard]
},
  {path: 'recordatorios', component: RecordatoriosComponent 
//  canActivate: [AuthGuard, RoleGuard]
},
  {path: 'recordatorios/crear', component: FormRecordatorioComponent 
//  canActivate: [AuthGuard, RoleGuard]
},
  {path: 'recordatorios/editar/:id', component: FormRecordatorioComponent 
//  canActivate: [AuthGuard, RoleGuard]
},
  {path: 'historial', component: HistorialesComponent 
//  canActivate: [AuthGuard, RoleGuard]
},
  {path: 'historial/crear', component: FormHistorialComponent 
//  canActivate: [AuthGuard, RoleGuard]
},
  {path: 'historial/editar/:id', component:FormHistorialComponent 
//  canActivate: [AuthGuard, RoleGuard]
},
  {path: 'login', component: LoginComponent 
//  canActivate: [AuthGuard, RoleGuard]
},
  {path: 'registrar-usuario', component: UsuarioCrearComponent
  //canActivate: [AuthGuard, RoleGuard]
 // , data:{role: 'SUPER_ADMIN'}
},
  {path: 'cambiar-contrasena', component: ModifContrasenaComponent 
//  canActivate: [AuthGuard, RoleGuard]
},
  {path: 'eliminar-usuario', component: BajaUsuarioComponent 
  //canActivate: [AuthGuard, RoleGuard]
  //, data:{role: 'SUPER_ADMIN'}
},
  {path: 'modificacion-tipo-usuario', component: TipoUsuarioComponent 
  //canActivate: [AuthGuard, RoleGuard]
  //, data: {role: 'SUPER_ADMIN'}
},
  {path: 'modificacion-tipo-usuario/:id', component: ModifTipoUsuarioComponent 
  //canActivate: [AuthGuard, RoleGuard]
  //, data: {role: 'SUPER_ADMIN'}
}
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
    RecordatoriosComponent,
    FormRecordatorioComponent,
    HistorialesComponent,
    FormHistorialComponent,
    LoginComponent,
    UsuarioCrearComponent,
    ModifContrasenaComponent,
    BajaUsuarioComponent,
    ModifTipoUsuarioComponent,
    TipoUsuarioComponent,
    EntrevistasAdoptantesComponent,
    FormEntrevistaAdoptanteComponent,
    RespuestasComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    NgxPaginationModule,
  ],
  providers: [VoluntarioService, {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor,  multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
