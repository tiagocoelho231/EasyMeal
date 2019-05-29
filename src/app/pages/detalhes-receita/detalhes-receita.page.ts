import { Component, OnInit } from '@angular/core';
import { Receita, ReceitaService } from 'src/service/receita.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';

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

  private id: any;
  private admin: any;

  constructor(private receitaService: ReceitaService, private route: ActivatedRoute, private nav: NavController) {

  }

  ngOnInit() {
    this.receitaId = this.route.snapshot.params['id'];
    if (this.receitaId) {
      this.loadReceita();
    }

    firebase.auth().onAuthStateChanged((usuario) => {
      if (usuario) {
        this.id = usuario.uid;

        firebase.firestore().collection('usuarios').doc(this.id).get().then(resultado => {
          this.admin = resultado.data().admin;
          if (this.admin = true) {
            this.nav.navigateForward("/detalhes-edit/" + this.receitaId);
          }
        })
      }
    });

  }

  loadReceita() {
    this.receitaService.getReceita(this.receitaId).subscribe(retorno => {
      this.receita = retorno;
      this.inputIngredientes = this.receita.ingredientes;
      //console.log(this.inputIngredientes);
    })
  }

}