import { Component } from '@angular/core';
import { auth } from 'firebase';
import { NavController } from '@ionic/angular';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

export interface Usuario {
  despensa: Array<String>;
}


@Component({
  selector: 'app-despensa',
  templateUrl: './despensa.page.html',
  styleUrls: ['./despensa.page.scss'],
})
export class DespensaPage {

  private usuariosColecao: AngularFirestoreCollection<Usuario>
  private id: any;
  private usuario: Usuario = {
    despensa: []
  };
  public ingredientes: Array<String> = [];
  subscription;

  constructor(private nav: NavController, private db: AngularFirestore) {
    this.usuariosColecao = this.db.collection('usuarios');
  }

  ionViewDidEnter () {
    auth().onAuthStateChanged(usuario => {
      if (usuario) {
        this.id = usuario.uid;
        this.loadDespensa();
      } else {
        this.nav.navigateBack("conta");
      }
    });
  }

  loadDespensa() {
    this.subscription = this.usuariosColecao.doc<Usuario>(this.id).valueChanges().subscribe(retorno => {
      this.usuario = retorno;
      if (this.usuario.despensa)
        this.ingredientes = this.usuario.despensa;
    })
  }
  

  updateDespensa() {
    const correctedUsuario = {...this.usuario, despensa: this.ingredientes.map(i => i.toLowerCase())};
    this.usuariosColecao.doc(this.id).update(correctedUsuario);
  }

  addInput() {
    this.ingredientes.push('');
  }

  removeInput(i) {
    this.ingredientes.splice(i,1);
  }

  noRender() {
    //Impede o input de atualizar cada vez que um caractere é modificado
  }

  ionViewWillLeave() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
