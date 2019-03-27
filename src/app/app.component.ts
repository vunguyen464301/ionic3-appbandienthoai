import { Component ,ViewChild} from '@angular/core';
import { Nav ,Platform ,AlertController,ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { EmailComposer} from '@ionic-native/email-composer';

import * as firebase from 'firebase';
import {FIREBASE_CONFIG ,snapshotToArray} from './enviroment'

import { HomePage } from '../pages/home/home';

import { Item_User,StorageProvider} from '../providers/storage/storage';
import {AdminSupportPage} from'../pages/admin-support/admin-support';
import {OrderPage} from'../pages/order/order';
import {OrderListPage} from'../pages/order-list/order-list';
import {UserSupportPage} from'../pages/user-support/user-support';
import { UserPage } from '../pages/user/user';
import { UserSupportListPage } from '../pages/user-support-list/user-support-list';

// #cordova platform add android
// #cordova platform add ios
// #cordova build android

//import { EmailComposer} from '@ionic-native/email-composer';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = HomePage;
  
  userinsqlite=null;
  
  pages: Array<{id: any,title: string}>;
  constructor(
    private platform: Platform, 
    private statusBar: StatusBar, 
    private splashScreen: SplashScreen,
    public alertController: AlertController,
    private storage: StorageProvider,
    private toastController: ToastController,
    private emailComposer: EmailComposer
    ){
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { id:1 ,title: 'Homepage'},
      { id:2 , title: 'UserPage'},
      { id:3 ,title: 'OrderPage'},
      { id:4 ,title: 'SupportPage'},
      { id:5 ,title: 'Help password'},
      { id:6 ,title: 'Feedback'}
      
    ];
    firebase.initializeApp(FIREBASE_CONFIG);
  }

   initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    //this.nav.setRoot(page.component);
    switch(page){
      case 1:
        this.nav.setRoot(HomePage);
      break;
      case 2:
  
      this.storage.getItems().then(items => {
        this.userinsqlite = items;

        if(this.userinsqlite===null){
          this.ShowToast('Please login to use this feature!');
        }else{
          this.nav.setRoot(UserPage);
        }
      });
        
        
      break;
      case 3:
      let account;
      this.storage.getItems().then(items => {
        this.userinsqlite = items;
        if(this.userinsqlite===null){
          this.ShowToast('Please login to use this feature!');
        }else{
            if(this.userinsqlite["privilege"]==2){
              this.nav.setRoot(OrderPage);
            }else{
              this.nav.setRoot(OrderListPage);
            } 
        }
      });
      break;

      case 4:
      this.storage.getItems().then(items => {
        this.userinsqlite = items;
        if(this.userinsqlite==null){
          this.ShowToast('Please login to use this feature!');
        }else{
            if(this.userinsqlite["privilege"]==2){
              this.nav.setRoot(UserSupportPage);
            }else{
              this.nav.setRoot(UserSupportListPage);
            } 
        }
      });
      break;

      case 5:
        let e5={
          to: 'vunguyen464301@gmail.com',
          subject:'Forget Password :',
          body: 'Write your numberphone and password !<br><br>\"' ,
          isHtml:true
        };
        this.emailComposer.open(e5);
      break;
      
      case 6:
      let email={
        to: 'vunguyen464301@gmail.com',
        subject:':',
        body: 'Feedback ?<br><br>\"' ,
        isHtml:true
      };
      this.emailComposer.open(email);
      
      break;

      default:

      break;
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
