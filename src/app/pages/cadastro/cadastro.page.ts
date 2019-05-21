import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  formValue = { email: '', password: '', confirmPassword: '' };

  constructor(private afAuth: AngularFireAuth, private nav: NavController) { }

  ngOnInit() { }

  signUp() {
    const { email, password, confirmPassword } = this.formValue;
    if (confirmPassword === password){
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(response => {
        console.log(response);
        window.alert('Cadastrado com sucesso');
        this.nav.navigateBack('conta')
      })
      .catch(error => window.alert(error.message));
    } else {
      window.alert(`As senhas devem ser iguais`);
    }
  }
  
    
}
