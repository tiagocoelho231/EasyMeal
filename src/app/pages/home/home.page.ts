import { Receita, ReceitaService } from '../../../service/receita.service';
import { auth, firestore } from 'firebase';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  receitas: any[];
  user: any = {};
  showAll: boolean = true;
  show: Array<any> = [];
  despensa: any = [];
  textoToggleShowAll: string = 'Listar por ingredientes da despensa';

  constructor(private receitaService: ReceitaService, private nav: NavController){}
  
  private subscription;

  ionViewWillEnter() {
    this.subscription = this.receitaService.getReceitas().subscribe(retorno => {
      this.receitas = retorno;
      this.updateList();
    });
    auth().onAuthStateChanged(usuario => {
      if (usuario) {
        firestore().collection('usuarios').doc(usuario.uid).get().then(resultado => {
          if (resultado.data()){
            this.user = resultado.data();
            if (this.user.despensa)
              this.despensa = this.user.despensa;
          }
        })
      } else {
        this.nav.navigateBack('conta');
      }
    });
  }
  
  toggleShowAll () {
    this.showAll = !this.showAll;
    this.updateList();
  }

  updateList () {
    this.textoToggleShowAll = this.showAll ? 'Listar por ingredientes da despensa' : 'Listar todas as receitas';
    this.show = [];
    if (this.showAll) {
      this.show = this.receitas;
    } else {
      this.show = this.receitas.filter(r => r.ingredientes.every(i => this.despensa.indexOf(i) >= 0))
    }
  }
  
  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }
}