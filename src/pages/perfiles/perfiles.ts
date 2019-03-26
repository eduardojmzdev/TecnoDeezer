import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlaylistPage } from '../playlist/playlist';
import {DeezerServiceProvider} from "../../providers/deezer-service/deezer-service";
import 'rxjs/add/operator/map';


@IonicPage()
@Component({
  selector: 'page-perfiles',
  templateUrl: 'perfiles.html',
  providers:[ DeezerServiceProvider],
})
export class PerfilesPage {
  public users= [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public ds: DeezerServiceProvider) {
  }

  ionViewDidLoad() {
    this.ds.getUsers().subscribe(usersIDs =>{
      usersIDs.map(userID=>{
        this.ds.getUserDetail(userID).subscribe(userData=>{
          this.users.push(userData);
          console.log(userData);
        })
      })
    });
  }

  gotoPlaylist(user){
    this.navCtrl.push(PlaylistPage,{user: user});
    // console.log("Prueba");
  }

}
