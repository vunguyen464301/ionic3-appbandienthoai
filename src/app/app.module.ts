import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { StorageProvider } from '../providers/storage/storage';

import { PhoneDetailsPage} from '../pages/phone-details/phone-details';
import {AdminSupportPage} from '../pages/admin-support/admin-support';
import {OrderPage} from '../pages/order/order';
import {OrderListPage} from '../pages/order-list/order-list';
import {UserSupportListPage} from '../pages/user-support-list/user-support-list';
import {UserPage} from '../pages/user/user';
import {UserSupportPage} from '../pages/user-support/user-support';

import { IonicStorageModule } from '@ionic/storage';
import { EmailComposer} from '@ionic-native/email-composer';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PhoneDetailsPage,
    AdminSupportPage,
    OrderListPage,
    OrderPage,
    UserPage,
    UserSupportListPage,
    UserSupportPage
    ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PhoneDetailsPage,
    AdminSupportPage,
    OrderListPage,
    OrderPage,
    UserPage,
    UserSupportListPage,
    UserSupportPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    EmailComposer,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StorageProvider
  ]
})
export class AppModule {}
