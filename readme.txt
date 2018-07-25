IONIC

-Framework
-Codigo abierot
-Basado en tecnologias web
-Desarrollo de aplicacione moviles
-Multiplataformas
-Cordova

-Ionic Creator (Prototype)
-Ionic Cloud
-Ionic Native
-Ionic View

Install Node
Install Git
Install Ionic y Cordova
	>npm install -g ionic cordova

Crear Proyecto
	>ionic start "name_Project" plantilla version
	>ionic start TecnoDeezer blank --v2

>ionic info
>ionic Phalcon\DI\Service;

package.json 	-	Gestore de Depenedencias
config.xml 	-	Configuracion de compilacion en ios o andoid, plugins, version.
tsconfig.json y tslint.json 	-	Cofiguracion del TypeScript
ionic.config.json 	-	Configuracion ionic (comandos ionic)

src
	index.html - Se agergan js y css

	<ion-app>  - Modulo Principal	app,module.ts

3 - Hola Ionic
Crear una pagina

>ionic g page "nombre_pagina"
>ionic g page Inicio

>In app.component.ts  

	import { InicioPage } from "../pages/iniio/iniciohome";

	rootPage:nay = InicioPage;

>In app.html 

	<ion-nav [root]="rootPage"></ion-nav>

	root :Page ->El componente de página para cargar como página raíz dentro de este navegador.

4 - Menu
>Crear las Paginas Perfiles, Contacto, Acerca e importarlas en el app.module.ts
>app.component.ts

import { Component, ViewChild } from '@angular/core';
import { Platform,Nav } from 'ionic-angular';
import { InicioPage } from '../pages/inicio/inicio';
import { PerfilesPage } from '../pages/perfiles/perfiles';
import { ContactoPage } from '../pages/contacto/contacto';
import { AcercaPage } from '../pages/acerca/acerca';

 @ViewChild("NAV") nav : Nav;
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
}
gotoPage(page){
  this.nav.setRoot(page);
}
>app.html

<ion-menu [content] ="NAV">
    <ion-content>
        <img src="/assets/images/cover.jpg" alt="">
        <ion-list>  
            <button ion-item *ngFor="let page of pages" (click)="gotoPage(page.component)" menuClose>
                <ion-icon name="{{page.icon}}"> </ion-icon> {{page.titulo}}
            </button>
        </ion-list>
    </ion-content>
</ion-menu>
<ion-nav #NAV [root]="rootPage"></ion-nav>


Nota: El componente <ion-menu> se integra al selector NAV al igual que el @ViewChild

	[content]="NAV"	-	@ViewChild("NAV") nav : Nav;	-	#NAV

5 - Slides, Formulario y Estilos

ion-slide
ion-list
ion-input
ion-textarea
ion-checkbox

6 - Listas, Items y Navegacion

ion-avatar

>ionic g page Playlist
>ionic g page Canciones

-Import PlaylistPage y CancionesPage a app.mpdule
-En perfiles.ts enviamos el userID atraves del navCtrl

import { PlaylistPage } from '../playlist/playlist';
 
 gotoPlaylist(userID){
    this.navCtrl.push(PlaylistPage,{userID: userID});
  }

-En playlist.ts obtenemos el userID atraves del navParams

export class PlaylistPage {
  public userID:  number;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.userID = this.navParams.get('userID');
    console.log(this.userID);
  }

  gotoCanciones(playlistID){
    this.navCtrl.push(CancionesPage,{playlistID: playlistID})
  }

}
