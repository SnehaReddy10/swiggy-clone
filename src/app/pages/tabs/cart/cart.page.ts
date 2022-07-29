import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { IonContent, NavController } from '@ionic/angular';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  @ViewChild(IonContent, {static: false}) content: IonContent;
  urlCheck : any;
  url : any;
  model : any = {};
  deliveryCharge = 20;
  instruction: any;
  location: any = {};
  cartSub: Subscription;

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private orderService: OrderService,
    private global: GlobalService,
    private cartService: CartService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    console.log("ngOnInit");
    this.cartSub = this.cartService.cart.subscribe(cart => {
      this.model = cart;
      console.log('model: ', this.model); 
      if(!this.model) this.location = {};
    });
    this.getData();
  }

  async getData(){
    await this.checkUrl();
    this.location = {
      lat: 28.653831,
      lng: 77.188257,
      address: 'Karol bagh, New Delhi'
    }
    await this.cartService.getCartData();
  }

  checkUrl(){
    let url: any = this.router.url.split('/');
    const spliced = url.splice(url.length - 2, 2);
    this.urlCheck = spliced[0];
    // console.log('urlcheck', this.urlCheck);
    url.push(this.urlCheck);
    this.url = url;
    // console.log('url', this.url.urlCheck);
  }

  getPreviousUrl(){
    return this.url.join('/'); 
  }

  quantityPlus(index){
    this.cartService.quantityPlus(index);
  }

  quantityMinus(index){
    this.cartService.quantityMinus(index);
  }

  clearCart(){
    return Storage.remove({key: 'cart'});
  }
  

  addAddress(){

  }

  changeAddress(){

  }

  async makePayment(){
    try{
        const data = {
          restaurant_id: this.model.restaurant.uid,
          instruction: this.instruction ? this.instruction : '',
          res: this.model.restaurant,
          order: JSON.stringify(this.model.items),
          time: moment().format('lll'),
          address: this.location,
          total: this.model.totalPrice,
          grandTotal: this.model.grandTotal,
          deliveryCharge: this.deliveryCharge,
          status: 'Created',
          paid: 'COD'
        }
        // console.log('Ordered', data);
        await this.orderService.placeOrder(data);
        //clear the cart
        await this.cartService.clearCart();
        this.global.successToast("Your Order Placed Successfully");
        this.navCtrl.navigateRoot(['tabs/account']);
    }catch(e){

    }
  }

  scrollToBottom(){
    this.content.scrollToBottom(500);
  }

  ionViewWillLeave(){
    console.log('ionviewwillLeave', this.model);
    if(this.model?.items && this.model?.items.length > 0){
      this.cartService.saveCart();
    }
  }
}
