import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IAppointment,
  IAppointmentTime,
  IDropDown,
  ISchedule,
} from '@app/shared/interface';
import { IBranch } from '@app/shared/interface/branch.interface';
import { Store } from '@ngrx/store';
import { SelectItem } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { Site } from 'src/app/shared/constant/site';
import { HttpService } from 'src/services/http.service';
import { ResetAppointmentForm, selectRecord, UpdateSchedule } from '../store';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit, OnDestroy {
  site = Site;
  selectedTime!: string;
  scheduleForm: FormGroup;
  appointmentDate!: string;
  appointmentTime!: IAppointmentTime[];
  today!: Date;
  branch!: IBranch[];
  private ngUnsubscribe = new Subject<void>();
  selectedBranch!: string;
  invalidDates!: Array<Date>;
  showCalendar = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store,
    private httpSvc: HttpService
  ) {
    this.scheduleForm = this.fb.group({
      site: ['', Validators.required],
      appointmentDate: ['', Validators.required],
      appointmentTime: ['', Validators.required],
    });

    this.today = new Date();
    this.today.setDate(this.today.getDate() + 1);
  }

  get branchDetails(): any {
    if (this.branch) {
      return this.branch.find(x => x.id === this.selectedBranch);
    }
    return null;
  }

  isFullyBook(day: number, month: number, year: number): boolean {
    if (
      this.invalidDates.find(
        x =>
          x.getDate() === day &&
          x.getMonth() === month &&
          x.getFullYear() === year
      )
    ) {
      return true;
    }
    return false;
  }

  ngOnInit(): void {
    this.store
      .select(selectRecord)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(s => {
        if (!s.isAcceptedTerms) {
          this.router.navigate(['appointment/notice']);
          return;
        }

        this.scheduleForm.patchValue({
          site: s.schedule.site,
          appointmentDate: s.schedule.appointmentDate,
          appointmentTime: s.schedule.appointmentTime,
        });

        this.appointmentDate = s.schedule.appointmentDate
          ? formatDate(s.schedule.appointmentDate, 'MM/dd/yyyy', 'en-US')
          : '';
        this.selectedTime = s.schedule.appointmentTime;
        this.selectedBranch = s.schedule.site;

        let payload = {
          appointmentDate: s.schedule.appointmentDate,
          branchId: this.selectedBranch,
        };

        if (this.appointmentDate) {
          this.httpSvc
            .post('Appointment/GetAppointmentTime', payload)
            .subscribe(response => {
              this.appointmentTime = response;
            });
        }
      });

    this.httpSvc.get('Appointment/GetAllBranches').subscribe(response => {
      this.branch = response;
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getDisabledDays(event: any) {
    this.showCalendar = false;
    this.selectedTime = '';
    this.appointmentDate = '';
    this.scheduleForm.patchValue({
      appointmentDate: '',
      appointmentTime: '',
    });

    if (this.selectedBranch) {
      this.httpSvc
        .get(`Appointment/GetDisabledDays/${this.selectedBranch}`)
        .subscribe(response => {
          this.invalidDates = [];
          response.forEach((element: string) => {
            this.invalidDates.push(new Date(element));
          });
          this.showCalendar = true;
        });
    }
  }

  resetSelectedTime() {
    this.appointmentTime = [];
    this.scheduleForm.patchValue({ appointmentTime: '' });
    this.selectedTime = '';

    let payload = {
      appointmentDate: formatDate(
        this.appointmentDate,
        'yyyy-MM-ddT00:00:00.000',
        'en-US'
      ),
      branchId: this.selectedBranch,
    };

    this.httpSvc
      .post('Appointment/GetAppointmentTime', payload)
      .subscribe(response => {
        this.appointmentTime = response;
      });
  }

  getSlotStatus(availableSlot: number): string {
    return availableSlot > 0 ? 'Available' : 'Fully Booked';
  }

  nextPage() {
    this.store.dispatch(
      UpdateSchedule({ payload: <ISchedule>this.scheduleForm.getRawValue() })
    );
    this.router.navigate(['appointment/personal-info']);
    return;
  }

  prevPage() {
    this.router.navigate(['appointment/notice']);
  }
}
