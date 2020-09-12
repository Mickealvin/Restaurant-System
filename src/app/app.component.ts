import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { User } from './Model/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
  title = 'restaurant-system';

  public user$: Observable<User> = this.authSvc.user$;

  constructor(public authSvc:AuthService, private router: Router) { }

   ngOnInit(){
  }

  async onLogout(){
    try {
      await this.authSvc.logout();
      this.router.navigate(['/login']);
    }

  catch(error){
   console.log(error);
  }
}
}
