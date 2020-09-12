import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import { User } from '../Model/user';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: User;
  public user$: Observable<User>;
  public isLoggedIn: boolean;
  
  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore) {

    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if(user && user.emailVerified) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
  )

  }

  async login(email: string, password: string) {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      let userObj: User = {
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified
      };
      await this.updateUserData(userObj);
      return userObj;
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(email:string): Promise<void> {

    try{

      return this.afAuth.sendPasswordResetEmail(email);
    }catch(error){console.log(error)}

}

async registro(email: string, password: string) {
  try {
    const { user } =  await this.afAuth.createUserWithEmailAndPassword(email, password);
   
    let userObj: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified
    };
    await this.updateUserData(userObj);
    await this.sendVerificationEmail();
    return userObj;
  } catch (error) {
    console.log(error);
  }
}

async logout() {
  try {
    await this.afAuth.signOut();
    this.isLoggedIn = false;
  } catch (error) {
    console.log(error);
  }
}

private updateUserData(user: User): Promise<void> {
  try {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
    }
    const userObj = this.afAuth.currentUser;
    userObj.then(result => {
      result.updateProfile({
        displayName: user.email
      }).then((value) =>{
        // everything ok
      })
    })
    return userRef.set(data, {merge: true});
  } catch (e) {
    throw e;
  }
}

async sendVerificationEmail(): Promise<void> {
  try {
    return (await this.afAuth.currentUser).sendEmailVerification();
  }catch (e) {
    console.log(e);
  }
}



  }
