import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  basUrl = environment.apiUrl +  'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;

  constructor(private http: HttpClient) { }

  register(model: any) {
    return this.http.post(this.basUrl + 'register', model);
  }

  login(model: any) {
    return this.http.post(this.basUrl + 'login', model).pipe(map((resonse: any) => {

      if (resonse) {
        localStorage.setItem('token', resonse.token);
        localStorage.setItem('user', JSON.stringify(resonse.user));
        this.decodedToken = this.jwtHelper.decodeToken(resonse.token);
        this.currentUser = resonse.user;
      }
    }));
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

}
