import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  isAppointment = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log(this.router.url.split('/')[1]);
    if (this.router.url.split('/')[1] === 'appointment') {
      this.isAppointment = true;
    }
  }
}
