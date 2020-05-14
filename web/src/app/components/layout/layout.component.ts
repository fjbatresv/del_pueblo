import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { CartService } from '@services/cart/cart.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  total$: Observable<number>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cartService: CartService
  ) {
    this.total$ = this.cartService.cart$
      .pipe(
        map(products => products.length)
      );
  }

}
