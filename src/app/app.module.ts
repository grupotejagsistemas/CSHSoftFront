import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HeaderComponent} from './header/header.component'
import {FooterComponent} from './footer/footer.component';
import { VoluntariosComponent } from './voluntarios/voluntarios.component';
import {VoluntarioService} from './voluntarios/voluntario.service';
import {RouterModule, Routes} from '@angular/router';
import { FormComponent } from './voluntarios/form.component';
import  {FormsModule} from '@angular/forms';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: 'voluntarios', component: VoluntariosComponent},
  {path: 'voluntarios/crear', component: FormComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    VoluntariosComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [VoluntarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
