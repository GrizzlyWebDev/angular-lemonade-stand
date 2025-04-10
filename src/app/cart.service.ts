import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import LemonadeStand from './interfaces/LemonadeStand';
import { HttpClient } from '@angular/common/http';
import Order from './interfaces/Order';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private customerNameSource = new BehaviorSubject<string>('');
  customerName = this.customerNameSource.asObservable();

  private customerPhoneNumberSource = new BehaviorSubject<string>('');
  customerPhoneNumber = this.customerPhoneNumberSource.asObservable();

  private selectedStandSource = new BehaviorSubject<LemonadeStand | undefined>(
    undefined
  );
  selectedStand = this.selectedStandSource.asObservable();

  private standOptionsSource = new BehaviorSubject<LemonadeStand[]>([]);
  selectedStandOptions = this.standOptionsSource.asObservable();

  private totalPriceSource = new BehaviorSubject<number>(0);
  currentTotalPrice = this.totalPriceSource.asObservable();

  constructor(private httpClient: HttpClient) {}

  loadLemonadeStands() {
    return this.httpClient.get<LemonadeStand[]>(
      'http://localhost:8080/lemonadestands'
    );
  }

  placeOrder(order: Order) {
    return this.httpClient.post<Order>('http://localhost:8080/orders', order);
  }

  updateCustomerName(name: string) {
    this.customerNameSource.next(name);
  }

  updateCustomerPhoneNumber(phoneNumber: string) {
    this.customerPhoneNumberSource.next(phoneNumber);
  }

  updateSelectedStand(stand: LemonadeStand) {
    this.selectedStandSource.next(stand);
  }

  updateStandOptions(stands: LemonadeStand[]) {
    this.standOptionsSource.next(stands);
  }

  updateTotalPrice(totalPrice: number) {
    this.totalPriceSource.next(totalPrice);
  }
}
