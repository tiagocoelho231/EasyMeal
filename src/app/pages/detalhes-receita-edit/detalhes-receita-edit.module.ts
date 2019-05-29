import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetalhesReceitaEditPage } from './detalhes-receita-edit.page';

const routes: Routes = [
  {
    path: '',
    component: DetalhesReceitaEditPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetalhesReceitaEditPage]
})
export class DetalhesReceitaEditPageModule {}
