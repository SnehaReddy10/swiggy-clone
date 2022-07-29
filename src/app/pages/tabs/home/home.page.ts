import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  banners : any[] = [];
  restaurants : any[] = [];
  isLoading : boolean = false;

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    
    this.isLoading = true;
    setTimeout(() => {
      this.restaurants = this.api.restaurants;
      this.banners = this.api.banners;
      this.isLoading = false;
    }, 3000);

    

  }

}
