import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { ExpensesComponent } from './features/expenses/expenses.component';
import { authGuard } from './core/guard/auth.guard';
import { AddExpenseComponent } from './features/add-expense/add-expense.component';

export const routes: Routes = [
    {path:'login', component: LoginComponent},
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'register', component: RegisterComponent},
    {path:'expenses', component: ExpensesComponent, canActivate:[authGuard]},
    {path: 'add-expense', component: AddExpenseComponent, canActivate:[authGuard]}
];
