import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { TokenService } from '../../core/service/token.service';
import { MaterialModule } from '../../../material.module';
import { AsyncPipe, CommonModule, formatDate } from '@angular/common';
import { ExpenseService } from '../../core/service/expense.service';
import { error } from 'console';
import exp from 'constants';
import { Expense } from '../../core/model/expense';
import { Dialog } from '@angular/cdk/dialog';
import { DeleteExpenseModalComponent } from '../delete-expense-modal/delete-expense-modal.component';
import { MatDialog } from '@angular/material/dialog';
import e from 'express';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [RouterModule, MaterialModule,FormsModule,ReactiveFormsModule, ToastrModule, CommonModule],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})
export class ExpensesComponent{

  expenses: Expense[] = [];
  email: string;
  userId: number;
  name: string;
  
  searchNameForm: FormGroup;
  searchFormControl = new FormControl('', Validators.required);

  filterDateForm: FormGroup;
  startDateFormControl = new FormControl('',Validators.required);
  endDateFormControl = new FormControl('', Validators.required);

  constructor(private authService: AuthService, private builder: FormBuilder, private router: Router, private toastr: ToastrService,
    private tokenService: TokenService, private expenseService: ExpenseService, private dialog: MatDialog){

      this.loadUserExpenses();
      this.email = localStorage.getItem("email") ?? '';
      this.userId = Number(localStorage.getItem("userId"));

      this.searchNameForm = new FormGroup({
        search: this.searchFormControl
      })

      this.filterDateForm = new FormGroup({
        startDate: this.startDateFormControl,
        endDate: this.endDateFormControl
      })

    }

    loadUserExpenses() {
      const userId = Number(localStorage.getItem("userId"));
      console.log(this.tokenService.getAccessToken())
      this.expenseService.listUserExpenses(userId).subscribe({
        next: (data) => {this.expenses = data,
        console.log(this.expenses)
      },
        error: (error:any) => console.log(error)
      })
    }

    searchByName(){
      console.log("SearchByName() working!")
      this.name = this.searchFormControl.value ?? '';
      if(this.searchNameForm.valid) {
        this.expenseService.listUserExpensesByName(this.userId, this.name).subscribe({
          next: (data) => this.expenses = data,
          error: (error: any) => console.log(error)
        })
      } else {
        this.toastr.error("Please, fill the search field", "Invalid field")
      }

    }

    filterByDateRange() {
      console.log("filterDateRange() working!");

      const formValues = this.filterDateForm.getRawValue();
      const startDate = formValues.startDate;
      const endDate = formValues.endDate;
      console.log(startDate  + " --> " + endDate);

      const formatedStartDate = this.formatStartDate(startDate);
      const formatedEndDate = this.formatEndDate(endDate);
      console.log(formatedStartDate  + " --> " + formatedEndDate);

      this.expenseService.listUserExpensesByDateRange(formatedStartDate, formatedEndDate, this.userId).subscribe({
        next: (data) => this.expenses = data,
        error: (error: any) => console.log(error)
      })
    }

    lastDaysExpenses(days: number) {
      console.log("lastDaysExpense() working!")

      var currentDate = new Date();
      var currentDateString = formatDate(currentDate, 'yyyy-MM-dd', 'en-US');

      var lastDaysDate = new Date();
      lastDaysDate.setDate(lastDaysDate.getDate() - days);
      var lastDaysString = formatDate(lastDaysDate, 'yyyy-MM-dd', 'en-US');

      this.filterDateForm.patchValue({
        startDate: lastDaysString,
        endDate: currentDateString,
      });

      this.filterByDateRange();    
      
    }

    formatStartDate(date: string){ 
      const[year, month, day] = date.split('-').map(String);
      const formatedDay = `${day}-${month}-${year} 00:00`
      return formatedDay;
    }

    formatEndDate(date: string){ 
      const[year, month, day] = date.split('-').map(String);
      const formatedDay = `${day}-${month}-${year} 23:59`
      return formatedDay;
    }

    logout(){
      this.authService.logout().subscribe({
        next: (data) => this.router.navigate(["/login"]),
        error: (error: any) => console.log(error)
      })
    }

    openDeleteDialog(expenseId: number){
      const dialogRef = this.dialog.open(DeleteExpenseModalComponent, {
        width: '20vw',
        minWidth: '20vw',
        maxWidth: '20vw',
        data: {
          expenseId: expenseId,
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        this.loadUserExpenses();
      });
    }
}