import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

@Injectable()
export class DeezerServiceProvider {
  public deezerAPI: string;
  public headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods':'POST, GET, OPTIONS, PUT',
      'Accept':'application/json',
      'content-type':'application/json'
    });

  constructor(public http: HttpClient, private platform: Platform) {
    // console.log('Hello DeeserServiceProvider Provider');
    // this.deezerAPI="https://api.deezer.com/";

    this.deezerAPI="/deezerAPI/"; //URL para el proxy (local browser)

    // if (this.platform.is("core")){ 
    //   this.deezerAPI="/deezerAPI/"; //Este path debe coincidir con el path de proxy en ionic.config.json
    // }else{
    //   this.deezerAPI="https://api.deezer.com/";
    // }
  }

  getUsers(){
    var usersIDs: any;
    usersIDs = this.http.get("http://api.myjson.com/bins/w076v");
    return usersIDs;
  }

  getUserDetail(userID){
    var userData: any;
    userData = this.http.get(this.deezerAPI + "user/" +userID);
    // userData = this.http.get(this.deezerAPI + "user/" +userID,{'headers':this.headers });
    return userData;
  }

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

}
