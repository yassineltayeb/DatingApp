import { AuthGuard } from './_quard/auth.guard';
import { MessagesComponent } from './messages/messages.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { ListsComponent } from './lists/lists.component';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {
                path: 'members', component: MemberListComponent,
                canActivate: [AuthGuard],
                resolve: {users: MemberListResolver}
            },
            {
                path: 'members/:id', component: MemberDetailComponent,
                canActivate: [AuthGuard],
                resolve: {user: MemberDetailResolver}
            },
            {
                path: 'lists', component: ListsComponent
            },
            {
                path: 'messages', component: MessagesComponent
            },
        ]
    },
    {
        path: '**', redirectTo: '', pathMatch: 'full'
     }
];
