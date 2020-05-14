import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private storage: AngularFireStorage
  ) { }

  getImage(fileName: string) {
    return this.storage
      .ref(`${environment.flamelinkStorage + fileName}`)
      .getDownloadURL();
  }
}
