import { Component, OnInit } from '@angular/core';
import { ReceitaService, Receita } from 'src/service/receita.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-adicionar-receita',
  templateUrl: './adicionar-receita.page.html',
  styleUrls: ['./adicionar-receita.page.scss'],
})
export class AdicionarReceitaPage {
  receita: Receita = {
    nome: '',
    imagem: '',
    ingredientes: [],
    preparo: [],
    ingredientesDetalhados: []
  }
  receitaId = {};

  noRender() {
    //Impede o input de atualizar cada vez que um caractere é modificado
  }

  constructor(private receitaService: ReceitaService, private route: ActivatedRoute, private nav: NavController) {}
  
  addReceita() {
    const receitaCorrigida = {...this.receita, ingredientes: this.receita.ingredientes.map(item => item.toLowerCase())}
    this.receitaService.addReceita(receitaCorrigida);
    this.nav.navigateBack('home');
  }

  addInput() {
    this.receita.ingredientes.push('');
    console.log(this.receita.ingredientes);
  }

  removeInput() {
    this.receita.ingredientes.pop();
    console.log(this.receita.ingredientes);
  }
}