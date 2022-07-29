import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../api/api.service';
import { GlobalService } from '../global/global.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private _addresses = new BehaviorSubject<any>(null);

  get addresses(){
      return this._addresses.asObservable();
  }

  constructor(
    private api: ApiService, 
    ) { }

  getAddresses(){
    try{
        let allAddress: any[] = this.api.addresses;
        console.log(allAddress);
        this._addresses.next(allAddress);
    }catch(e){
        console.log(e);
        throw(e);
    }
  }

  getAddress(param){}

  updataAddress(id, param){}

  deleteAddress(param){
    param.delete = true;
    this._addresses.next(param);
  }
}
