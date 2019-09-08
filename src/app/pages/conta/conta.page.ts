import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';
import { auth, firestore } from 'firebase';

@Component({
  selector: 'app-conta',
  templateUrl: 'conta.page.html',
  styleUrls: ['conta.page.scss']
})
export class ContaPage implements OnInit {
  formValue = { email: '', password: '' };
  changeValues = { nome: '', password: '', confirmPassword: '' };
  title = '';
  loggedIn = false;
  user = {};

  constructor(private afAuth: AngularFireAuth, private nav: NavController) {}

  ngOnInit() {
    auth().onAuthStateChanged(usuario => {
      if (usuario) {
        firestore().collection('usuarios').doc(usuario.uid).get().then(resultado => {
          if (resultado.data())
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
        this.nav.navigateForward('home');
      })
      .catch(error => window.alert(error.message));
  }

  logout() {
    auth().signOut().then(() => {
      this.loggedIn = false;
    });
  }
  
  updateValues() {
    this.nav.navigateBack('home');
  }
}
