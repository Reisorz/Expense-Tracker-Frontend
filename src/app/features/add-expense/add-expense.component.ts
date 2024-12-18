import { Component } from '@angular/core';
import { Expense } from '../../core/model/expense';
import { AuthService } from '../../core/service/auth.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ExpenseService } from '../../core/service/expense.service';
import { TokenService } from '../../core/service/token.service';

@Component({
  selector: 'app-add-expense',
  standalone: true,
  imports: [],
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.css'
})
export class AddExpenseComponent {

    expenses: Expense[] = [];
    email: string;
  
    constructor(private authService: AuthService, private builder: FormBuilder, private router: Router, private toastr: ToastrService,
      private tokenService: TokenService, private expenseService: ExpenseService){
  
        this.email = localStorage.getItem("email") ?? '';
      }

}
