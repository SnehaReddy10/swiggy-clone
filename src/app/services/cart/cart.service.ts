import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../api/api.service';
import { GlobalService } from '../global/global.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  model: any = {};
  deliveryCharge = 20;
  private _cart = new BehaviorSubject<any>(null);

  get cart() {
    return this._cart.asObservable();
  }

  constructor(private storage: StorageService, 
    private global: GlobalService, 
    private apiService: ApiService,
    private router: Router
    ) {}

  alertClearCart(index, items, data, order?){
    this.global.showAlert(
      order ? 
      'Would you like to reset your cart before re-ordereing from this restarant?' 
      : 
      "Your Cart contains items from a different restaurant. Would you like to reset you cart before browsing the other items",
      "Items already in cart",
      [
        {
          text: "No",
          role: 'Cancel',
          handler: () => {
            return;
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.clearCart();
            this.model = {};
            if(order){
              this.orderToCart(order);
            } else this.quantityPlus(index, items, data);
          }
        }
      ]
    );
  }

  async orderToCart(order){
    console.log('order', order);

    const data = {
      restaurant: order.restaurant,
      items: order.order,
    };

    this.model = data;
    await this.calculate();
    console.log('data2', data);


    this.saveCart();
    this._cart.next(this.model);
    this.router.navigate(['/', 'tabs', 'restaurants', order.restaurant.uid]);
  }

  async quantityPlus(index, items?, restaurant?) {
    try {
      if (items) this.model.items = [...items];
      if(restaurant) {
        this.model.restaurant = {}; 
        this.model.restaurant = restaurant
      };
      // this.model.items[index].quantity += 1;
      if (
        !this.model.items[index].quantity ||
        this.model.items[index].quantity == 0
      ) {
        this.model.items[index].quantity = 1;
        // this.calculate();
      } else {
        this.model.items[index].quantity += 1;
      }
      await this.calculate();
      this._cart.next(this.model);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async quantityMinus(index) {
    try {
      if (this.model.items[index].quantity !== 0) {
        this.model.items[index].quantity -= 1;
      } else {
        this.model.items[index].quantity = 0;
      }
      await this.calculate();
      this._cart.next(this.model);
    } catch (e) {}
  }

  async calculate() {
    let item = this.model.items.filter((x) => x.quantity > 0);
    this.model.items = item;
    this.model.totalPrice = 0;
    this.model.totalItem = 0;
    this.model.deliveryCharge = 0;
    this.model.grandTotal = 0;
    item.forEach((element) => {
      this.model.totalItem += element.quantity;
      this.model.totalPrice +=
        parseFloat(element.quantity) * parseFloat(element.price);
      // console.log(this.model.totalPrice);
    });
    this.model.deliveryCharge = this.deliveryCharge;
    this.model.totalPrice = parseFloat(this.model.totalPrice).toFixed(2);
    this.model.grandTotal = (
      parseFloat(this.model.totalPrice) + parseFloat(this.model.deliveryCharge)
    ).toFixed(2);
    if (this.model.totalItem == 0) {
      this.model.totalItem = 0;
      this.model.totalPrice = 0;
      this.model.grandTotal = 0;
      await this.clearCart();
      this.model = {};
    }
    // console.log('cart: ', this.model);
  }

  async clearCart() {
    this.global.showLoader();
    await this.storage.removeStorage('cart');
    this._cart.next(null);
    this.global.hideLoader();
  }

  async getCartData() {
    let data: any = await this.getCart();
    console.log('data', data);
    if (data?.value) {
      this.model = await JSON.parse(data.value);
      await this.calculate();
      this._cart.next(this.model);
    }
    // console.log('MODEL', this.model);
  }

  getCart() {
    return this.storage.getStorage('cart');
  }

  saveCart(model?) {
    console.log('model2', model);
    if (model) this.model = model;
    this.storage.setStorage('cart', JSON.stringify(this.model));
    // this._cart.next(this.model);
  }
}
