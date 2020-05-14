import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { QuerySnapshot, QueryDocumentSnapshot, DocumentReference, DocumentSnapshot, DocumentData } from '@angular/fire/firestore/public_api';
import { Product } from '@models/product.model';
import { switchMap } from 'rxjs/operators';
import { StorageService } from '@services/storage/storage.service';
import { FlFile } from '@models/file.model';
import { Zone } from '@models/zone.model';
import { Order, OrderDetail } from '@models/order.model';
import { CartService } from '@services/cart/cart.service';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private aFirestore: AngularFirestore,
    private storage: StorageService,
    private cart: CartService
  ) {
  }

  getProducts() {
    return this.aFirestore
      .collection<Product[]>('fl_content', ref => ref.where('_fl_meta_.schema', '==', 'product'))
      .get()
      .pipe(
        switchMap(async (query: QuerySnapshot<Product>) => {
          const products = await query.docs.map<Product>((doc: QueryDocumentSnapshot<Product>) => {
            const prod: Product = doc.data();
            prod.ref = doc.ref;
            if (prod.photo) {
              this.getPhotoUrl(prod.photo[0]).then((photo: string) => prod.photoUrl = photo);
              return prod;
            } else {
              return prod;
            }
          });
          return products;
        })
      );
  }

  async getPhotoUrl(ref: DocumentReference) {
    const doc: DocumentData = await this.aFirestore.collection<FlFile>('fl_files')
      .doc(ref.id).get().toPromise();
    const flFile: FlFile = doc.data();
    flFile.ref = doc.ref;
    const result = await this.storage.getImage(flFile.file).toPromise();
    return result;
  }

  getZones() {
    return this.aFirestore
      .collection<Zone[]>('fl_content', ref => ref.where('_fl_meta_.schema', '==', 'zone'))
      .get()
      .pipe(
        switchMap(async (query: QuerySnapshot<Zone>) => {
          const zones: Zone[] = await query.docs.map((doc: QueryDocumentSnapshot<Zone>) => {
            const zone = doc.data();
            zone.ref = doc.ref;
            return zone;
          });
          return zones;
        })
      );
  }

  async placeOrder(order: Order, details: OrderDetail[]) {
    console.log('Placing order', 2);
    const id: string = this.aFirestore.createId();
    console.log('Placing order', 3);
    const orderRef: DocumentReference = this.aFirestore.collection('orders').doc(id).ref;
    console.log('Placing order', 4);
    const batch: firebase.firestore.WriteBatch = this.aFirestore.firestore.batch();
    console.log('Placing order', 5);
    order.createdAt = firestore.Timestamp.now();
    console.log('Placing order', 6);
    order.updatedAt = firestore.Timestamp.now();
    console.log('Placing order', 7);
    order.ref = orderRef;
    console.log('Placing order', 8);
    batch.set(orderRef, order);
    console.log('Placing order', 9);
    for (const detail of details) {
      const detailRef: DocumentReference = orderRef.collection('details').doc(this.aFirestore.createId());
      batch.set(detailRef, detail);
      console.log('Placing order', 10);
    }
    console.log('Placing order', 11);
    return batch.commit();
  }

}
