import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '@models/product.model';
import { FirestoreService } from '@services/firestore/firestore.service';
import { StorageService } from '@services/storage/storage.service';
import { CartService } from '@services/cart/cart.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  products$: Observable<Product[]>;

  constructor(
    private firestoreService: FirestoreService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.products$ = this.firestoreService.getProducts();
  }

  addToCart(product: Product) {
    this.cartService.addCart(product);
  }

}
