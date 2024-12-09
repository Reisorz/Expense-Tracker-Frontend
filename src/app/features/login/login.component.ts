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

    localStorage.clear();
    
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
    console.log(this.request);

    if(this.loginForm.valid) {
      this.authService.login(this.request).subscribe({
        next:(data) => {
          localStorage.setItem('access Token', data.accessToken);
          localStorage.setItem('refresh Token', data.refreshToken);
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