import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CancionesPage } from '../canciones/canciones';

@IonicPage()
@Component({
  selector: 'page-playlist',
  templateUrl: 'playlist.html',
})
export class PlaylistPage {
  public userID:  number;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.userID = this.navParams.get('userID');
    console.log(this.userID);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlaylistPage');
  }

  gotoCanciones(playlistID){
    this.navCtrl.push(CancionesPage,{playlistID: playlistID})
  }

}
