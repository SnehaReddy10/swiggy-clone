import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
})
export class RestaurantComponent implements OnInit {

  @Input() restaurant : any;
  // [] = [
  //   {src : 'assets/imgs/1.jpg',
  //   name :  'Stay Fit',
  //   cuisines : ['Italian', 'Mexican'],
  //   rating : 5,
  //   time : '25mins',
  //   cost : '₹100',
  //   dist : '2.5 kms away'
  // },
  // {src : 'assets/imgs/2.jpg',
  //   name :  'Stay Fit',
  //   cuisine : ['Italian', 'Mexican'],
  //   rating : 3,
  //   time : '25mins',
  //   cost : '₹100',
  //   dist : '2.5 kms away'
  // },
  // {src : 'assets/imgs/3.jpg',
  //   name :  'Stay Fit',
  //   cuisine : ['Italian', 'Mexican'],
  //   rating : 3,
  //   time : '25mins',
  //   cost : '₹100',
  //   dist : '2.5 kms away'
  // },

  // ];
  constructor() { }

  ngOnInit() {}

  getCuisines(cuisines) {
    return cuisines.join(', ');
  }
}
