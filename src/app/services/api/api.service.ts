import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  banners = [
    {banner : 'assets/imgs/1.jpg'},
  {banner : 'assets/imgs/2.jpg'},
  {banner : 'assets/imgs/3.jpg'}
  ];

  restaurants = [
    {cover : 'assets/imgs/1.jpg',
    uid : 'bs6w7638',
  name :  'Stay Fit1',
  shrotName : 'stayfit1',
  cuisines : ['Italian', 'Mexican'],
  rating : 5,
  time : '25mins',
  cost : '₹100',
  dist : '2.5 kms away'
},
{cover : 'assets/imgs/2.jpg',
  name :  'Stay Fit2',
  uid : 'bs6w7dc638',
  shrotName : 'stayfit2',
  cuisines : ['Italian', 'Mexican'],
  rating : 3,
  time : '25mins',
  cost : '₹100',
  dist : '2.5 kms away'
},
{cover : 'assets/imgs/3.jpg',
uid : 'bs6w763fd8',
  name :  'Stay Fit3',
  shrotName : 'stayfit3',
  cuisines : ['Italian', 'Mexican'],
  rating : 3,
  time : '25mins',
  cost : '₹100',
  dist : '2.5 kms away'
},
  ];

  allRestaurants = [
    {cover : 'assets/imgs/1.jpg',
    uid : 'bs6w7638',
  name :  'Stay Fit1',
  shrotName : 'stayfit1',
  cuisines : ['Italian', 'Mexican'],
  rating : 5,
  time : '25mins',
  cost : '₹100',
},
{cover : 'assets/imgs/2.jpg',
  name :  'Stay Fit2',
  uid : 'bs6w7dc638',
  shrotName : 'stayfit2',
  cuisines : ['Italian', 'Mexican'],
  rating : 3,
  time : '25mins',
  cost : '₹100',
},
{cover : 'assets/imgs/3.jpg',
uid : 'bs6w763fd8',
  name :  'Stay Fit3',
  shrotName : 'stayfit3',
  cuisines : ['Italian', 'Mexican'],
  rating : 3,
  time : '25mins',
  cost : '₹100',
},
  ];

  restaurants1 : any[] = [
    {cover : 'assets/imgs/1.jpg',
    uid : 'bs6w7638',
  name :  'Stay Fit1',
  shortName : 'stayfit1',
  cuisines : ['Italian', 'Mexican'],
  rating : 5,
  address : 'Karol bagh, New Delhi',
  time : '25mins',
  cost : '₹100',
  dist : '2.5 kms away'
},
{cover : 'assets/imgs/2.jpg',
  name :  'Stay Fit2',
  uid : 'bs6w7dc638',
  shortName : 'stayfit2',
  cuisines : ['Italian', 'Mexican'],
  address : 'Karol bagh, New Delhi',
  rating : 3,
  time : '25mins',
  cost : '₹100',
  dist : '2.5 kms away'
},
{cover : 'assets/imgs/3.jpg',
uid : 'bs6w763fd8',
  name :  'Stay Fit3',
  shortName : 'stayfit3',
  cuisines : ['Italian', 'Mexican'],
  address : 'Karol bagh, New Delhi',
  rating : 3,
  time : '25mins',
  cost : '₹100',
  dist : '2.5 kms away'
},
  ];

  categories: any[] = [
      {
        id : "e00",
        name : "Italian",
        uid : "bs6w7638"
      },
      {
        id : "e0",
        name : "Mexican",
        uid : "bs6w7dc638"
      }
  ]

  allItems = [
    {
      category_id: "e00",
      cover: "assets/imgs/1.jpg",
      desc: "Great in taste",
      id: "i1",
      name: "Pizza",
      price: 120,
      ratings: 0,
      status: true,
      uid: "bs6w7638",
      variation: false,
      veg: false,
      quantity: 0
    },
    {
      category_id: "e0",
      cover: "assets/imgs/2.jpg",
      desc: "Great in taste",
      id: "i2",
      name: "Caprese Salad",
      price: 200,
      ratings: 0,
      status: true,
      uid: "bs6w7dc638",
      variation: false,
      veg: true,
      quantity: 0
    },
    {
      category_id: "e0",
      cover: "assets/imgs/2.jpg",
      desc: "Great in taste",
      id: "i2",
      name: "Caprese Salad",
      price: 200,
      ratings: 0,
      status: true,
      uid: "bs6w7638",
      variation: false,
      veg: true,
      quantity: 0
    },
    {
      category_id: "e00",
      cover: "assets/imgs/3.jpg",
      desc: "Great in taste",
      id: "i3",
      name: "Pasta",
      price: 150,
      ratings: 0,
      status: true,
      uid: "bs6w7638",
      variation: false,
      veg: false,
      quantity: 0
    }
  ];

  addresses: any[] = [
    {address: "Fancy Bazar, India", house: "2nd Floor", id: "uhchdgsedcmsw", landmark: "Fancy Bazar", lat: 26.1830738, lng: 91.74049769999, title: "Fancy", user_id: "1"},
        {address: "Kanaut palace, India", house: "Ground Floor", id: "jhchksdcns", landmark: "Bazar", lat: 26.1830738, lng: 91.74049769999, title: "Kanaut Palace", user_id: "1"}
  ];

  orders: any[] = [
        {
          address: {address: "Indira Nagar Rd, Borsojai, Basistha 781029, India", house: "dsgd", id: "gdcndknckhe", user_id: "1"},
          deliveryCharge: 20,
          grandTotal: "540.00",
          id: "kjcsnhush",
          order: [
            // {category_id: "e10", cover: "assets/imgs/1.jpg", desc: "Great in taste", id: "i32", name: "Bahamas", price: 37, quantity: 6},
            {
              category_id: "e0",
              cover: "assets/imgs/2.jpg",
              desc: "Great in taste",
              id: "i2",
              name: "Caprese Salad",
              price: 200,
              ratings: 0,
              status: true,
              uid: "bs6w7dc638",
              variation: false,
              veg: true,
              quantity: 2
            },],
          paid: "COD",
          restaurant: {cover : 'assets/imgs/2.jpg',
          name :  'Stay Fit2',
          uid : 'bs6w7dc638',
          shortName : 'stayfit2',
          cuisines : ['Italian', 'Mexican'],
          address : 'Karol bagh, New Delhi',
          rating : 3,
          time : '25mins',
          cost : '₹100',
          dist : '2.5 kms away'
        },
          restaurant_id: "bs6w7dc638",
          status: "Created",
          time: "July 6, 2022 11:44 PM",
          total: "520.00",
          user_id: "1"
        },
        {
          address: {address: "Indira Nagar Rd, Borsojai, Basistha 781029, India", house: "dsgd", id: "1", user_1d: "1"},
          deliveryCharge: 20,
          grandTotal: "440.00",
          id: "jdcgwsdxjwowqd",
          order: [
            {
              category_id: "e00",
              cover: "assets/imgs/3.jpg",
              desc: "Great in taste",
              id: "i3",
              name: "Pasta",
              price: 150,
              ratings: 0,
              status: true,
              uid: "bs6w7638",
              variation: false,
              veg: false,
              quantity: 2
            },
            {
              category_id: "e00",
              cover: "assets/imgs/2.jpg",
              desc: "Great in taste",
              id: "i2",
              name: "Caprese Salad",
              price: 200,
              ratings: 0,
              status: true,
              uid: "bs6w7638",
              variation: false,
              veg: true,
              quantity: 1
            }

            // {category_id: "e00", cover: "assets/imgs/1.jpg", desc: "Great in taste", id: "i1", name: "Pizza", price: 37, quantity: 1},
            // {category_id: "e00", cover: "assets/imgs/2.jpg", desc: "Great in taste", id: "i3", name: "Pasta", price: 23, quantity: 1}
          ],
          paid: "COD",
          restaurant: 
          {cover : 'assets/imgs/1.jpg',
          uid : 'bs6w7638',
        name :  'Stay Fit1',
        shortName : 'stayfit1',
        cuisines : ['Italian', 'Mexican'],
        rating : 5,
        address : 'Karol bagh, New Delhi',
        time : '25mins',
        cost : '₹100',
        dist : '2.5 kms away'
      },
          restaurant_id: "bs6w7638",
          status: "Delivered",
          time: "July 7, 2022 11:44 PM",
          total: "420.00",
          user_id: "1"
        }
  ]


  constructor() { }
}
