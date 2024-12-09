import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthRequest } from '../../core/model/auth-request';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, ToastrModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', Validators.compose([Validators.required, 
    Validators.pattern('^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$')]));

  request: AuthRequest = new AuthRequest;


  constructor(private authService: AuthService, private builder: FormBuilder, private router: Router, private toastr: ToastrService){
    
    this.loginForm = new FormGroup({
      email: this.emailFormControl,
      password: this.passwordFormControl
    })
  }

  loginUser(){

  }
}