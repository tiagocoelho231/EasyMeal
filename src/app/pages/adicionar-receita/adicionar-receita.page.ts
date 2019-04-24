import { Component, OnInit } from '@angular/core';
import { ReceitaService, Receita } from 'src/service/receita.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-adicionar-receita',
  templateUrl: './adicionar-receita.page.html',
  styleUrls: ['./adicionar-receita.page.scss'],
})
export class AdicionarReceitaPage implements OnInit {
  receita: Receita = {
    nome: null,
    ingredientes: null,
    preparo: null,
    imagem: null
  }
  receitaId = {};

  noRender() {
     //Impede o input de atualizar cada vez que um caractere é modificado
  }

  constructor(private receitaService: ReceitaService, private route: ActivatedRoute, private nav: NavController) {

  }

  ngOnInit() {
    this.receita = {
      nome: '',
      ingredientes: [],
      imagem: '',
      preparo: ''
    };
  }
  
  addReceita() {
    this.receitaService.addReceita(this.receita);
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