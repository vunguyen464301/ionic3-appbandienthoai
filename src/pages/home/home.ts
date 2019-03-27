import { Component } from '@angular/core';
import { NavController, ItemSliding , AlertController, ToastController, DateTime ,Platform, ActionSheetController, LoadingController} from 'ionic-angular';

import { PhoneDetailsPage} from '../phone-details/phone-details';
import {AdminSupportPage} from '../admin-support/admin-support';
import {OrderPage} from '../order/order';
import {OrderListPage} from '../order-list/order-list';
import {UserSupportListPage} from '../user-support-list/user-support-list';
import {UserPage} from '../user/user';
import {UserSupportPage} from '../user-support/user-support';

import * as firebase from 'firebase';
import { FIREBASE_CONFIG, snapshotToArray} from '../../app/enviroment';
import { Item_User, StorageProvider} from '../../providers/storage/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  logintitle="Login/SignUp";
  userinsqlite: Item_User[] = [];

  phonecompany=[];
  phone=[];

  numberphone="Please Login";
  refPhoneCompany =firebase.database().ref('company/')
  constructor(
    public navCtrl: NavController,
    public alertController: AlertController,
    private storage: StorageProvider,
    private toastController: ToastController,
    private platform:Platform,
    private actionsheetCtrl:ActionSheetController,
    private loadingCtrl:LoadingController) {
    this.refPhoneCompany.on('value',resp=>{
      this.phonecompany=snapshotToArray(resp);
    });     
    this.storage.getItems().then(items => {
      this.userinsqlite = items;
      if(this.userinsqlite!==null){
        this.logintitle="Log Out";
        this.numberphone="Hello "+this.userinsqlite["numberphone"]; 
      }
    });
    this.PresentLoading(2000);
  }
  btn_PhoneDetails(key){
    this.navCtrl.push(PhoneDetailsPage,{key:key});
  } 
  btn_Order(item){
    var dem=0;
    if(this.userinsqlite!==null){
      let d = new Date();
      let h = d.getHours();
      let m =d.getMinutes();
      let date=d.getDate();
      let month=d.getMonth()+1;
      let years=d.getFullYear();
      let time=month+"/"+date+"/"+years+":"+h+":"+m;
      let arr=null;
      let refallorder=firebase.database().ref('order/').orderByChild("numberphone").equalTo(this.userinsqlite["numberphone"]);
      refallorder.on('value',resp=>{
        dem=dem+1;
        arr=snapshotToArray(resp);
        if(arr.length<3 &&dem==1){
          if(item.amount>0){
            firebase.database().ref('order/').push({id_phone:item.key,numberphone:this.userinsqlite["numberphone"],phone_name:item.phone_name,time:time});
            firebase.database().ref('phone/'+item.key).update({details:item.details,price:item.price,operating_system:item.operating_system,image:item.image,id_company:item.id_company,amount:item.amount-1,phone_name:item.phone_name});
            this.ShowToast("Ordered !");
            }else {
              this.Notification("It's Over !")
          }
        }else if(dem===1){
          this.Notification("If you have placed more than 3 products, please come to the store to confirm the purchase or cancel the product to be reserved !")
        }
      });
     
    }else{
     this.Notification("Please login to order !");
    }
  }
 
  btn_Login(){
    if(this.logintitle==="Log Out"){
      this.logintitle="Login/SignUp";
      this.storage.deleteItem().then(item=>{
        this.ShowToast('Logged out!')
        this.LoadUserInSQLite();
        this.numberphone="Please Login";
      })
    }else{
      this.Login_User();
    }

  }
  onSearch(event){
    console.log(event.target.value);
    let refphone =firebase.database().ref('phone/').orderByChild("phone_name").equalTo(event.target.value);
    refphone.on('value',resp=>{
      this.phone=snapshotToArray(resp);
    }); 
  }
  btn_SeeAll(){
    let refphone =firebase.database().ref('phone/');
    refphone.on('value',resp=>{
      this.phone=snapshotToArray(resp);
    });
  }
  btn_Sort(){
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Sort By',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Reduced price',
          icon: !this.platform.is('ios') ? 'trending-down' : null,
          handler: () => {
          for(var i=0;i<this.phone.length-1;i++){
              for(let j=i+1;j<this.phone.length;j++){
                if(this.phone[i].price_number<this.phone[j].price_number){
                  let tam =this.phone[i];
                  this.phone[i]=this.phone[j];
                  this.phone[j]=tam;
                }
              }
            }
          }
        },
        {
          text: 'Price increases',
          icon: !this.platform.is('ios') ? 'trending-up' : null,
          handler: () => {
            for(var i=0;i<this.phone.length-1;i++){
              for(let j=i+1;j<this.phone.length;j++){
                if(this.phone[i].price_number>this.phone[j].price_number){
                  let tam =this.phone[i];
                  this.phone[i]=this.phone[j];
                  this.phone[j]=tam;
                }
              }
            }
            
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  
  }

  btn_PhoneCompany(key){
    let refphone =firebase.database().ref('phone/').orderByChild("id_company").equalTo(parseInt(key));
    refphone.on('value',resp=>{
      this.phone=snapshotToArray(resp);
    });
   //this.PresentLoading(100);
  }  
    async Notification(str) {
    const alert = await this.alertController.create({
      message: str,
      buttons: ['OK']
    });
    return await alert.present();
  }    
  async ShowToast(str) {
    const toast = await this.toastController.create({
      message: str,
      duration: 1000
    });
    toast.present();
  }
  PresentLoading(str) {
    const loader = this.loadingCtrl.create({
      content: "Loading...",
      duration: str
    });
    loader.present();
  }
  
  Login_User(){
    const prompt = this.alertController.create({
      title: 'Login',
      message: "Please enter your phone number and password !",
      inputs: [
        {
          name: 'numberphone',
          placeholder: "Enter your phone number",
        },
        {
          name: 'password',
          placeholder: "Enter your password",
          type: 'password'
        },
      ],
      buttons: [{
          text: 'Sign Up',
          handler: data => {
            this.Signup_User();
          }
        },
        {
          text: 'Login',
          handler: data => {
            console.log(data)
            if(data.numberphone.length==0||data.password.length==0){
              if(data.numberphone.length==0&&data.password.length==0){
                this.Notification("Do not leave the phone number blank !")
                this.Notification("Do not leave the phone number and password blank !")
              }else if(data.numberphone.length==0){
              }else{
                this.Notification("Do not leave the password blank !")
              }
            }else{
              let account=null;
              let refaccount =firebase.database().ref('account/').orderByChild("numberphone").equalTo(data.numberphone);
              refaccount.on('value',resp=>{
                account=snapshotToArray(resp);
                if(account.length===0){
                  this.Notification("Account does not exist !");
                } 
                else if(account[0].password !== data.password){
                  this.ShowToast("Password is incorrect !")
                }else{
                  this.logintitle="Log Out";
                  let saveData={
                    numberphone:data.numberphone,
                    password:data.password,
                    privilege:account[0].privilege
                  }
                  this.storage.setItem(saveData).then(item => {
                    this.ShowToast('Saved!')
                    this.LoadUserInSQLite();
                  });
                  console.log(saveData)
                  this.numberphone="Hello "+saveData.numberphone;
                }   
              });
           } 
                     
          }
          }
        
      ]
    });
    prompt.present();
  }  
  Signup_User(){
    let dem=0;  
    const prompt = this.alertController.create({
        title: 'Login',
        message: "Please enter your phone number and password !",
        inputs: [
          {
            name: 'numberphone',
            placeholder: "Enter your phone number",
          },
          {
            name: 'password1',
            placeholder: "Enter password",
            type: 'password'
          },
          {
            name: 'password2',
            placeholder: "Re-enter the password again",
            type: 'password'
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              console.log('Cancel');
            }
          },
          {
            text: 'Sign Up',
            handler: data => {
              if(data.numberphone.length==0||data.password1.length==0||data.password2.length==0){
                if(data.numberphone.length==0&&data.password1.length==0){
                  this.Notification("Do not leave your phone number and password blank !")
                }else if(data.numberphone.length==0){
                  this.Notification("Do not leave your phone number blank !")
                }else{
                  this.Notification("Do not leave your password blank !")
                }
              }else if(data.password1!==data.password2){
                this.Notification("Incorrect password !");
              }
              else {
                let arrdata={
                  numberphone: data.numberphone,
                  password: data.password1,
                  privilege: 2
                }
                let account=null;
                let refaccount =firebase.database().ref('account/').orderByChild("numberphone").equalTo(data.numberphone);
                refaccount.on('value',resp=>{
                    account=snapshotToArray(resp);
                  if(account.length!==0){
                    this.ShowToast("Registration failed, account exists !");
  
                  }
                  else{
                      firebase.database().ref('account/').push(arrdata);
                      this.ShowToast("Successful registration, please login again !"); 
                  }                 
                });
              }   
            }
            }        
        ]
      });
      prompt.present();
    }


  // READ
  LoadUserInSQLite() {
    this.storage.getItems().then(items => {
    this.userinsqlite = items;  
    });
  }
}
