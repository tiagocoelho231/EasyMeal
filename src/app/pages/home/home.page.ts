import { Receita, ReceitaService } from '../../../service/receita.service';
import * as firebase from 'firebase';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  receitas: Receita[];

  constructor(private receitaService: ReceitaService, private nav: NavController){}
  
  private subscription;

  ngOnInit(){
    this.subscription = this.receitaService.getReceitas().subscribe(retorno => {
      this.receitas = retorno;
    });
  }

  ionViewWillEnter() {
		firebase.auth().onAuthStateChanged(usuario => {
			if (usuario) {
				// console.log(usuario);
			} else {
				console.log('Sem usuário');
				this.nav.navigateForward('conta');
			}
		});
	}
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
 }

}