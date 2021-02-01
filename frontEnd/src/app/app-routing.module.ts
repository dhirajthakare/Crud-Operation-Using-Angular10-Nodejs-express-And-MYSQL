import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InformationComponent } from './information/information.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'registration' , component:RegistrationComponent},
  {path:'information' , component:InformationComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
