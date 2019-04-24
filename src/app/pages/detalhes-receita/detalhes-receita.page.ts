import { ReceitaService, Receita } from './../../../service/receita.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-detalhes-receita',
  templateUrl: './detalhes-receita.page.html',
  styleUrls: ['./detalhes-receita.page.scss'],
})
export class DetalhesReceitaPage implements OnInit {
  receita: Receita = {
    nome: null,
    ingredientes: null,
    preparo: null,
    imagem: null
  }
  receitaId = null;
  inputIngredientes: any;

  noRender() {
     //Impede o input de atualizar cada vez que um caractere é modificado
  }

  constructor(private receitaService: ReceitaService, private route: ActivatedRoute, private nav: NavController) {

  }

  ngOnInit() {
    this.receitaId = this.route.snapshot.params['id'];
    if (this.receitaId) {
      this.loadReceita();
    }
  }
  loadReceita() {
    this.receitaService.getReceita(this.receitaId).subscribe(retorno => {

      this.receita = retorno;
      this.inputIngredientes = this.receita.ingredientes;
    })

  }

  updateReceita() {
    this.receitaService.updateReceita(this.receita, this.receitaId).then(() => {
      //console.log(this.receita.ingredientes);
      this.nav.navigateBack('home');
    })
  }
  
  removeReceita() {
    this.receitaService.removeReceita(this.receitaId).then(() => {
      this.nav.navigateBack('home');
    })
  }

  addInput() {
    this.inputIngredientes.push('');
    //console.log(this.inputIngredientes);
  }

  removeInput() {
    this.inputIngredientes.pop();
    //console.log(this.inputIngredientes);
  }
}