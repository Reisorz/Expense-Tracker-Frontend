import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterRequest } from '../model/register-request';
import { TokenResponse } from '../model/token-response';
import { AuthRequest } from '../model/auth-request';
import { TokenService } from './token.service';
import { map, Observable } from 'rxjs';

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

}
