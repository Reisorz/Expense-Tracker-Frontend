import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { RegisterRequest } from '../../core/model/register-request';
import { error } from 'console';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { TokenService } from '../../core/service/token.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, ToastrModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  nameFormControl = new FormControl('', Validators.required);
  passwordFormControl = new FormControl('', Validators.compose([Validators.required, 
    Validators.pattern('^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$')]));

  request: RegisterRequest = new RegisterRequest;


  constructor(private authService: AuthService, private builder: FormBuilder, private router: Router, private toastr: ToastrService,
    private tokenService: TokenService){
    
    this.registerForm = new FormGroup({
      email: this.emailFormControl,
      name: this.nameFormControl,
      password: this.passwordFormControl
    })
  }

  registerUser() {

    this.request = {
      email: this.registerForm.get('email')?.value,
      name: this.registerForm.get('name')?.value,
      password: this.registerForm.get('password')?.value,
    };

    if(this.registerForm.valid) {
      this.authService.register(this.request).subscribe({
        next:(data) => {
          this.tokenService.setAccessToken(data.access_token);
          this.toastr.success("You have been register succesfully!", "Registration completed!")
          this.router.navigate(['/login']);
        },
        error: (error:any) => {console.log(error)
          this.toastr.error("This email is already registered!", "Email already registered")
        }
      })
    } else {
      this.toastr.error("Please, fill all the form fields.","Invalid fields!")
    }
  }

}

