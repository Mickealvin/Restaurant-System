import { Component, OnInit } from '@angular/core';
import { Reserva } from 'src/app/Model/reserve';
import { ActivatedRoute } from '@angular/router';
import { ReservaService } from '../../services/reserva.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss']
})
export class ReservationListComponent implements OnInit {
  reservaList: Reserva[] =[];
  p:number=1
  constructor(private rout: ActivatedRoute, private ReserSer: ReservaService, private auth: AuthService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadAllReseva();
  }

  loadAllReseva(){
    this.auth.user$.subscribe(currentUser => {
      if(currentUser) {
       this.ReserSer.getAllReserveByUserNew(currentUser.uid).subscribe(data => {
         this.reservaList = data;
         console.log(this.reservaList);
       })
      }
    })

  }

  OnDelete($key: any){
    if(confirm(' Are you sure to delete your reservation?')){
      this.ReserSer.deleteReserve($key);
      this.toastr.error('Succesfull Operatio', 'Reservation removed')
    }
  }
}
