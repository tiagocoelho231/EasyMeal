import { Component, OnInit } from '@angular/core';
import { Receita, ReceitaService } from 'src/service/receita.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { auth } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-detalhes-receita',
  templateUrl: './detalhes-receita.page.html',
  styleUrls: ['./detalhes-receita.page.scss'],
})
export class DetalhesReceitaPage {
  receita: Receita = {
    nome: '',
    imagem: '',
    ingredientes: [],
    preparo: [],
    ingredientesDetalhados: []
  }
  usuario: any = {
    favoritos: []
  };
  receitaId = '';
  usuarioId = '';
  ingredientes: Array<String> = [];
  preparo: Array<String> = [];
  favorited: boolean = false;
  admin: boolean = false;
  receitaSubscription: any;
  usuarioSubscription: any;
  textoToggleFavorito: string = 'Adicionar aos favoritos'

  constructor(private receitaService: ReceitaService, private route: ActivatedRoute, private nav: NavController, private db: AngularFirestore) {

  }

  ionViewWillEnter () {
    this.receitaId = this.route.snapshot.params['id'];
    if (this.receitaId) {
      this.loadReceita();
    }

    auth().onAuthStateChanged((usuario) => {
      if (usuario) {
        this.usuarioId = usuario.uid;
        this.usuarioSubscription = this.db.collection('usuarios').doc(this.usuarioId).valueChanges().subscribe(resultado => {
          this.usuario = resultado;
          this.admin = this.usuario.admin;
          this.favorited = this.usuario.favoritos.includes(this.receitaId);
          this.textoToggleFavorito = this.favorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos';
        });
      }
    });
  }

  loadReceita() {
    this.receitaSubscription = this.receitaService.getReceita(this.receitaId).subscribe(retorno => {
      this.receita = retorno;
      if (this.receita.ingredientesDetalhados)
        this.ingredientes = this.receita.ingredientesDetalhados;
      if (this.receita.preparo)
        this.preparo = this.receita.preparo;
    })
  }

  edit() {
    this.nav.navigateForward(`/detalhes-edit/${this.receitaId}`);
  }

  toggleFavorito() {
    const indexReceita = this.usuario.favoritos.indexOf(this.receitaId);
    if (indexReceita >= 0) {
      this.usuario.favoritos.splice(indexReceita,1);
    } else {
      this.usuario.favoritos.push(this.receitaId);
    }
    this.db.collection('usuarios').doc(this.usuarioId).update(this.usuario);
  }

  ionViewWillLeave () {
    this.usuarioSubscription.unsubscribe();
    this.receitaSubscription.unsubscribe();
  }
}