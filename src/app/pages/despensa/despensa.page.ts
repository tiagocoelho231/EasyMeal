import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { NavController } from '@ionic/angular';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

export interface Despensa {
  despensa: Array<String>;
}


@Component({
  selector: 'app-despensa',
  templateUrl: './despensa.page.html',
  styleUrls: ['./despensa.page.scss'],
})
export class DespensaPage implements OnInit {

  private usuariosColecao: AngularFirestoreCollection<Despensa>
  private id: any;
  private usuario: Despensa = {
    despensa: ['']
  };
  public ingredientes: any;

  constructor(private nav: NavController, private db: AngularFirestore) {
    this.usuariosColecao = this.db.collection('usuarios');
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
    firebase.firestore().collection('usuarios').doc(id).get().then(resultado => {
      this.ingredientes = resultado.data().despensa;

      this.usuariosColecao.doc<Despensa>(id).valueChanges().subscribe(retorno => {
        this.usuario = retorno;
        this.ingredientes = this.usuario.despensa;
      })
    }).catch(() => {
      firebase.firestore().collection('usuarios').doc(id).set(this.usuario).then(() => {
        location.reload();
      })
    })
  }

  updateDespensa() {
    const correctedUsuario = {...this.usuario, despensa: this.usuario.despensa.map(i => i.toLowerCase())};
    firebase.firestore().collection('usuarios').doc(this.id).update(correctedUsuario);
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
