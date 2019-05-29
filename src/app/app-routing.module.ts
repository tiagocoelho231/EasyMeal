import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'favoritos', loadChildren: './pages/favoritos/favoritos.module#FavoritosPageModule' },
  { path: 'conta', loadChildren: './pages/conta/conta.module#ContaPageModule' },
  { path: 'despensa', loadChildren: './pages/despensa/despensa.module#DespensaPageModule' },
  { path: 'adicionar', loadChildren: './pages/adicionar-receita/adicionar-receita.module#AdicionarReceitaPageModule' },
  { path: 'detalhes/:id', loadChildren: './pages/detalhes-receita/detalhes-receita.module#DetalhesReceitaPageModule' },
  { path: 'busca', loadChildren: './pages/busca/busca.module#BuscaPageModule' },
  { path: 'cadastro', loadChildren: './pages/cadastro/cadastro.module#CadastroPageModule' },
  { path: 'conta-detalhes', loadChildren: './pages/conta-detalhes/conta-detalhes.module#ContaDetalhesPageModule' },
  { path: 'detalhes-edit/:id', loadChildren: './pages/detalhes-receita-edit/detalhes-receita-edit.module#DetalhesReceitaEditPageModule' },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
