import { DocumentReference } from '@angular/fire/firestore/interfaces';

export interface FlFile {
  ref: DocumentReference;
  contentType: string;
  file: string;
  folderId: DocumentReference;
  id: string;
}
