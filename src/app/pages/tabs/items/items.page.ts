import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { element } from 'protractor';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit, OnDestroy {

  id : any;
  data : any = {}
  items : any[] = [];
  veg : boolean = false;
  cartData : any = {};
  storedData : any = {};
  isLoading : boolean;
  model = {
    icon : 'fast-food-outline',
    title: 'No Menu Available'
  };
  // restaurants : any[] = []
  allItems : any[] = [];
  categories : any[] = [];
  cartSub: Subscription;
  routeSub: Subscription;
  

  constructor(
    private navCntrl : NavController,
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.routeSub = this.route.paramMap.pipe(take(1)).subscribe(paramMap => {
      // console.log('data', paramMap);
      if(!paramMap.has('restaurantId')){
          this.navCntrl.back();
          return;
      }
      this.id = paramMap.get('restaurantId');
      // console.log('id', this.id);
    });

    this.cartSub = this.cartService.cart.subscribe(cart => {
      this.cartData = {};
        this.storedData = {};
      if(cart && cart?.totalItem > 0){
        console.log('cart', cart);
        this.storedData = cart;
        // this.cartData.items = this.storedData.items;
        this.cartData.totalItem = this.storedData.totalItem;
        // console.log('totalItem: ', this.cartData.totalItem);
        this.cartData.totalPrice = this.storedData.totalPrice;
        if(cart?.restaurant?.uid == this.id){
          this.allItems.forEach(element => {
            cart.items.forEach(element2 => {
                if(element.id != element2.id) return;
                element.quantity = element2.quantity;
            });
          });
          this.cartData.items = this.allItems.filter(x => x.quantity > 0);
          console.log('CartData', this.cartData);
          if(this.veg == true) this.items == this.allItems.filter(x => x.veg === true);
          else this.items = [...this.allItems];
        }else{
          this.allItems.forEach(element => {
          element.quantity = 0;
            });
            if(this.veg == true) this.items == this.allItems.filter(x => x.veg === true);
            else this.items = [...this.allItems]; 
        }
      }
    });
    this.getItems();

    
  }


  async getItems(){
    try{
      this.isLoading = true;  
      this.data = {};
      this.cartData = {};
      this.storedData = {};
      setTimeout(async() => {
        // this.categories = this.api.categories;
        this.allItems = this.api.allItems;
        let data : any = this.api.restaurants1.filter(x => x.uid === this.id)
        this.data = data[0]
        this.categories = this.api.categories.filter(x => x.uid === this.id);
        this.allItems = this.api.allItems.filter(x => x.uid === this.id);
        this.items = [...this.allItems];
        await this.cartService.getCartData();
        this.isLoading = false;
      }, 3000);
    }catch(e){
        console.log(e);
    }
      
  }

  getCurrentItemId(){
    return this.id;
  }

  
  vegOnly(event){
    // console.log(event.detail.checked);
    this.items = [];
    if(event.detail.checked == true) this.items = this.allItems.filter(x => x.veg === true);
    else this.items = this.allItems; 
    // console.log('items', this.items);
  }

  quantityPlus(item){
    const index = this.allItems.findIndex(x => x.id === item.id);
    // console.log(index);
    if (!this.allItems[index].quantity || this.allItems[index].quantity == 0) {
      // this.calculate();
      if(!this.storedData.restaurant || (this.storedData.restaurant && this.storedData.restaurant.uid == this.id)){
        this.cartService.quantityPlus(index, this.allItems, this.data);
      }else{
        //alertController
        this.cartService.alertClearCart(index, this.items, this.data);
      }
    } else {
      this.cartService.quantityPlus(index, this.items, this.data);
  }
}

  quantityMinus(item){
    const index = this.allItems.findIndex(x => x.id === item.id);
    // console.log(index);
    this.cartService.quantityMinus(index);
  }

  saveToCart(){
    try{
        this.cartData.restaurant = {};
        this.cartData.restaurant = this.data;
        console.log('cartdata', this.cartData);
        this.cartService.saveCart();
    } catch(e){
      console.log(e);
    }
  }

  async viewCart(){
    console.log('cartDAta', this.cartData);
    if(this.cartData.items && this.cartData.items.length > 0) {
      await this.saveToCart();
    }
    // console.log('router url:', this.router.url);
    this.router.navigate([this.router.url + '/cart']);
  }

  async ionViewWillLeave(){
    console.log('ionviewwillLeave', this.model);
    if(this.cartData?.items && this.cartData?.items.length > 0) await this.saveToCart();
    if(this.routeSub) this.routeSub.unsubscribe();
  }

  ngOnDestroy(){
    if(this.cartSub) this.cartSub.unsubscribe();
  }
}


