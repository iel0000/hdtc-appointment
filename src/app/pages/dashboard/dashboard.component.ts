import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core/auth';
import { HttpService } from '@app/shared/services';
import { environment } from '@environments/environment';
import { faBars, faBell, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isOpen = false;
  faBars = faBars;
  faBell = faBell;
  faChartLine = faChartLine;
  basicData: any;
  basicOptions: any;
  userCount!: number;
  appointmentCount!: number;
  registrationCount!: number;
  isAdmin = false;

  pageTitle: string | undefined;
  constructor(
    private httpSvc: HttpService,
    private messageService: MessageService,
    private authSvc: AuthenticationService
  ) {}

  ngOnInit() {
    this.pageTitle = 'Home';

    //Todo get details from DB
    // this.basicData = {
    //   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    //   datasets: [
    //     {
    //       label: 'First Dataset',
    //       data: [65, 59, 80, 81, 56, 55, 40],
    //       fill: false,
    //       borderColor: '#42A5F5',
    //       tension: 0.4,
    //     },
    //   ],
    // };

    this.isAdmin = this.authSvc.currentUserValue.role.some(
      (x: any) => x === 'Admin'
    );

    if (this.isAdmin) {
      this.loadUsers();
    }
    this.loadPendingAppointments();
    this.loadRegistration();
  }

  loadUsers() {
    this.httpSvc.get('Admin/GetAllUsers').subscribe(
      response => {
        this.userCount = response.length;
      },
      error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Get User Count',
          detail: error.message,
        });
      }
    );
  }

  loadPendingAppointments() {
    this.httpSvc.get('Appointment/GetPendingAppointments').subscribe(
      response => {
        this.appointmentCount = response.length;
      },
      error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Get Appointment Count',
          detail: error.message,
        });
      }
    );
  }

  loadRegistration() {
    this.httpSvc.get('Client/GetRegistrationList').subscribe(
      response => {
        this.registrationCount = response.length;
      },
      error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Get Registration Count',
          detail: error.message,
        });
      }
    );
  }
}
