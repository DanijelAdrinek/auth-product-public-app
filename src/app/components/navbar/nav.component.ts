import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{

  private authSubscription: Subscription | undefined;

  public isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.authSubscription = this.authService.isAuthenticated().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }
  logout() {
    this.authService.logout();
  }
}