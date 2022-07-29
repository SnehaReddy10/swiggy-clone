import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private _orders = new BehaviorSubject<any>(null);

  get orders(){
    return this._orders.asObservable();
  }

  constructor(
    private apiService: ApiService
  ) { }

  getOrders(){
    try{
      const orders = this.apiService.orders;
      // console.log(orders);
      this._orders.next(orders);
    } catch(e){
      throw(e);
    }
  }

  placeOrder(param){
    try{
      param.user_id = "1";
      param.order = JSON.parse(param.order);
      param.id = "kjcsnhush2";
      this._orders.next(param);
    } catch(e){
      throw(e);
    }
  }

  updataOrder(param){}


}
