import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController} from 'ionic-angular';


import * as firebase from 'firebase';
import { FIREBASE_CONFIG, snapshotToArray} from '../../app/enviroment';
import { Item_User,StorageProvider} from '../../providers/storage/storage';

/**
 * Generated class for the UserSupportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-support',
  templateUrl: 'user-support.html',
})
export class UserSupportPage {
  message=null;
  userinsqlite:Item_User[]=[];
  edt_message:string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertController: AlertController,
    private storage: StorageProvider,
    private toastController: ToastController) {
      this.storage.getItems().then(item=>{
        this.userinsqlite=item;
        let refinbox =firebase.database().ref('inbox/').orderByChild('id_inbox').equalTo(item["numberphone"])
          refinbox.on('value',resp=>{
          this.message=snapshotToArray(resp);
        });
      })
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HotroPage');
  }
  btn_Send(){
    if(this.edt_message.length>0){
    firebase.database().ref('inbox/').push({id_inbox:this.userinsqlite["numberphone"],numberphone:this.userinsqlite["numberphone"],content:this.edt_message,class:"c02"});
    this.edt_message="";
    }
  }
}
