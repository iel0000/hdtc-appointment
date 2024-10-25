import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
import { HttpService } from 'src/services/http.service';
import { ResetAppointmentForm, selectRecord, UpdateSchedule, UpdateTimeSlots } from '../store';
import { IProduct } from '@app/shared/interface/product.interface';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit, OnDestroy {
  selectedTime!: number[];
  scheduleForm: FormGroup;
  appointmentDate!: string;
  appointmentTime!: IAppointmentTime[];
  today!: Date;
  product!: IProduct[];
  private ngUnsubscribe = new Subject<void>();
  selectedProduct!: number;
  invalidDates: Array<Date> = [];
  showCalendar = false;
  selectedDuration!: number

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store,
    private httpSvc: HttpService
  ) {
    this.scheduleForm = this.fb.group({
      product: [0, Validators.min(1)],
      appointmentDate: ['', Validators.required],
      appointmentTime: ['', Validators.required],
    });

    this.today = new Date();
    this.today.setDate(this.today.getDate() + 1);
  }

  get productDetails(): any {
    if (this.product && this.product !== undefined) {
      return this.product.find(x => x.id === this.selectedProduct);
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

        this.scheduleForm.patchValue({
          product: s.schedule.product,
          appointmentDate: s.schedule.appointmentDate,
          appointmentTime: s.schedule.appointmentTime,
        });

        this.appointmentDate = s.schedule.appointmentDate
          ? formatDate(s.schedule.appointmentDate, 'MM/dd/yyyy', 'en-US')
          : '';
        this.selectedTime = s.schedule.appointmentTime;
        this.selectedProduct = s.schedule.product;


        let payload = {
          appointmentDate: s.schedule.appointmentDate,
          serviceId: this.selectedProduct
        };

        if (this.appointmentDate) {
          this.httpSvc
            .post('Appointment/GetAppointmentTime', payload)
            .subscribe(response => {
              this.appointmentTime = response;
              this.showCalendar = true;
            });
        }

      });

      console.log("getservices")
    this.httpSvc.get('Admin/GetServices').subscribe(response => {
      this.product = response;
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getDisabledDays(event: any) {
    this.showCalendar = false;
    this.selectedTime = [];
    this.appointmentDate = '';
    this.scheduleForm.patchValue({
      appointmentDate: '',
    });

    if (this.selectedProduct) {
      this.httpSvc
        .get(`Appointment/GetDisabledDays`)
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
    this.scheduleForm.patchValue({ appointmentTime: [] });
    this.selectedTime = [];
    this.selectedDuration = this.product.find(x => x.id === this.selectedProduct)?.duration ?? 0

    let payload = {
      appointmentDate: formatDate(
        this.appointmentDate,
        'yyyy-MM-ddT00:00:00.000',
        'en-US'
      ),
      serviceId: this.selectedProduct
    };

    let currentProduct = this.product.find(x => x.id === this.selectedProduct)
    this.httpSvc
      .post('Appointment/GetAppointmentTime', payload)
      .subscribe(response => {
        this.appointmentTime = response;        

        this.scheduleForm.get('appointmentTime')?.setValidators([Validators.required, 
          Validators.minLength(currentProduct?.duration ?? 1)]);
        this.scheduleForm.get('appointmentTime')?.updateValueAndValidity();

      });
  }

  getSlotStatus(availableSlot: number): string {
    return availableSlot > 0 ? 'Available' : 'Fully Booked';
  }

  nextPage() {
    this.store.dispatch(
      UpdateSchedule({ payload: <ISchedule>this.scheduleForm.getRawValue() })
    );

    this.store.dispatch(
      UpdateTimeSlots({ payload: this.appointmentTime })
    );
    this.router.navigate(['appointment/review']);
    return;
  }

  onTimeSelect(event:any) {
    this.selectedTime.sort((a,b)=> a - b);
    this.scheduleForm.patchValue({
      appointmentTime: this.selectedTime
    })
  }

  isSelected(id: number): boolean {
    if(this.selectedTime) {
      return this.selectedTime.includes(id)
    }
    return false;
  }
}
