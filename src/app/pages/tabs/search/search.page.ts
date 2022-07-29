import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  @ViewChild('searchInput') sInput;
  model : any = {
    icon: 'search-outline',
    title : 'No Restaurants Matching Record found'
  };
  isLoading : boolean;
  query : any;

  constructor(
    private api: ApiService
  ) { }


  allrestaurants : any[] = [];
  restaurants : any[] = [];
  

  ngOnInit() {
    setTimeout(() => {
      this.allrestaurants = this.api.allRestaurants;
      this.sInput.setFocus();
    }, 500);
  }

  async onSearchChange(event) {
    console.log(event.detail.value);  
    this.query = event.detail.value.toLowerCase();
    this.restaurants = [];
    if (this.query.length > 0){
      this.isLoading = true;
      setTimeout(async() => {
        this.restaurants = await this.allrestaurants.filter((element : any) => {
          return element.shrotName.includes(this.query);
        });
        console.log(this.restaurants);
        this.isLoading = false;
      }, 300);
    }
  }


}
