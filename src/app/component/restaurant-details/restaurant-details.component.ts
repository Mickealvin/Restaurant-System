import { Restaurant } from './../../Model/restaurant';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantsService } from 'src/app/services/restaurants.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.scss']
})
export class RestaurantDetailsComponent implements OnInit {

  pageTitle: string ='Restaurant Detail';
  restaurant: Restaurant;
  
  totalstar = 4;


  constructor(private router: ActivatedRoute, private restaurantservice: RestaurantsService) { }

  ngOnInit(): void {
   
     let id = +this.router.snapshot.paramMap.get('id');
    
     this.restaurantservice.getRestaurant(id).subscribe(data => {
       this.restaurant = data;
       console.log(this.restaurant);
     })
    
    }
    }
  


