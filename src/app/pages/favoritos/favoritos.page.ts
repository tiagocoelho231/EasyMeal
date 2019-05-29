import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ReceitaService, Receita } from 'src/service/receita.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {
  receitas: Receita[];
  favoritos: string[];
  show: any[];

  constructor(private receitaService: ReceitaService, private db: AngularFirestore){}
  
  private subscription;
  private id: any;

  ngOnInit(){
    this.show = [];
    this.subscription = this.receitaService.getReceitas().subscribe(retorno => {
      this.receitas = retorno;
    });
    firebase.auth().onAuthStateChanged((usuario) => {
      if (usuario)
        this.id = usuario.uid;
      firebase.firestore().collection('usuarios').doc(this.id).get().then(resultado => {
        if (resultado.data().favoritos){
          this.favoritos = resultado.data().favoritos;
          this.favoritos.map(f => this.db.collection('receitas').doc(f).get().subscribe(retorno => this.show = [...this.show, retorno.data()]));
        }
      })
    });
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
 }

}
