import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DeezerServiceProvider} from "../../providers/deezer-service/deezer-service";

@IonicPage()
@Component({
  selector: 'page-canciones',
  templateUrl: 'canciones.html',
  providers:[ DeezerServiceProvider],
})
export class CancionesPage {
  public playlist: any;
  public songs= [];
  constructor(public navCtrl: NavController, public navParams: NavParams,public ds: DeezerServiceProvider) {
    this.playlist = this.navParams.get('playlist');
    console.log(this.playlist);
  }

  ionViewDidLoad() {
    this.ds.getPlaylistSongs(this.playlist.id).subscribe(tracklist=>{
      console.log(tracklist);
      tracklist.data.map(track=>{
        this.songs.push(track);
      })
    })
    // console.log('ionViewDidLoad CancionesPage');
  }

}
