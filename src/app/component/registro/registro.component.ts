import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private authSvc: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onRegister() {
    console.log("registrado")
    const { email, password } = this.registerForm.value;
    try {
      const user = await this.authSvc.registro(email, password);
      
      if (user) {
        this.router.navigate(['/login']);
      }
    } catch (error) {
      console.log(error);
    }

  }

  getError(controlName: string) {
    let error = '';
    let control = this.registerForm.controls[controlName];
    if (control.touched && control.errors != null) {
      switch (controlName) {
        case 'email':
          error = 'El campo email no es valido';
          break;
        case 'password':
          if (control.errors.minlength) {
            error = 'El campo contraseña debe ser al menos 6 caracteres';
          } else {
            error = 'El campo contraseña es requerido';
          }
          break;
      }
      return error;
    }
  }
}
