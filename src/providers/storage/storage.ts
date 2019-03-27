//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export interface Item_User {
  numberphone: string,
  password: string
  privilege: number;
}

const ITEMS_KEY = 'my-user';
@Injectable()
export class StorageProvider {

  constructor(private storage: Storage) {
    console.log('Hello StorageProvider Provider');
  }
// set
setItem(item: Item_User): Promise<any> {
       return this.storage.set(ITEMS_KEY, item);
  
}

// READ
getItems(): Promise<Item_User[]> {
  return this.storage.get(ITEMS_KEY);
}

// DELETE
deleteItem(): Promise<Item_User> {
  return this.storage.set(ITEMS_KEY, null);

}

}

