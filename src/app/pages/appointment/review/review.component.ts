import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { statusMessage } from '@app/shared/constant';
import {
  IAppointment,
  IChoices,
  IDropDown,
  IPersonalInformation,
  ISchedule
} from '@app/shared/interface';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { Subject, take, takeUntil } from 'rxjs';
import { HttpService } from 'src/services/http.service';
import { ResetAppointmentForm, selectRecord } from '../store';
import { IProduct } from '@app/shared/interface/product.interface';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit, OnDestroy {
  reviewForm!: IAppointment;
  private ngUnsubscribe = new Subject<void>();
  products: IProduct | undefined
  timeSlots: string[] = []

  id: any;


  constructor(
    private store: Store,
    private router: Router,
    private httpService: HttpService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {
    this.reviewForm = {
      isAcceptedTerms: false,
      schedule: {
        product: 0,
        appointmentDate: '',
        appointmentTime: [],
      },
      timeSlots: []
    };
  }

  get scheduleInformation(): any {
    return this.reviewForm.schedule;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.store
      .select(selectRecord)
      .pipe(take(1))
      .subscribe(s => {
        this.reviewForm.schedule = s.schedule;
        this.httpService.get(`Admin/GetServicesById/${s.schedule.product}`)
            .subscribe((response: IProduct) => {
              this.products = response
            })

        this.reviewForm.timeSlots = s.timeSlots
        if(s.timeSlots.length > 0){
          this.timeSlots = []
          s.timeSlots.forEach(element => {
            if(s.schedule.appointmentTime.includes(element.id)){
              this.timeSlots.push(element.name)
            }
          });
        }
      });

  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  back() {
    this.router.navigate(['appointment/schedule']);
  }

  saveRecord() {
    this.httpService
      .post('Appointment/SaveAppointment', this.reviewForm)
      .pipe()
      .subscribe(
        response => {
          this.messageService.add({
            severity: response.status.toLowerCase(),
            summary: 'Save Record',
            detail: response.message,
          });

          if (response.status === 'Success') {
            this.store.dispatch(ResetAppointmentForm());
            this.router.navigate(['appointment/notice']);
          }
        },
        error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Save Record',
            detail: error.message,
          });
        }
      );
  }

  getScheduleTime(): string {
    if(this.timeSlots.length > 0){
      return this.timeSlots.join(', ')
    }

    return ''
  }
}
