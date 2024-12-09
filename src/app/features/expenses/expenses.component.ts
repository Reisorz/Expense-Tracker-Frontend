import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../../core/service/token.service';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})
export class ExpensesComponent {

  constructor(private authService: AuthService, private builder: FormBuilder, private router: Router, private toastr: ToastrService,
    private tokenService: TokenService){

      console.log("Access token: " + tokenService.getAccessToken())
    }
}
