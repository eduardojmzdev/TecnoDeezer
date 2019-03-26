import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CancionesPage } from '../canciones/canciones';
import {DeezerServiceProvider} from "../../providers/deezer-service/deezer-service";
// import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-playlist',
  templateUrl: 'playlist.html',
  providers:[ DeezerServiceProvider],
})
export class PlaylistPage {
  public user:  any;
  public playlists= [];
  constructor(public navCtrl: NavController, public navParams: NavParams,public ds: DeezerServiceProvider) {
    this.user = this.navParams.get('user');
    console.log(this.user);
  }

  ionViewDidLoad() {
    this.ds.getUserPlaylists(this.user.id).subscribe(playlists=>{
      console.log(playlists);
      playlists.data.map(playlist=>{
        this.playlists.push(playlist);
      });
    });
  }

  gotoCanciones(playlist){
    this.navCtrl.push(CancionesPage,{playlist: playlist})
  }

}
