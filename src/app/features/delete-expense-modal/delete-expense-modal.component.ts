import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExpenseService } from '../../core/service/expense.service';
import { error } from 'console';

@Component({
  selector: 'app-delete-expense-modal',
  standalone: true,
  imports: [MaterialModule, RouterModule],
  templateUrl: './delete-expense-modal.component.html',
  styleUrl: './delete-expense-modal.component.css'
})
export class DeleteExpenseModalComponent {

  constructor(private router: Router, private expenseService: ExpenseService, private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public data: { expenseId: number }){
    
  }

  deleteExpense(){
    this.expenseService.deleteExpenseById(this.data.expenseId).subscribe({
      next: (data) => {
        this.toastr.success("The expense has been deleted succesfully", "Expense deleted")
      },
      error: (error: any) => console.log(error)
    })
  }
}
