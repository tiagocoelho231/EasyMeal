import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss']
})
export class CadastroPage {
  formValue = { name: '', email: '', password: '', confirmPassword: '' };

  constructor(
    private afAuth: AngularFireAuth,
    private nav: NavController,
    private db: AngularFirestore
  ) {}

  signUp() {
    const { name, email, password, confirmPassword } = this.formValue;
    if (confirmPassword === password) {
      this.afAuth.auth
        .createUserWithEmailAndPassword(email, password)
        .then(response => {
          this.db.collection('usuarios').doc(response.user.uid).set({ nome: name, admin: false, favoritos: '' });
          window.alert('Cadastrado com sucesso');
          this.nav.navigateBack('conta');
        })
        .catch(error => window.alert(error.message));
    } else {
      window.alert(`As senhas devem ser iguais`);
    }
  }
}
