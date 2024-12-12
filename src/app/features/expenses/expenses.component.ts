import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { TokenService } from '../../core/service/token.service';
import { MaterialModule } from '../../../material.module';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [RouterModule, MaterialModule,FormsModule,ReactiveFormsModule, ToastrModule],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})
export class ExpensesComponent{

  searchForm: FormGroup;
  dateFilterForm: FormGroup;


  constructor(private authService: AuthService, private builder: FormBuilder, private router: Router, private toastr: ToastrService,
    private tokenService: TokenService){

    }


}
