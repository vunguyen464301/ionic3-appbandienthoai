import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController, ToastController} from 'ionic-angular';

import * as firebase from 'firebase';
import { FIREBASE_CONFIG, snapshotToArray} from '../../app/enviroment';
import { Item_User,StorageProvider} from '../../providers/storage/storage';
/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  userinsqlite: Item_User[] = [];
  listorder=null;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertController: AlertController,
    private storage: StorageProvider,
    private toastController: ToastController) {

      this.storage.getItems().then(items => {
        this.userinsqlite = items;
        let reflistorder =firebase.database().ref('order/').orderByChild("numberphone").equalTo(this.userinsqlite["numberphone"])
        reflistorder.on('value',resp=>{
          this.listorder=snapshotToArray(resp);
        });
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DathangPage');
  }
  btn_Cancel(item){
    let arrTam;
    var dem=0;
   firebase.database().ref('order/'+item.key).remove()
    let refphone =firebase.database().ref('phone/').orderByKey().equalTo(item.id_phone);
    refphone.on('value',resp=>{
      dem=dem+1;
      arrTam=snapshotToArray(resp);
      let amountTam=arrTam[0].amount;
      let amount=amountTam+1;
      if(dem===1){
      firebase.database().ref('phone/'+arrTam[0].key).update({details:arrTam[0].details,price:arrTam[0].price,price_number:arrTam[0].price,operating_system:arrTam[0].operating_system,image:arrTam[0].image,id_company:arrTam[0].id_company,amount:amount,phone_name:arrTam[0].phone_name});
      this.ShowToast("Cancel success !");
      
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
