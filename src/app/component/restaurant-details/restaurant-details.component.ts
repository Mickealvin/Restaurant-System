import { Restaurant } from './../../Model/restaurant';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantsService } from 'src/app/services/restaurants.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Reserva } from '../../Model/reserve';
import { ReservaService } from '../../services/reserva.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;


@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.scss']
})
export class RestaurantDetailsComponent implements OnInit {
  reservaForm: FormGroup;
  pageTitle: string ='Restaurant Detail';
  restaurant: Restaurant;
  
  totalstar = 4;


  constructor(private router: ActivatedRoute, private restaurantservice: RestaurantsService,  private fb: FormBuilder,private authSvc: AuthService, private reserva: ReservaService,private toastr: ToastrService) { }

  ngOnInit(): void {

    this.reservaForm = this.fb.group({
      peopleqty: ['', [Validators.required]],
      date: ['', [Validators.required]],
      hour: ['', [Validators.required]]
    });
   
     let id = +this.router.snapshot.paramMap.get('id');
    
     this.restaurantservice.getRestaurant(id).subscribe(data => {
       this.restaurant = data;
       console.log(this.restaurant);
     })
    
    }

    showModal(): void {
     
        $('#reservModal').modal();
      }

      onReserve() {
        console.log('Button clicked');
        try {
          this.authSvc.user$.subscribe(async (currentUser) => {
            if (currentUser) {
            const { peopleqty, date, hour } = this.reservaForm.value;
            const reserva: Reserva = {
              userId: currentUser.uid,
              nameRestau: this.restaurant.name,
              peopleqty,
              date,
              hour,
            };
            const res = await this.reserva.addReserve(reserva);
            if (res) {
              this.reservaForm.reset();
              this.toastr.error('Succesfull Operation', 'Reservation Save')
            }
            }
          });
        } catch (error) {
          console.log('Error al guardar reserva => ', error);
          this.toastr.error('Toast-error', 'Save failed', error)
        }

      }
    
    }
    
  


