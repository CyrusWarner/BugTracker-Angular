import { UserToken } from './../models/user-models';
import { Injectable } from "@angular/core";

@Injectable()
export class LocalStorageService {

  constructor() {}

  // used to retrieve any item from the localStorage
  getItemInLocalStorage(key: string){
    let storedItem = localStorage.getItem(key)
    let item;
    if(storedItem) {
      item = JSON.parse(storedItem)
      return item
    }
    return null
  }

  storeItemInLocalStorage(key: string, value: any){
    localStorage.setItem(key, JSON.stringify(value))
  }
}
