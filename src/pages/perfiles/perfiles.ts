import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlaylistPage } from '../playlist/playlist';


@IonicPage()
@Component({
  selector: 'page-perfiles',
  templateUrl: 'perfiles.html',
})
export class PerfilesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilesPage');
  }

  gotoPlaylist(userID){
    this.navCtrl.push(PlaylistPage,{userID: userID});
    // console.log("Prueba");
  }

}
