import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.page.html',
  styleUrls: ['./conta.page.scss'],
})
export class ContaPage implements OnInit {
  formValue = { email: '', password: '' };

  constructor(private afAuth: AngularFireAuth, private nav: NavController) { }

  ngOnInit() { }

  login() {
    const { email, password } = this.formValue;
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        window.alert('Logged in successfully');
        this.nav.navigateBack('home')
      })
      .catch(error => window.alert(error.message));
  }

}
