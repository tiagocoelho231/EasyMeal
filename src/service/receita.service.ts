import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Receita {
  nome: string;
  ingredientes: object;
  preparo: string;
  imagem: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {

  //refere a alguma coleção do banco de dados
  private receitasColecao: AngularFirestoreCollection<Receita>
  //

  private receitas: Observable<Receita[]>

  constructor(db: AngularFirestore) {
    //refere a coleção específica que quero modificar do banco de dados
    this.receitasColecao = db.collection('receitas');

    this.receitas = this.receitasColecao.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          //console.log("data",{id, ...data});
          return { id, ...data };
        })
      })
    )
  }

  getReceitas() {
    return this.receitas;
  }

  getReceita(id) {
    return this.receitasColecao.doc<Receita>(id).valueChanges();
  }

  updateReceita(receita: Receita, id: string) {
    return this.receitasColecao.doc(id).update(receita);
  }

  addReceita(receita: Receita) {
    return this.receitasColecao.add(receita);
  }

  removeReceita(id) {
    return this.receitasColecao.doc(id).delete();
  }
}
