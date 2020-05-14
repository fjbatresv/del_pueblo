import { Component } from '@angular/core';
import { FirestoreService } from './core/services/firestore/firestore.service';
import { Product } from './core/models/product.model';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { QueryDocumentSnapshot, DocumentData, QuerySnapshot } from '@angular/fire/firestore/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Del Pueblo';
}
