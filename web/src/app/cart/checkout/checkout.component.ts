import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CartService } from '@services/cart/cart.service';
import { FirestoreService } from '@services/firestore/firestore.service';
import { Observable } from 'rxjs';
import { Zone } from '@models/zone.model';
import { tap } from 'rxjs/operators';
import { Order, OrderDetail } from '@models/order.model';
import { firestore } from 'firebase';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  form: FormGroup;
  zones$: Observable<Zone[]>;
  selectedZone: Zone;
  total = 0;
  location = false;
  latitude: number;
  longitude: number;
  order: Order;
  details: OrderDetail[] = [];

  constructor(
    private cartService: CartService,
    private firestoreService: FirestoreService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.zones$ = this.firestoreService.getZones();
    this.cartService.details$.subscribe(details => {
      this.details = details;
      details.forEach(d => this.total += d.subtotal);
    });
  }

  buildForm() {
    console.log('BuildForm');
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(8)]],
      address: ['', [Validators.required]]
    });
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.longitude = position.coords.longitude;
        this.latitude = position.coords.latitude;
        console.log('LAT,LNG', this.latitude, this.longitude);
      });
    } else {
      this.location = false;
    }
  }

  changeZone() {
    console.log('ChangeZone');
    console.log('Selected Zone', this.selectedZone);
  }

  checkout(event: Event) {
    console.log('CHECKOUT!');
    event.preventDefault();
    console.log('CHECKOUT 2');
    if (this.selectedZone !== undefined) {
      this.order = {
        name: this.form.get('name').value,
        phone: this.form.get('phone').value,
        address: this.form.get('address').value,
        zone: this.selectedZone.zone,
        zoneReferenece: this.selectedZone.ref,
        zoneCharge: this.selectedZone.charge,
        email: this.form.get('email').value,
        total: this.total + this.selectedZone.charge,
        subtotal: this.total,
        status: 1,
        location: new firestore.GeoPoint(this.latitude, this.longitude)
      };
      this.firestoreService.placeOrder(this.order, this.details)
        .then((res) => {
          console.log(res);
          this.cartService.clean();
          this.toastr.success(
            `Hemos recibido tú orden por un total de Q${this.order.total}.00 `,
            'Orden Recibida',
          );
          this.router.navigateByUrl('/');
        }).catch((error) => {
          this.toastr.error(
            `Parece que hubo un error con el código ${error.code}`,
            'Hubo un Error'
          );
        });
    } else {
      this.toastr.warning(
        'Debes seleccionar la zona o sector donde recibiras',
        'Datos Faltantes'
      );
    }
  }

}
