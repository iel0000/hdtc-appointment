import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { Subject } from 'rxjs';
import { ResetAppointmentForm } from './store';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
})
export class AppointmentComponent implements OnInit, OnDestroy {
  items: MenuItem[];
  private unsubscribe$ = new Subject<void>();

  constructor(private formBuilder: FormBuilder, private store: Store) {
    this.items = [
      { label: 'Notice', routerLink: 'notice' },
      { label: 'Schedule', routerLink: 'schedule' },
      { label: 'Personal Info', routerLink: 'personal-info' },
      { label: 'Visa Info', routerLink: 'visa-info' },
      { label: 'Review', routerLink: 'review' },
    ];
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.store.dispatch(ResetAppointmentForm());
  }
}
