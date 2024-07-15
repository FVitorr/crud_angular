import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'pessoa',
    pathMatch: 'full'
  },
  {
    path:'cidade',
    loadChildren: ()=> import('./cidade/cidade.module').then(m => m.CidadeModule)
  },
  {
    path:'pessoa',
    loadChildren: ()=> import('./pessoa/pessoa.module').then(m => m.PessoaModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
