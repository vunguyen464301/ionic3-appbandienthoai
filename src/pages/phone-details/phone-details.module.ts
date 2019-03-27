import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhoneDetailsPage } from './phone-details';

@NgModule({
  declarations: [
    PhoneDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PhoneDetailsPage),
  ],
})
export class PhoneDetailsPageModule {}
