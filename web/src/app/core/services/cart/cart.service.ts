import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Product } from '@models/product.model';
import { OrderDetail } from '@models/order.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private products: Product[] = [];
  private cartDetail: OrderDetail[] = [];
  private cart: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  private details: BehaviorSubject<OrderDetail[]> = new BehaviorSubject<OrderDetail[]>([]);

  cart$ = this.cart.asObservable();
  details$ = this.details.asObservable();

  constructor() { }

  addCart(product: Product) {
    this.products = [...this.products, product];
    this.cart.next(this.products);
    this.updateCartDetail(product);
  }

  updateCartDetail(product: Product) {
    let change: number;
    this.cartDetail.find((value, index) => {
      if (value.productReference.path === product.ref.path) {
        change = index;
      }
    });
    if (change !== undefined) {
      const detail: OrderDetail = this.cartDetail[change];
      detail.quantity++;
      detail.subtotal = detail.productSale * detail.quantity;
      this.cartDetail[change] = detail;
    } else {
      this.cartDetail.push({
        productCost: product.cost,
        productReference: product.ref,
        productName: product.name,
        productSale: product.sale,
        quantity: 1,
        subtotal: product.sale
      });
    }
    this.details.next(this.cartDetail);
  }

  clean() {
    this.products = [];
    this.cartDetail = [];
    this.cart.next(this.products);
    this.details.next(this.cartDetail);
  }
}
