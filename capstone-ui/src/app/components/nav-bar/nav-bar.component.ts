import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from 'src/app/models';
import { AuthenticationService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  collapsed = true;
  currentUser$: Subject<User> = new Subject<User>();
  profileName: string = '';
  userRole: string = '';
  currentUser: any;
  constructor(public authService: AuthenticationService, private router: Router) {
    this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit() {
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


}
