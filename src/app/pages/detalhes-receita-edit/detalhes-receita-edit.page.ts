import { ReceitaService, Receita } from './../../../service/receita.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-detalhes-receita-edit',
  templateUrl: './detalhes-receita-edit.page.html',
  styleUrls: ['./detalhes-receita-edit.page.scss'],
})
export class DetalhesReceitaEditPage {
  receita: Receita = {
    nome: '',
    imagem: '',
    ingredientes: null,
    preparo: null,
    ingredientesDetalhados: null
  }
  
  receitaId = '';

  tipos: Object = [
    { name: 'ingredientes', placeholder: 'Ingrediente', title: 'Ingredientes' },
    { name: 'ingredientesDetalhados', placeholder: 'Ingrediente Detalhado', title: 'Ingredientes Detalhados' },
    { name: 'preparo', placeholder: 'Passo', title: 'Modo de Preparo' }
  ]

  subscription;

  noRender() {
     //Impede o input de atualizar cada vez que um caractere é modificado
  }

  constructor(private receitaService: ReceitaService, private route: ActivatedRoute, private nav: NavController) {

  }

  ionViewDidEnter() {
    this.receitaId = this.route.snapshot.params['id'];
    if (this.receitaId)
      this.loadReceita();
    else
      this.nav.navigateBack('home');
  }
  
  loadReceita() {
    this.subscription = this.receitaService.getReceita(this.receitaId).subscribe(retorno => {
      this.receita = retorno;
    })
  }

  updateReceita() {
    const receitaCorrigida = {...this.receita, ingredientes: this.receita.ingredientes.map(item => item.toLowerCase())}
    this.receitaService.updateReceita(receitaCorrigida, this.receitaId).then(() => {
      this.nav.navigateBack(`/detalhes/${this.receitaId}`);
    })
  }
  
  removeReceita() {
    this.subscription.unsubscribe();
    this.receitaService.removeReceita(this.receitaId).then(() => {
      this.nav.navigateBack('home');
    }).catch(() => {
      this.subscription = this.receitaService.getReceita(this.receitaId).subscribe(retorno => {
        this.receita = retorno;
      })
    });
  }

  addInput(tipo) {
    this.receita[tipo].push('');
  }

  removeInput(tipo, i) {
    this.receita[tipo].splice(i,1);
  }

  ionViewWillLeave() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}