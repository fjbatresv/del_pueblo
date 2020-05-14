import { DocumentReference } from '@angular/fire/firestore/interfaces';

export interface Zone {
  ref: DocumentReference;
  zone: string;
  id: string;
  charge: number;
}
