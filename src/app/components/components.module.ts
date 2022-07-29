import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { IonicModule } from '@ionic/angular';
import { LoadingRestaurantsComponent } from './loading-restaurants/loading-restaurants.component';
import { EmptyScreenComponent } from './empty-screen/empty-screen.component';



@NgModule({
  declarations: [
    RestaurantComponent,
    LoadingRestaurantsComponent,
    EmptyScreenComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports : [
    RestaurantComponent, LoadingRestaurantsComponent, EmptyScreenComponent
  ],
  entryComponents : []
})
export class ComponentsModule { }
