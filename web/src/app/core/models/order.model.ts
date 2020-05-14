import { DocumentReference } from '@angular/fire/firestore/interfaces';
import { firestore } from 'firebase/app';

export interface Order {
  ref?: DocumentReference;
  createdAt?: firestore.Timestamp;
  updatedAt?: firestore.Timestamp;
  name: string;
  phone: number;
  address: string;
  zone: string;
  zoneReferenece: DocumentReference;
  zoneCharge: number;
  email: string;
  location: firestore.GeoPoint;
  total: number;
  subtotal: number;
  status: number;
}

export interface OrderDetail {
  productReference: DocumentReference;
  productName: string;
  productCost: number;
  productSale: number;
  quantity: number;
  subtotal: number;
}
