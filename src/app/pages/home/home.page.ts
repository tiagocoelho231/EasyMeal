import { Receita, ReceitaService } from '../../../service/receita.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  receitas: Receita[];

  constructor(private receitaService: ReceitaService){}
  
  private subscription;

  ngOnInit(){
    this.subscription = this.receitaService.getReceitas().subscribe(retorno => {
      this.receitas = retorno;
    });
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
 }

}