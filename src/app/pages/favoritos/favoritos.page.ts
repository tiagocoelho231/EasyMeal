import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ReceitaService, Receita } from 'src/service/receita.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage {
  favoritos: Array<string> = [];
  receitas: Array<any> = [];
  show: Array<Receita> = [];

  constructor(private receitaService: ReceitaService, private db: AngularFirestore){}
  
  private receitasSubscription;
  private usuarioSubscription;
  private id: any;
  

  ionViewWillEnter(){
    this.receitasSubscription = this.receitaService.getReceitas().subscribe(retorno => {
      this.receitas = retorno;
    });
    firebase.auth().onAuthStateChanged(usuario => {
      if (usuario)
        this.id = usuario.uid;
      this.usuarioSubscription = this.db.collection('usuarios').doc<any>(this.id).valueChanges().subscribe(retorno => {
        this.show = [];
        if (retorno.favoritos)
          this.favoritos = retorno.favoritos;
        this.favoritos.forEach(f => this.show.push(...this.receitas.filter(receita => receita.id === f)));
      })
    })
  };
  
  ionViewWillLeave() {
    this.receitasSubscription.unsubscribe();
    this.usuarioSubscription.unsubscribe();
 }
}
