import { UserToken } from './../models/user-models';
import { Injectable } from "@angular/core";

@Injectable()
export class LocalStorageService {

  constructor() {}

  getItemInLocalStorage(key: string): UserToken | null {
    let storedUserToken = localStorage.getItem(key)
    let token: UserToken
    if(storedUserToken) {
      token = JSON.parse(storedUserToken)
      return token
    }
    return null
  }

  storeItemInLocalStorage(key: string, value: any){
    localStorage.setItem(key, JSON.stringify(value))
  }
}
