import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AddressService } from 'src/app/services/address/address.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {

  isLoading : boolean;
  addresses: any[] = [];
  addressesSub: Subscription;
  model: any = {
    title: "No Address added yet",
    icon: 'location-outline'
  }

  constructor(private global: GlobalService,
    private addressservice: AddressService) { }

  ngOnInit() {
    this.addressesSub = this.addressservice.addresses.subscribe(address => {
      console.log('address', address);
      if(address instanceof Array){
      this.addresses = address;
      }else{
        if(address?.delete){
          this.addresses = this.addresses.filter(x => x.id != address.id);
        }else if(address?.update){
          const index = this.addresses.findIndex(x => x.id == address.id);
          this.addresses[index] = address;
        }else{
          this.addresses = this.addresses.concat(address);
        }
      }
    });
    this.getAddress();
  }

  ngOnDestroy(){
    if(this.addressesSub) this.addressesSub.unsubscribe();
  }

  editAddress(address) {
      
  }

  deleteAddress(address) {
    console.log('address', address);
    this.global.showAlert(
      "Are you sure you want to delete this address?",
      "Confirm",
      [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel');
            return;
          }
        },
        {
          text: 'Yes',
          handler: async () => {
            this.global.showLoader();
            await this.addressservice.deleteAddress(address);
            this.global.hideLoader();
          }
        }
      ]
    );
  }

  async getAddress(){
    this.isLoading = true;
    this.global.showLoader();
    setTimeout(async () => {
      await this.addressservice.getAddresses();
      this.isLoading = false;
      // this.global.successToast("Addresses retrieved successfully");
      // this.global.showAlert("Address retrieved", "Address page");
      this.global.hideLoader()
    }, 3000);
  }

  getIcon(title){
    return this.global.getIcon(title);
  }

}
