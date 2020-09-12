import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire'; // Firebase config
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StarRatingModule } from '@sreyaj/ng-star-rating';

import { RatingModule } from 'ng-starrating';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { environment } from '../environments/environment.prod';
import { LoginComponent } from './component/login/login.component';
import { RegistroComponent } from './component/registro/registro.component';
import { ResetComponent } from './component/reset/reset.component';
import { RestaurantCardComponent } from './component/restaurant-card/restaurant-card.component';
import { RestaurantDetailsComponent } from './component/restaurant-details/restaurant-details.component';
import { AgmCoreModule } from '@agm/core';
import{ NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistroComponent,
    ResetComponent,
    RestaurantCardComponent,
    RestaurantDetailsComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    StarRatingModule,
    NgxPaginationModule,
    RatingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBQ-l6Y6ngFoh3IVWZ7cdxpMU7gKMUO514'
    })
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
