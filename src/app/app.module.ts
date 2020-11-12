import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination';
import { AppComponent } from './app.component';
import {HeaderComponent} from './header/header.component'
import {FooterComponent} from './footer/footer.component';
import { VoluntariosComponent } from './voluntarios/voluntarios.component';
import {VoluntarioService} from './voluntarios/voluntario.service';
import {RouterModule, Routes} from '@angular/router';
import  {ReactiveFormsModule, FormsModule} from '@angular/forms';
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
import { EditarAdoptanteComponent } from './adoptantes/editar-adoptante.component';
import { EditarVoluntariosComponent } from './voluntarios/editar-voluntarios.component';
import { AuditoriaComponent } from './auditoria/auditoria.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AuthService } from './usuarios/auth.service';
import { AuthInterceptor } from './usuarios/interceptors/auth.interceptor';
import { EditarFichasMedicasComponent } from './fichas-medicas/editar-fichas-medicas/editar-fichas-medicas.component';
import { EditarMascotasComponent } from './mascotas/editar-mascotas.component';
import { EditarEntrevistasAdoptantesComponent } from './entrevistas-adoptantes/editar-entrevistas-adoptantes.component';
import { EditarVeterinariaComponent } from './veterinarias/editar-veterinaria.component';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full', 
  canActivate: [AuthGuard],
},
  {path: 'auditoria', component: AuditoriaComponent,
  canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}
},
  {path: 'voluntarios', component: VoluntariosComponent,
 canActivate: [AuthGuard]
},
  {path: 'voluntarios/crear', component: FormCrearComponent,
 canActivate: [AuthGuard]
},
  {path: 'voluntarios/editar/:id', component: EditarVoluntariosComponent ,
 canActivate: [AuthGuard]
},
  {path: 'fichas-medicas', component: FichasMedicasComponent ,
 canActivate: [AuthGuard]
},
  {path: 'fichas-medicas/crear', component: FormFichaMedicaComponent ,
 canActivate: [AuthGuard]
},
  {path: 'fichas-medicas/editar/:id', component: FormFichaMedicaComponent ,
 canActivate: [AuthGuard]
},
  {path: 'mascotas', component: MascotasComponent ,
 canActivate: [AuthGuard]
},
  {path: 'mascotas/crear', component: FormMascotasComponent ,
 canActivate: [AuthGuard]
},
  {path: 'mascotas/editar/:id', component: FormMascotasComponent ,
 canActivate: [AuthGuard]
},
  {path: 'veterinarias', component: VeterinariasComponent ,
 canActivate: [AuthGuard]
},
  {path: 'veterinarias/crear',component: FormVeterinariaComponent , 
 canActivate: [AuthGuard]
},
  {path: 'veterinarias/editar/:id', component: FormVeterinariaComponent , 
 canActivate: [AuthGuard]
},
  {path: 'contratos', component: ContratosComponent ,
 canActivate: [AuthGuard]
},
  {path: 'contratos/crear', component: FormContratoComponent ,
 canActivate: [AuthGuard]
},
  {path: 'contratos/editar/:id', component: FormContratoComponent ,
 canActivate: [AuthGuard]
},
  {path: 'adoptantes', component: AdoptantesComponent ,
 canActivate: [AuthGuard]
},
  {path: 'adoptantes/crear', component: FormAdoptanteComponent ,
 canActivate: [AuthGuard]
},
  {path: 'adoptantes/editar/:id', component: EditarAdoptanteComponent ,
 canActivate: [AuthGuard]
},
{path: 'entrevistas', component: EntrevistasAdoptantesComponent ,
 canActivate: [AuthGuard]
},
  {path: 'entrevistas/crear', component: FormEntrevistaAdoptanteComponent ,
 canActivate: [AuthGuard]
},
  {path: 'entrevistas/editar/:id', component: FormEntrevistaAdoptanteComponent ,
 canActivate: [AuthGuard]
},
{path: 'entrevistas/respuestas/:id', component: RespuestasComponent ,
 canActivate: [AuthGuard]
},
  {path: 'movimientos-recursos', component: MovimientosRecursosComponent ,
 canActivate: [AuthGuard]
},
  {path: 'movimientos-recursos/crear', component: FormMovRecursoComponent ,
 canActivate: [AuthGuard]
},
  {path: 'movimientos-monetarios', component: MovimientosMonetariosComponent ,
 canActivate: [AuthGuard]
},
  {path: 'movimientos-monetarios/crear', component: FormMovMonetarioComponent ,
 canActivate: [AuthGuard]
},
  {path: 'recordatorios', component: RecordatoriosComponent ,
 canActivate: [AuthGuard]
},
  {path: 'recordatorios/crear', component: FormRecordatorioComponent ,
 canActivate: [AuthGuard]
},
  {path: 'recordatorios/editar/:id', component: FormRecordatorioComponent ,
 canActivate: [AuthGuard]
},
  {path: 'historial', component: HistorialesComponent ,
 canActivate: [AuthGuard]
},
  {path: 'historial/crear', component: FormHistorialComponent ,
 canActivate: [AuthGuard]

},
  {path: 'historial/editar/:id', component:FormHistorialComponent ,
 canActivate: [AuthGuard]
},
  {path: 'login', component: LoginComponent 
},
  {path: 'registrar-usuario', component: UsuarioCrearComponent,
 canActivate: [AuthGuard, RoleGuard], data:{role: 'ROLE_ADMIN'}
},
  {path: 'cambiar-contrasena', component: ModifContrasenaComponent, 
   canActivate: [AuthGuard]
},
  {path: 'eliminar-usuario', component: BajaUsuarioComponent, 
 canActivate: [AuthGuard, RoleGuard], data:{role: 'ROLE_ADMIN'}
},
  {path: 'modificacion-tipo-usuario', component: TipoUsuarioComponent ,
 canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}
},
  {path: 'modificacion-tipo-usuario/:id', component: ModifTipoUsuarioComponent ,
 canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}
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
    EditarAdoptanteComponent,
    EditarVoluntariosComponent,
    AuditoriaComponent,
    EditarFichasMedicasComponent,
    EditarMascotasComponent,
    EditarEntrevistasAdoptantesComponent,
    EditarVeterinariaComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, { useHash: true }),
    NgxPaginationModule,
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    AuthService,
    VoluntarioService, 
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor,  multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
