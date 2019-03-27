import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserSupportPage } from './user-support';

@NgModule({
  declarations: [
    UserSupportPage,
  ],
  imports: [
    IonicPageModule.forChild(UserSupportPage),
  ],
})
export class UserSupportPageModule {}
