import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  userEmail= new FormControl('');  
  constructor(private authSvc:AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  async OnReset(){

    try{
      const email =  this.userEmail.value;
    this.authSvc.resetPassword(email);
    window.alert('Email sent, check your inbox')
    console.log(email)
    //redirect to login
    this.router.navigate(['/login']);
    }
    catch(error){console.log(error)}
  }
}
