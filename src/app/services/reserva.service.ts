import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reserva } from '../Model/reserve';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private reservColletion: AngularFirestoreCollection<Reserva>
  

  constructor(private afs: AngularFirestore, private afStore: AngularFirestore) { 
    this.reservColletion = afs.collection<Reserva>('reserve');
  }

  getAllReserve(): Observable<Reserva[]> {
    return this.reservColletion.snapshotChanges().pipe(
      map(
      reserva => reserva.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data}
      })
    ))
  }

  addReserve(reserve: Reserva){
    return this.reservColletion.add(reserve);
     }

     getAllReserveByUserNew(userID: string): Observable<Reserva[]> {
      return this.afs.collection<Reserva>('reserve', ref => ref.where('userId', '==', userID)).snapshotChanges()
          .pipe(
              map(reservas => {
                    return reservas.map(r => {
                      const data = r.payload.doc.data();
                      const id = r.payload.doc.id;
                      return { id, ...data};
                    })
                  }));
    }

    deleteReserve(id: any){
      return this.afs.collection('reserve').doc(id).delete();

    }


}

