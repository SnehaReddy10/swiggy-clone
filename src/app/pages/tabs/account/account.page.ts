import { getLocaleDateFormat } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit, OnDestroy {

  profile: any = {};
  isLoading: boolean;
  orders : any[] = [];
  ordersSub: Subscription;

  constructor(
    private orderService: OrderService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.ordersSub = this.orderService.orders.subscribe(order => {
      console.log('order', order);
      if(order instanceof Array){
         this.orders = order;
      }else{
        if(order?.delete){
          this.orders = this.orders.filter(x => x.id != order.id);
        }else if(order?.update){
          const index = this.orders.findIndex(x => x.id == order.id);
          this.orders[index] = order;
        }else{
          this.orders = this.orders.concat(order);
        }
      }
    }, e => {
      console.log(e);
    });
    this.getData();
  }

  
  logout(){

  }

  async getData(){
    this.isLoading = true;
    setTimeout(async ()=> {
      this.profile = {
        name: "Sneha Reddy",
      phone: '7631873818',
      email: "sr@gmail.com"
      };
      await this.orderService.getOrders();
      this.isLoading = false;
    }, 3000);
  }

  async reorder(order){
      let data: any = await this.cartService.getCart();
    if (data?.value) {
      this.cartService.alertClearCart(null, null, null, order);
    }
    else{
      this.cartService.orderToCart(order);
    }
  }

  help(order){
      console.log(order);
  }

  ngOnDestroy() {
    if(this.ordersSub) this.ordersSub.unsubscribe();
  }

}


