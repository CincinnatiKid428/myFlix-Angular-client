// File: src/app/app.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import { BreakpointObserver, Breakpoints, LayoutModule } from '@angular/cdk/layout';

//Angular Matieral imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { AuthCheckService } from './auth-check.service'; //For auth checks & updates from this component

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
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

/**
 * Root component for application
 * @author P. Weaver
 */
export class AppComponent implements OnInit {

  isMobile = false; // running on mobile device state
  isLoggedIn: boolean = false;

  /**
   * 
   * @param breakpointObserver - Observes device breakpoints
   * @param router - Router instance
   * @param authCheckService - Observes authentication state
   */
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

  /**
   * Calls AuthCheckService's init() function and then subscribes to isLoggedIn$ observable.
   */
  ngOnInit(): void {
    // Safe to access browser-only APIs here
    this.authCheckService.init();

    // Subscribe to login state changes
    this.authCheckService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  }

  /**
   * Notifies authCheckService of logout & routes to Welcome Page
   */
  logout(): void {
    this.authCheckService.logout(); // notify service
    this.router.navigate(['/welcome']);
  }
}