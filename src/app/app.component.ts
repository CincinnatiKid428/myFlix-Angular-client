// File: src/app/app.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints, LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthCheckService } from './auth-check.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    NgIf,
    //NavbarComponent, //moving this directly into app.component.html due to layout issues
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  isMobile = false;
  isLoggedIn: boolean = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private authCheckService: AuthCheckService
  ) {
    //Determine what the device is to load navbar for large/small screen type
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isMobile = result.matches;
    });
  }

  ngOnInit(): void {
    // Safe to access browser-only APIs here
    this.authCheckService.init();

    // Subscribe to login state changes
    this.authCheckService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  //Determines if user is logged in based off their localStorage data
  /*isUserLoggedIn(): void {
    this.isLoggedIn = localStorage.getItem('user') && localStorage.getItem('token') ? true : false;
    this.isLoggedIn ? this.router.navigate(['/movies']) : null;
    console.log(`isUserLoggedIn(): User logged in? ${this.isLoggedIn}`)
  }*/

  //Function that will notify authCheckService of logout & route
  logout(): void {
    this.authCheckService.logout(); // <-- notify service
    this.router.navigate(['/welcome']);
  }
}