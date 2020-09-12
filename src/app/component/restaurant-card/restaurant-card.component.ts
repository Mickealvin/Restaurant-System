import { Component, OnInit, Input , OnChanges} from '@angular/core';
import { Restaurant } from 'src/app/Model/restaurant';
import { RatingModule } from 'ng-starrating';


@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.scss']
})
export class RestaurantCardComponent implements OnInit {
  restaurant: Restaurant;
  hovered = false;
  totalstar = 4;
  @Input() extRestaurant: Restaurant;

  constructor() { }

  ngOnChanges() {
    this.restaurant = this.extRestaurant;
  }
 

  ngOnInit(): void {
  }

 
  }


