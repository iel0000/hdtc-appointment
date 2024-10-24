import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core/auth';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  get isAuthenticated(): boolean {
    return this.authenticationService.isAuthenticated();
  }

}
