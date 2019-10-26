import { catchError } from 'rxjs/operators';
import { AlertifyService } from '../_services/alertify.service';
import { Injectable } from '@angular/core';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable()

export class MemberListResolver implements Resolve<User[]> {

    constructor(private userService: UserService, private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        // tslint:disable-next-line:no-string-literal
        return this.userService.getUsers().pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/members']);
                return of(null);
            })
        );
    }

}