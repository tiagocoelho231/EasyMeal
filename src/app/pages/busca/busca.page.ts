import { Receita, ReceitaService } from '../../../service/receita.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-busca',
  templateUrl: 'busca.page.html',
  styleUrls: ['busca.page.scss'],
})
export class BuscaPage {
  receitas: Array<Receita> = [];
  busca: Array<object> = [];

  constructor(private receitaService: ReceitaService) { }

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

  ionViewWillEnter() {
    this.subscription = this.receitaService.getReceitas().subscribe(retorno => {
      this.receitas = retorno;
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
 }
}
