import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['pages/home/home.page.scss'],
})
export class AppComponent {
  public appPages = [
    {
      title: 'Conta',
      url: '/conta-detalhes',
      icon: 'md-person'
    },
    {
      title: 'Recomendações',
      url: '/home',
      icon: 'restaurant'
    },
    {
      title: 'Favoritos',
      url: '/favoritos',
      icon: 'md-star'
    },
    {
      title: 'Busca',
      url: '/busca',
      icon: 'search'
    },
    {
      title: 'Despensa',
      url: '/despensa',
      icon: 'ios-basket'
    },
    {
      title: 'Adicionar receita',
      url: '/adicionar',
      icon: 'add-circle'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
