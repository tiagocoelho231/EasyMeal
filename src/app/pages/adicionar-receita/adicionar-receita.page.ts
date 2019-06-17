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
    ingredientes: [''],
    preparo: [''],
    ingredientesDetalhados: ['']
  }

  receitaId = {};

  tipos: Object = [
    { name: 'ingredientes', placeholder: 'Ingrediente', title: 'Ingredientes' },
    { name: 'ingredientesDetalhados', placeholder: 'Ingrediente Detalhado', title: 'Ingredientes Detalhados' },
    { name: 'preparo', placeholder: 'Passo', title: 'Modo de Preparo' }
  ]

  noRender() {
    //Impede o input de atualizar cada vez que um caractere é modificado
  }

  constructor(private receitaService: ReceitaService, private route: ActivatedRoute, private nav: NavController) {}
  
  addReceita() {
    const receitaCorrigida = {...this.receita, ingredientes: this.receita.ingredientes.map(item => item.toLowerCase())}
    this.receitaService.addReceita(receitaCorrigida).then(resultado => {
      this.nav.navigateBack(`/detalhes/${resultado.id}`);
    });
    
  }

  addInput(tipo) {
    this.receita[tipo].push('');
  }

  removeInput(tipo, i) {
    this.receita[tipo].splice(i,1);
  }
}