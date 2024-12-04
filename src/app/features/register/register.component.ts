import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  nameFormControl = new FormControl('', Validators.required);
  passwordFormControl = new FormControl('', Validators.compose([Validators.required, 
    Validators.pattern('^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$')]));


  constructor(private authService: AuthService, private builder: FormBuilder, private router: Router){
    
    this.registerForm = new FormGroup({
      email: this.emailFormControl,
      name: this.nameFormControl,
      password: this.passwordFormControl
    })
    
  }

}

