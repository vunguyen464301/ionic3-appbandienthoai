import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController ,Platform ,AlertController, ItemSliding } from 'ionic-angular';
import { Item_User,StorageProvider} from '../../providers/storage/storage';
import * as firebase from 'firebase';
import { FIREBASE_CONFIG, snapshotToArray} from '../../app/enviroment';
/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  userinsqlite: Item_User[] = [];
  numberphone:string;
  // name:string;
  // password:string;
  title:string;
  image:string;

  
//@ViewChild('mylist')mylist: List;
constructor(
  public navCtrl: NavController, 
  public navParams: NavParams,
  private storage: StorageProvider,
  private toastController: ToastController,
  private plt: Platform,
  public alertController: AlertController) {
    this.loadUser();    
}

ionViewDidLoad() {
  console.log('ionViewDidLoad TrangcanhanPage');
}

 // READ
loadUser() {
  let account;
  this.storage.getItems().then(items => {
    this.userinsqlite = items;
    this.numberphone=this.userinsqlite["numberphone"];
    if(this.userinsqlite["privilege"]===1){
      this.image="../assets/imgs/admin.png";
      this.title="Administrators"
    }else{
      this.image="../assets/imgs/member.png";
      this.title="Member"
    }
  });
}
async Notification(str) {
  const alert = await this.alertController.create({
    message: str,
    buttons: ['OK']
  });
  return await alert.present();
}

  // Helper
async ShowToast(msg) {
  const toast = await this.toastController.create({
    message: msg,
    duration: 1000
  });
  toast.present();
}
}
