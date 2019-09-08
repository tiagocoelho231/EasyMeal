import { Component, OnInit } from '@angular/core';
import { ReceitaService, Receita } from 'src/service/receita.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { auth } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

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

  admin: boolean = false;

  subscription;

  receitaId = {};

  tipos: Object = [
    { name: 'ingredientes', placeholder: 'Ingrediente', title: 'Ingredientes' },
    { name: 'ingredientesDetalhados', placeholder: 'Ingrediente Detalhado', title: 'Ingredientes Detalhados' },
    { name: 'preparo', placeholder: 'Passo', title: 'Modo de Preparo' }
  ]

  noRender() {
    //Impede o input de atualizar cada vez que um caractere é modificado
  }

  constructor(private receitaService: ReceitaService, private route: ActivatedRoute, private nav: NavController, private db: AngularFirestore) {}
  
  ionViewWillEnter () {
    auth().onAuthStateChanged(usuario => {
      if (usuario) {
        this.subscription = this.db.collection('usuarios').doc<any>(usuario.uid).valueChanges().subscribe(u => {
          if (u)
            this.admin = u.admin;
          if (!this.admin) this.nav.navigateBack('conta');
        })
      } else {
        this.nav.navigateBack('conta');
      }
    })
  }

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

  ionViewWillLeave() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}