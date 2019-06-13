import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.page.html',
  styleUrls: ['./conta.page.scss']
})
export class ContaPage implements OnInit {
  formValue = { email: '', password: '' };
  title = '';
  loggedIn = false;
  user = {};

  constructor(private afAuth: AngularFireAuth, private nav: NavController) {}

  ngOnInit() {
    firebase.auth().onAuthStateChanged(usuario => {
      if (usuario) {
        firebase.firestore().collection('usuarios').doc(usuario.uid).get().then(resultado => {
          this.user = resultado.data();
        })
      }
      this.loggedIn = !!usuario;
      this.title = this.loggedIn ? 'Conta' : 'Login';
    });
  }

  login() {
    const { email, password } = this.formValue;
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Usuário logado');
        this.nav.navigateForward('home');
      })
      .catch(error => window.alert(error.message));
  }

  logout() {
    firebase.auth().signOut().then(() => {
      this.loggedIn = false;
    });
	}
}
