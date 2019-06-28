import { Receita, ReceitaService } from '../../../service/receita.service';
import { Component } from '@angular/core';
import { auth } from 'firebase';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-busca',
  templateUrl: 'busca.page.html',
  styleUrls: ['busca.page.scss'],
})
export class BuscaPage {
  receitas: Array<Receita> = [];
  busca: Array<object> = [];
  usuario = null;

  constructor(private receitaService: ReceitaService, private nav: NavController) { }

  private subscription;

  handleInputChange (value) {
    let resultado = this.receitas;
    const buscados = value.toLowerCase().split(',').map(i => i.trim());
    buscados.forEach(ingrediente => {
      if (ingrediente)
        resultado = resultado.filter(receita => receita.ingredientes.includes(ingrediente));
    });
    this.busca = resultado;
  }

  ionViewDidEnter() {
    auth().onAuthStateChanged(usuario => {
      if (usuario) {
        this.subscription = this.receitaService.getReceitas().subscribe(retorno => {
          this.receitas = retorno;
        });
      } else {
        this.nav.navigateBack('conta');
      }
    })
  }

  ionViewWillLeave() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
