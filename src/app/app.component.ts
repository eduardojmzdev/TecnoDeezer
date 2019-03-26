import { Component, ViewChild } from '@angular/core';
import { Platform,Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { InicioPage } from '../pages/inicio/inicio';
import { PerfilesPage } from '../pages/perfiles/perfiles';
import { ContactoPage } from '../pages/contacto/contacto';
import { AcercaPage } from '../pages/acerca/acerca';
import { PlaylistPage } from '../pages/playlist/playlist';
import { CancionesPage } from '../pages/canciones/canciones';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild("NAVx") nav : Nav;
  // rootPage:any = HomePages
  public rootPage:any;
  public pages:Array<{titulo:string, component:any, icon:string}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    this.rootPage= InicioPage;
    this.pages= [
      { titulo: "Inicio",                     component: InicioPage , icon:"home"},
      { titulo: "Perfiles Deezer", component: PerfilesPage , icon:"person"},
      { titulo: "Contacto",             component: ContactoPage , icon:"mail"},
      { titulo: "Acerca de",            component: AcercaPage , icon:"information-circle"}
    ];
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  gotoPage(page){
    this.nav.setRoot(page);
  }
}

