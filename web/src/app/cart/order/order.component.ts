import { Component, OnInit } from '@angular/core';
import { CartService } from '@services/cart/cart.service';
import { OrderDetail } from '@models/order.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  displayedColumns: string[] = ['quantity', 'productName', 'subtotal'];
  details$: Observable<OrderDetail[]>;
  total = 0;

  constructor(
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    console.log('Order!');
    this.details$ = this.cartService.details$
      .pipe(
        tap(details => {
          details.forEach(d => this.total += d.subtotal);
        })
      );
  }

  cleanCart() {
    this.cartService.clean();
    this.router.navigateByUrl('/');
  }

}
