import { Injectable } from "@angular/core";

@Injectable()
export class LocalStorageService {

  constructor() {}

  getItemInLocalStorage(key: string): string | null {
    let storedUser = localStorage.getItem(key)
    let token: string
    if(storedUser) {
      token = JSON.parse(storedUser)
      return token
    }
    return null
  }

  storeItemInLocalStorage(key: string, value: any){
    localStorage.setItem(key, JSON.stringify(value))
  }
}
