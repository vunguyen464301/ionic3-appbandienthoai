import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserSupportListPage } from './user-support-list';

@NgModule({
  declarations: [
    UserSupportListPage,
  ],
  imports: [
    IonicPageModule.forChild(UserSupportListPage),
  ],
})
export class UserSupportListPageModule {}
