import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterRequest } from '../model/register-request';
import { TokenResponse } from '../model/token-response';
import { AuthRequest } from '../model/auth-request';
import { TokenService } from './token.service';
import { map, Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlBase = 'http://localhost:8080/auth';
  

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  register(request: RegisterRequest) {
    return this.http.post<TokenResponse>(`${this.urlBase}/register`, request);
  }

  login(request: AuthRequest){
    return this.http.post<TokenResponse>(`${this.urlBase}/login`, request);
  }


  isLoggedIn(){
    return this.tokenService.getAccessToken() != null;
  }

  getUserDetailsFromToken() {
    
    const token = this.tokenService.getAccessToken();
    if(token){
      const decoded = jwtDecode(token);
      const userId = decoded.jti ?? '';
      const email = decoded.sub ?? '';
      localStorage.setItem("userId", userId);
      localStorage.setItem("email", email);
    }
  }

}
