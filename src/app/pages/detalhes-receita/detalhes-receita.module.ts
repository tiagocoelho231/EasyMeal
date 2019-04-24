import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetalhesReceitaPage } from './detalhes-receita.page';

const routes: Routes = [
  {
    path: '',
    component: DetalhesReceitaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetalhesReceitaPage]
})
export class DetalhesReceitaPageModule {}
