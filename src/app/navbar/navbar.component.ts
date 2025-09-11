//File: src/app/navbar/navbar.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints, LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent {
  isMobile: boolean = false;
  isLoggedIn: boolean = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
  ) {
    //Determine what the device is to load navbar for large/small screen type
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isMobile = result.matches;
    });
  }

  isUserLoggedIn(): boolean {
    this.isLoggedIn = localStorage.getItem('user') && localStorage.getItem('token') ? true : false;
    return this.isLoggedIn;
  }

  //Function that will handle logout functionality from navbar
  logout(): void {
    //Clear user, token, favoriteMovies data...
    localStorage.clear();
    //...and return to welcome page
    this.router.navigate(['/welcome']);
  }

}
