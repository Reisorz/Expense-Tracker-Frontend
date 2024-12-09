import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private TOKEN_KEY = "accessToken";

  constructor() { }

  public setAccessToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  public getAccessToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  public removeAccessToken() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  
}
