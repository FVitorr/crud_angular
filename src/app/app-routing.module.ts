import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'cidade',
    pathMatch: 'full'
  },
  {
    path:'cidade',
    loadChildren: ()=> import('./cidade/cidade.module').then(m => m.CidadeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
