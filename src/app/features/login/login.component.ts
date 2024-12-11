import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthRequest } from '../../core/model/auth-request';
import { TokenService } from '../../core/service/token.service';
import { TokenResponse } from '../../core/model/token-response';

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


  constructor(private authService: AuthService, private builder: FormBuilder, private router: Router, private toastr: ToastrService,
     private tokenService: TokenService){

    tokenService.removeAccessToken();
    
    this.loginForm = new FormGroup({
      email: this.emailFormControl,
      password: this.passwordFormControl
    })
  }

  loginUser(){
    this.request = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };

    if(this.loginForm.valid) {
      this.authService.login(this.request).subscribe({
        next:(data) => { 
          this.tokenService.setAccessToken(data.access_token);
          this.toastr.success("You have logged in succesfully!", "Loggen in!")
          this.router.navigate(['/expenses']);
        },
        error: (error:any) => {console.log(error)
          this.toastr.error("Email or password are incorrect","Invalid credentials");
        }
      })
    } else {
      this.toastr.error("Please, fill all the form fields.","Invalid fields!")
    }

  }
}