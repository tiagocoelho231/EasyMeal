import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { NavController } from '@ionic/angular';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

export interface Despensa {
  ingredientes: Array<String>;
}


@Component({
  selector: 'app-despensa',
  templateUrl: './despensa.page.html',
  styleUrls: ['./despensa.page.scss'],
})
export class DespensaPage implements OnInit {

  private despensaColecao: AngularFirestoreCollection<Despensa>
  private id: any;
  private despensa: Despensa = {
    ingredientes: ['']
  };
  public ingredientes: any;

  constructor(private nav: NavController, db: AngularFirestore) {
    this.despensaColecao = db.collection('despensas');
  }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((usuario) => {
      if (usuario) {
        this.id = usuario.uid;
        this.loadDespensa(this.id);
      } else {
        this.nav.navigateForward("conta");
      }
    });
  }

  loadDespensa(id: any) {
    firebase.firestore().collection('despensas').doc(id).get().then(resultado => {
      this.ingredientes = resultado.data().ingredientes;

      this.despensaColecao.doc<Despensa>(id).valueChanges().subscribe(retorno => {
        this.despensa = retorno;
        this.ingredientes = this.despensa.ingredientes;
      })
    }).catch(() => {
      firebase.firestore().collection('despensas').doc(id).set(this.despensa).then(() => {
        location.reload();
      })
    })
  }

  updateDespensa() {
    firebase.firestore().collection('despensas').doc(this.id).update(this.despensa);
  }

  addInput() {
    this.ingredientes.push('');
    //console.log(this.inputIngredientes);
  }

  removeInput() {
    this.ingredientes.pop();
    //console.log(this.inputIngredientes);
  }

  noRender() {
    //Impede o input de atualizar cada vez que um caractere é modificado
  }

}
