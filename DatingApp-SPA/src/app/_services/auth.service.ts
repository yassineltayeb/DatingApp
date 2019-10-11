import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  basUrl = 'http://localhost:5000/api/auth/';

  constructor(private http: HttpClient) { }

  register(model: any) {
    return this.http.post(this.basUrl + 'register', model);
  }

  login(model: any) {
    return this.http.post(this.basUrl + 'login', model).pipe(map((resonse: any) => {
      const user = resonse;

      if (user) {
        localStorage.setItem('token', user.token);
      }
    }));
  }

}
