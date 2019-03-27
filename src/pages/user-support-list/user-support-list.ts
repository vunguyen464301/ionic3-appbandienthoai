import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController, ToastController} from 'ionic-angular';

import * as firebase from 'firebase';
import { FIREBASE_CONFIG, snapshotToArray} from '../../app/enviroment';
import { Item_User,StorageProvider} from '../../providers/storage/storage';
import { AdminSupportPage } from '../admin-support/admin-support';

/**
 * Generated class for the UserSupportListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-support-list',
  templateUrl: 'user-support-list.html',
})
export class UserSupportListPage {
  listaccount=null;
  numberphone=null;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertController: AlertController,
    private storage: StorageProvider,
    private toastController: ToastController) {
      let reflistaccount =firebase.database().ref('account/').orderByChild("privilege").equalTo(2);
      reflistaccount.on('value',resp=>{
      this.listaccount=snapshotToArray(resp);
    });

  }
  btn_Click(numberphone){
    this.navCtrl.push(AdminSupportPage,{numberphone:numberphone});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuanlyhotroPage');
  }

}
