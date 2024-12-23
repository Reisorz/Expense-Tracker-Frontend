import { Component } from '@angular/core';
import { Expense } from '../../core/model/expense';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/service/auth.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ExpenseService } from '../../core/service/expense.service';
import { TokenService } from '../../core/service/token.service';
import { error } from 'console';
import exp from 'constants';

@Component({
  selector: 'app-update-expense',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, FormsModule, ToastrModule],
  templateUrl: './update-expense.component.html',
  styleUrl: './update-expense.component.css'
})
export class UpdateExpenseComponent {

  email: string;
  expenseId: number;
  userId: number;
  expense: Expense = new Expense;
  updateExpenseForm: FormGroup;
  nameFormControl = new FormControl('', Validators.required);
  valueFormControl = new FormControl(0 ,[ Validators.required, Validators.pattern("^[0-9]+(\\.[0-9]+)?$")]);
  expenseTypeFormControl = new FormControl('',Validators.required);
    
  constructor(private authService: AuthService, private builder: FormBuilder, private router: Router, private toastr: ToastrService,
  private tokenService: TokenService, private expenseService: ExpenseService , private route: ActivatedRoute){

    this.email = localStorage.getItem("email") ?? '';
    this.userId = Number(localStorage.getItem("userId"));

    this.updateExpenseForm = new FormGroup({
      name: this.nameFormControl,
      value: this.valueFormControl,
      expenseType: this.expenseTypeFormControl,
    })

  }

  ngOnInit(){
    this.expenseId = this.route.snapshot.params['id'];
    this.expenseService.findExpenseById(this.expenseId).subscribe({
      next: (data) => {this.expense = data;
      this.setInitialFormValues();
      },
      error: (error: any) => console.log(error)
    })
  }

  setInitialFormValues(){
    this.nameFormControl.setValue(this.expense.name);
    this.valueFormControl.setValue(this.expense.value);
    this.expenseTypeFormControl.setValue(this.expense.expenseType);
  }

  updateExpense(){
    this.expense.userId = this.userId;
    this.expense.name = this.nameFormControl.value ?? '';
    this.expense.expenseType = this.expenseTypeFormControl.value ?? '';
    this.expense.value = Number(this.valueFormControl.value)
    console.log(this.expense)

    this.expenseService.updateExpense(this.expense).subscribe({
      next: (data) => {this.goToExpenses(),
        this.toastr.success("Your expense has been modified succesfully", "Updated succesfully")
      },
      error: (error: any) => console.log(error)
    })
  }

  goToExpenses() {
    this.router.navigate(['/expenses']);
  }

  logout(){
    this.authService.logout().subscribe({
      next: (data) => this.router.navigate(["/login"]),
      error: (error: any) => console.log(error)
    })
  }

}
