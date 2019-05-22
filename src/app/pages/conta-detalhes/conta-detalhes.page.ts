import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-conta-detalhes',
  templateUrl: './conta-detalhes.page.html',
  styleUrls: ['./conta-detalhes.page.scss'],
})
export class ContaDetalhesPage implements OnInit {

  constructor(private nav: NavController) { }

  ngOnInit() { }


  logout() {
    firebase.auth().signOut().then(() => {
      console.log("Logout");
      this.nav.navigateBack('conta');
    })
  }

  
  ionViewWillEnter() {
    firebase.auth().onAuthStateChanged((usuario) => {
      if (usuario) {
        //console.log(usuario);
      } else {
        console.log("sem usuario");
        this.nav.navigateForward("conta");
      }
    });
  }
}
