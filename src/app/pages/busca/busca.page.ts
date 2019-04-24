import { Receita, ReceitaService } from '../../../service/receita.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-busca',
  templateUrl: 'busca.page.html',
  styleUrls: ['busca.page.scss'],
})
export class BuscaPage implements OnInit {
  receitas: Receita[];
  busca: Array<object>;

  constructor(private receitaService: ReceitaService) { }

  private subscription;

  handleInputChange (value) {
    let resultado = this.receitas;
    const buscados = value.toLowerCase().split(' ');
    buscados.forEach(ingrediente => {
      resultado = resultado.filter(receita => receita.ingredientes.indexOf(ingrediente) > -1);
    });
    this.busca = resultado;
  }

  ngOnInit() {
    this.subscription = this.receitaService.getReceitas().subscribe(retorno => {
      this.receitas = retorno;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
