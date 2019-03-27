import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController,ToastController} from 'ionic-angular';


import * as firebase from 'firebase';
import { FIREBASE_CONFIG, snapshotToArray} from '../../app/enviroment';
import { Item_User,StorageProvider} from '../../providers/storage/storage';
/**
 * Generated class for the PhoneDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-phone-details',
  templateUrl: 'phone-details.html',
})
export class PhoneDetailsPage {
  userinsqlite:Item_User[]=[];
  key;
  parameter;
  titlephonename=null;
  edt_cmt:string="";
  detail;
  comment=null;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertController: AlertController,
    private toastController:ToastController,
    private storage:StorageProvider) {
      let arrTam;
      this.key =this.navParams.get("key");
      
      let refphone =firebase.database().ref('phone/').orderByKey().equalTo(this.key);
      refphone.on('value',resp=>{
      this.detail=snapshotToArray(resp);
      this.titlephonename=this.detail[0].phone_name;

      arrTam=null;
      arrTam=this.detail[0].details;
      this.parameter=arrTam.split("\n");
    });
      let refcomment =firebase.database().ref('comment/').orderByChild('id_phone').equalTo(this.key);
      refcomment.on('value',resp=>{
        this.comment=snapshotToArray(resp);
      });
      this.storage.getItems().then(item=>{
        this.userinsqlite=item;  
      });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChitietdienthoaiPage');
  }
  btn_Order(key){
    console.log(key);
  }
  btn_Send(){
      if(this.userinsqlite!==null ){
        if(this.edt_cmt.length>0){
          firebase.database().ref('comment/').push({id_phone:this.key,numberphone:this.userinsqlite["numberphone"],content:this.edt_cmt});
          this.edt_cmt="";
        }
      }else{
        this.ShowToast("Please login to use this feature !")
      }
 
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
