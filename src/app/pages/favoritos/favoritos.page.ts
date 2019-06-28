import { Component } from '@angular/core';
import { auth } from 'firebase';
import { ReceitaService, Receita } from 'src/service/receita.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage {
  favoritos: Array<string> = [];
  receitas: Array<any> = [];
  show: Array<Receita> = [];

  constructor(private receitaService: ReceitaService, private db: AngularFirestore, private nav: NavController){}
  
  private receitasSubscription;
  private usuarioSubscription;
  private id: any;
  

  ionViewDidEnter(){
    auth().onAuthStateChanged(usuario => {
      if (usuario) {
        this.id = usuario.uid;
        this.receitasSubscription = this.receitaService.getReceitas().subscribe(retorno => {
          this.receitas = retorno;
        });
        this.usuarioSubscription = this.db.collection('usuarios').doc<any>(this.id).valueChanges().subscribe(usuario => {
          this.show = [];
          if (usuario.favoritos) 
            this.favoritos = usuario.favoritos;
          this.favoritos.forEach(f => this.show.push(...this.receitas.filter(receita => receita.id === f)));
        })
      } else {
        this.nav.navigateBack('conta');
      }
    })
  };
  
  ionViewWillLeave() {
    if (this.receitasSubscription) this.receitasSubscription.unsubscribe();
    if (this.usuarioSubscription) this.usuarioSubscription.unsubscribe();
 }
}
