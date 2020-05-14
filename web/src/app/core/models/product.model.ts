import { DocumentReference } from '@angular/fire/firestore/interfaces';

export interface Product {
  ref: DocumentReference;
  name: string;
  cost: number;
  sale: number;
  photoUrl: string;
  photo: any;
}
