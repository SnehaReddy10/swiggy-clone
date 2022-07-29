import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-restaurants',
  templateUrl: './loading-restaurants.component.html',
  styleUrls: ['./loading-restaurants.component.scss'],
})
export class LoadingRestaurantsComponent implements OnInit {

  dummy = Array(10);
  
  constructor() { }

  ngOnInit() {}

}
