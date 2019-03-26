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
>ionic serve      // Levanta un servidor
>ionic Phalcon\DI\Service;

package.json 	-	Gestore de Depenedencias
config.xml 	-	Configuracion de compilacion en ios o andoid, plugins, version.
tsconfig.json y tslint.json 	-	Cofiguracion del TypeScript
ionic.config.json 	-	Configuracion ionic (comandos ionic)
git.ignore	- Archivos ingnorados al subir cambios al git

Carpetas

www	-	Se crea al ejecutar ionic serve, es la carpeta que el servidor levantan en el explorador

resources - archivos, iconos o splash que se agergaran al compilar la app
plugins - plugins de cordova

src
	index.html - Se agergan js y css

	<ion-app>  - Modulo Principal	app,module.ts

3 - Hola Ionic

app.module.ts  Es el modulo pricipal de la aplicacion , en el se importan las dependencias de las paginas, componentes o librerias de terceros

app.component.ts En este archivo se tiene el componente pricipal

Crear una pagina

>ionic g page "nombre_pagina"
>ionic g page Inicio

>In app.component.ts

	import { InicioPage } from "../pages/inicio/iniciohome";

	rootPage:any = InicioPage;

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

7 - Servicios , Peticiones HTTP y Observables I

-Crear Servicio
>ionic g provider DeezerService

-Importar el servicio (DeezerServiceProvider) en perfiles.ts

  import {DeezerServiceProvider} from "../../providers/deezer-service/deezer-service";
  @Component({
    providers:[ DeezerServiceProvider],
  })

-Importar el HttpClientModule en app.module.ts para que funciones el HttpClient del servicio

  import { HttpClientModule } from '@angular/common/http';
  @NgModule({
    imports: [     HttpClientModule     ]
  }

-En deezer-service.ts
  @Injectable()
  export class DeezerServiceProvider {
  public deezerAPI: string;

  constructor(public http: HttpClient) {
    // this.deezerAPI="https://api.deezer.com/"
    this.deezerAPI="/deezerAPI/"; //URL para el proxy (local browser)
  }

NOTA: para evitar errores CORS en el navegador utilizaremos una configuracion proxy en el archivo ionic.config.json
  "proxies":[{
    "path": "/deezerAPI",
    "proxyUrl":"http://api.deezer.com/"
  }]

Para la version movil se utilizara la URL normal en el servicio
  this.deezerAPI="https://api.deezer.com/"

-Reiniciar el servidor para cagar el proxy
-Funciones para peticiones get
  getUsers(){
    var usersIDs: any;
    usersIDs = this.http.get("http://api.myjson.com/bins/w076v");
    return usersIDs;
  }

  getUserDetail(userID){
    var userData: any;
    userData = this.http.get(this.deezerAPI + "user/" + +userID);
    return userData;
  }

-En perfiles.ts

export class PerfilesPage {
  public users= [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public ds: DeezerServiceProvider) {
  }

  ionViewDidLoad() {
    this.ds.getUsers().subscribe(usersIDs =>{
      usersIDs.map(userID=>{
        this.ds.getUserDetail(userID).subscribe(userData=>{
          this.users.push(userData);
          // console.log(userData);
        })
      })
    });
  }

8 - Servicios , Peticiones HTTP y Observables I!

-En deezer-service

  getUserPlaylists(userID){
    var playlists: any;
    playlists = this.http.get(this.deezerAPI + "user/" +userID+"/playlists");
    return playlists;
  }
  
  getPlaylistSongs(playlistID){
    var tracklist: any;
    tracklist = this.http.get(this.deezerAPI + "playlist/" +playlistID+"/tracks");
    return tracklist;
  }

-En caciones.html

    <audio controls>
        <source src="{{song.preview}}">
      </audio>

9 -  Componentes I

-Crear componente

>ionic g component 'nameComponent'

-Importamos Input y OnInit al tecno-player.ts , implementamos la clase TecnoPlayerComponent a OnInit y agregamos la funcion ngOnInit()

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tecno-player',
  templateUrl: 'tecno-player.html'
})
export class TecnoPlayerComponent implements OnInit {
  @Input() text: string;

  constructor() {
  
  }
  ngOnInit(){
      console.log(this.text);
  }
}

NOTA: la funcion ngOnInit se ejecuta al instanciar la clase, se recomienda implementar la instrucciones necesarias para el arranque en esta funcion y no en el constructor.

-Agregamos el componente tecno-player al app.module
    import {TecnoPlayerComponent} from '../components/tecno-player/tecno-player';


@NgModule({
  declarations: [
    TecnoPlayerComponent
  ],
  entryComponents: [
    TecnoPlayerComponent
  ],


-Agregamos el componente a la vista canciones.html

  <ion-list>
      <tecno-player *ngFor="let song of songs"
        [titulo] = 'song.title'
        [artista] = 'song.artist.name'
        [album] = 'song.album.title'
        [cover] = 'song.album.cover'
        [audio] = 'song.preview'
      >
      </tecno-player>

  </ion-list>

- Agregamos el contenido del componente  en tecno-player.html

<ion-item >
  <ion-thumbnail item-left>
    <img src="{{cover}}" alt="">
  </ion-thumbnail>
  <h2>{{titulo}}</h2>
  <p>{{artista}} - {{album}}</p>
  <button ion-button clear large item-right (click)="togglePlay()"  [disabled]="!ready">
    <ion-icon *ngIf="!playing" name = "play"></ion-icon>
    <ion-icon *ngIf="playing" name = "pause"></ion-icon>
  </button>
</ion-item>

- La funcion tooglePlay() sera la encargada de reproducir o pausar el audio, y se habilitara hasta que el audio haya cargado mediante el atributo 'disabled' y la variable ready;
-Los botones de play y pause dependeran de la variable playing 

-Agregamos los input que guardan los datos enviados en el componente tecno-player.ts

export class TecnoPlayerComponent implements OnInit {
  @Input() titulo : string;
  @Input() artista : string;
  @Input() album : string;
  @Input() cover : string;
  @Input() audio : string;
  public audio: any;
  public ready: boolean;
  public playing: boolean;
}

constructor() {
  this.ready = false;
  this.playing = false;
}

  ngOnInit(){
      // console.log(this.titulo, this.artista, this.album, this.cover);
      this.audio = new Audio();
      this.audio.src = this.audiosrc;
      this.audio.load();

      this.audio.oncanplaythrough = () =>{
        this.ready = true;
      }
  }

  togglePlay(){
    if(!this.playing){
      this.audio.play();
    }else{
      this.audio.pause();
    }
    this.playing = !this.playing;
  }
}

10 - Componentes II

-Agregamos las varialbes audioPos y audioDuration para le funcionalidad del componente

  public audioPos; number;
  public audioDuration: number;

  constructor() {
    this.ready = false;
    this.playing = false;
    this.audioPos = 0;
  }

- se agregan las nuevas funcionalidades del elemnto audio
  ngOnInit(){      
      this.audio = new Audio();
      this.audio.src = this.audiosrc;
      this.audio.load();

      this.audio.oncanplaythrough = () =>{
        this.ready = true;
        this.audioDuration = this.audio.duration;
      }

      this.audio.ontimeupdate = (event) => {
        console.log(this.audio);
        this.audioPos = this.audio.currentTime;
        console.log(this.audioPos);
      }

      this.audio.onended = () => {
        this.audioPos = 0;
        this.playing = false;
      }
  }

-se agerga la barra de progreso en tecno-player.html

<progress value="{{audioPos}}" max="{{audioDuration}}"></progress> 
