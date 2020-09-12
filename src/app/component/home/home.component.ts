import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from '../../services/restaurants.service';
import { Restaurant } from '../../Model/restaurant';
import { City } from '../../Model/city';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  restaurants: Restaurant[] = [];
  filteredRestaurants: Restaurant[] = [];
  selectedCity = 'Miami';
  cities: City[] = [];
  p: number =1

  cityList: string[] = [];

  constructor(private restaurantservice: RestaurantsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadRestaurantList('Miami');
    this.loadCity();
  }

  selectChanged(selectedCity: string): void {
    this.selectedCity = selectedCity;
    this.loadRestaurantList(this.selectedCity);
  }

  loadCity(){
    this.restaurantservice.getAllCity().subscribe(data => {
      this.cityList = data.cities as string[];
      console.log(this.cityList);
    });
  }

  loadRestaurantList(cityName: string): void {
    this.restaurantservice.getRestaurants('city', cityName).subscribe({
      next: data => {
        // console.log(data.restaurants);
        this.restaurants = data.restaurants;
        // this.filteredRestaurants = this.restaurants;
      } ,
      error: err => console.log(err)
    });
  }

}
