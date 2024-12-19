import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import exp from 'node:constants';
import { Expense } from '../model/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private urlBase = 'http://localhost:8080/expense';
  
  constructor(private http: HttpClient) {}

  listUserExpenses(userId: number){
    return this.http.get<Expense[]>(`${this.urlBase}/list-user-expenses/${userId}`);
  }

  addExpense(expense: Expense) {
    return this.http.post<Expense>(`${this.urlBase}/add-expense` , expense);
  }

}
