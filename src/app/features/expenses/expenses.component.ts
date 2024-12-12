import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { TokenService } from '../../core/service/token.service';
import { MaterialModule } from '../../../material.module';
import { AsyncPipe } from '@angular/common';
import { Expense } from '../../core/model/expense';
import { ExpenseService } from '../../core/service/expense.service';
import { error } from 'console';
import exp from 'constants';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [RouterModule, MaterialModule,FormsModule,ReactiveFormsModule, ToastrModule],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})
export class ExpensesComponent{

  expenses: Expense[] = [];


  constructor(private authService: AuthService, private builder: FormBuilder, private router: Router, private toastr: ToastrService,
    private tokenService: TokenService, private expenseService: ExpenseService){

      this.loadUserExpenses();
      console.log("Expenses list: " + this.expenses);

    }

    loadUserExpenses() {
      const userId = Number(localStorage.getItem("userId"));
      console.log(this.tokenService.getAccessToken())
      this.expenseService.listUserExpenses(userId).subscribe({
        next: (data) => {this.expenses = data,
        console.log(data)
      },
        error: (error:any) => console.log(error)
      })
    }


}
