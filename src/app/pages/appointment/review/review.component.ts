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

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit, OnDestroy {
  reviewForm!: IAppointment;
  private ngUnsubscribe = new Subject<void>();

  labItems: Array<IChoices> = [];

  embassy: string | undefined;
  visaType: string | undefined;
  visaCategory: string | undefined;
  selectedLabRequisition: string[] = [];
  id: any;

  categories!: string;
  referrals!: string;
  intendedWork!: string;
  lengthOfStay!: string;

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
        appointmentTime: '',
      },
      personalInformation: {
        id: 0,
        personalCategory: '',
        referral: '',
        firstName: '',
        lastName: '',
        middleName: '',
        birthDate: '',
        age: '',
        gender: '',
        mobileNumber: '',
        email: '',
        address: '',
        civilStatus: '',
        hasMenstrualPeriod: false,
        menstrualPeriodStart: '',
        menstrualPeriodEnd: '',
        intendedOccupation: '',
        hasPassport: false,
        passportNumber: '',
        dateIssued: '',
        isExpired: false,
        hasOtherId: false,
        otherId: '',
        landLineNumber: '',
        isAcceptedTerms: false,
      },
    };
  }

  get personalInformation(): IPersonalInformation {
    return this.reviewForm.personalInformation;
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
        if (!s.personalInformation.firstName) {
          if (!s.isAcceptedTerms) {
            this.router.navigate(['appointment/notice']);
            return;
          }
        }
        this.reviewForm.isAcceptedTerms = s.isAcceptedTerms;
        this.reviewForm.schedule = s.schedule;
        this.reviewForm.personalInformation = s.personalInformation;
      });

    this.httpService
      .get('Appointment/GetPersonalCategories')
      .subscribe(response => {
        this.categories = response.find(
          (x: any) => x.code === this.personalInformation.personalCategory
        )?.name;
      });

    this.httpService.get('Appointment/GetReferrals').subscribe(response => {
      this.referrals = response.find(
        (x: any) => x.code === this.personalInformation.referral
      )?.name;
    });

  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  back() {
    this.router.navigate(['appointment/visa-info']);
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
}
