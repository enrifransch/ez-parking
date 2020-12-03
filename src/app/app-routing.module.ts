import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/containers/home/home.component';
import {StoresComponent} from './stores/containers/stores/stores.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'stores', component: StoresComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
