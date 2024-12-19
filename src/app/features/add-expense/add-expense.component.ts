import { Component } from '@angular/core';
import { AuthService } from '../../core/service/auth.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ExpenseService } from '../../core/service/expense.service';
import { TokenService } from '../../core/service/token.service';
import exp from 'node:constants';
import { error } from 'node:console';
import { Expense } from '../../core/model/expense';

@Component({
  selector: 'app-add-expense',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, FormsModule, ToastrModule],
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.css'
})
export class AddExpenseComponent {

    email: string;
    expense: Expense = new Expense;
    addExpenseForm: FormGroup;
    nameFormControl = new FormControl('', Validators.required);
    valueFormControl = new FormControl('' ,[ Validators.required, Validators.pattern("^[0-9]+(\\.[0-9]+)?$")]);
    expenseTypeFormControl = new FormControl('',Validators.required);
  
    constructor(private authService: AuthService, private builder: FormBuilder, private router: Router, private toastr: ToastrService,
    private tokenService: TokenService, private expenseService: ExpenseService){
  
      this.email = localStorage.getItem("email") ?? '';

      this.addExpenseForm = new FormGroup({
        name: this.nameFormControl,
        value: this.valueFormControl,
        expenseType: this.expenseTypeFormControl,
      })

      this.expense.userId = Number(localStorage.getItem("userId"));
    }

  addExpense(){
    console.log("Add expense function!!!");

    const formValues = this.addExpenseForm.getRawValue();
    this.expense.name  = formValues.name;
    this.expense.value = Number(formValues.value);
    this.expense.expenseType = formValues.expenseType;

    console.log(this.expense)
    if(this.addExpenseForm.valid) {
      this.expenseService.addExpense(this.expense).subscribe({
        next: (data) => {this.goToExpenses();
          this.toastr.success("Expense has been added succesfully!", "Expense added!")
        },
        error: (error) => console.log(error)
      })
    } else {
      this.toastr.error("Please, fill all the fields.", "Invalid fields.")
    }

  }

  goToExpenses() {
    this.router.navigate(['/expenses']);
  }

}
