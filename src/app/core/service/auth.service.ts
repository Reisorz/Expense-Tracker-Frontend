import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterRequest } from '../model/register-request';
import { TokenResponse } from '../model/token-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlBase = 'http://localhost:8080/auth';
  

  constructor(private http: HttpClient) {}

  register(request: RegisterRequest) {
    return this.http.post<TokenResponse>(`${this.urlBase}/register`, request);
  }

}
