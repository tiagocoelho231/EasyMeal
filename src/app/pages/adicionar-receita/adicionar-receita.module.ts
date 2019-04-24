import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdicionarReceitaPage } from './adicionar-receita.page';

const routes: Routes = [
  {
    path: '',
    component: AdicionarReceitaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdicionarReceitaPage]
})
export class AdicionarReceitaPageModule {}
