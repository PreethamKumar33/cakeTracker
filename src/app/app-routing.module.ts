import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDetailsComponent } from './pages/add-details/add-details.component';
import { HomeComponent } from './pages/home/home.component';
import { ListAllComponent } from './pages/list-all/list-all.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'addDetails', component: AddDetailsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'allDetails', component: ListAllComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
