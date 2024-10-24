import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Embassy } from '@app/shared/constant/embassy';
import { visaCategory } from '@app/shared/constant/visacategory';
import { visaType } from '@app/shared/constant/visatype';
import { IDropDown, IVisaInformation } from '@app/shared/interface';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { HttpService } from 'src/services/http.service';
import { AppointmentService } from '../appointment.service';
import { selectRecord, UpdateVisaInformation } from '../store';

@Component({
  selector: 'app-visa-info',
  templateUrl: './visa-info.component.html',
  styleUrls: ['./visa-info.component.scss'],
})
export class VisaInfoComponent implements OnInit, OnDestroy {
  submitted: boolean = false;
  visaForm: FormGroup;
  embassy!: IDropDown[];
  visaType!: IDropDown[];
  visaCategory!: IDropDown[];
  lengthOfStay!: IDropDown[];
  intendedWork!: IDropDown[];

  private ngUnsubscribe = new Subject<void>();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private store: Store,
    private appointmentSvc: AppointmentService,
    private httpService: HttpService
  ) {
    this.visaForm = this.formBuilder.group({
      id: 0,
      embassy: ['', Validators.required],
      visaType: ['', Validators.required],
      visaCategory: ['', Validators.required],
      isFirstVisa: ['', Validators.required],
      hasVisaRejected: ['', Validators.required],
      lengthOfStay: '0',
      hasLetterReceived: '',
      isTemporaryVisa: '',
      isHealthAssessed: '',
      intendedWork: '0',
    });
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

        this.visaForm.patchValue({
          id: s.visaInformation.id,
          embassy: s.visaInformation.embassy,
          visaType: s.visaInformation.visaType,
          visaCategory: s.visaInformation.visaCategory,
          isFirstVisa: s.visaInformation.isFirstVisa,
          hasVisaRejected: s.visaInformation.hasVisaRejected,
          lengthOfStay: s.visaInformation.lengthOfStay,
          hasLetterReceived: s.visaInformation.hasLetterReceived,
          isTemporaryVisa: s.visaInformation.isTemporaryVisa,
          isHealthAssessed: s.visaInformation.isHealthAssessed,
          intendedWork: s.visaInformation.intendedWork,
        });
      });

    this.getVisaTypes();
    this.getEmbassies();
    this.getLengthOfStay();
    this.getIntendedWork();
  }

  getEmbassies() {
    this.httpService.get('Appointment/GetEmbassies').subscribe(response => {
      this.embassy = response;
    });
  }

  getVisaTypes() {
    this.httpService.get('Appointment/GetVisaTypes').subscribe(response => {
      this.visaType = response;
    });
  }

  validateControl(controlName: string): boolean {
    if (
      (this.visaForm.get(controlName)?.dirty ||
        this.visaForm.get(controlName)?.touched) &&
      this.visaForm.get(controlName)?.invalid
    ) {
      return true;
    }
    return false;
  }

  getLengthOfStay() {
    this.httpService
      .get('Appointment/GetIntendedLengthOfStay')
      .subscribe(response => {
        this.lengthOfStay = response;
      });
  }

  getIntendedWork() {
    this.httpService.get('Appointment/GetIntendedWork').subscribe(response => {
      this.intendedWork = response;
    });
  }

  onEmbassyChange(event: any) {
    let embassyId = +event.value;
    // this.appointmentSvc.getVisaCategory(embassyId);

    this.httpService
      .get(`Appointment/GetVisaCategories/${embassyId}`)
      .subscribe(response => {
        this.visaCategory = response;
        this.visaForm.get('isTemporaryVisa')?.patchValue('');
        this.visaForm.get('isHealthAssessed')?.patchValue('');
        this.visaForm.get('intendedWork')?.patchValue('0');
        this.visaForm.get('lengthOfStay')?.patchValue('0');
        this.visaForm.get('hasLetterReceived')?.patchValue('');

        if (embassyId === 1) {
          this.visaForm
            .get('isTemporaryVisa')
            ?.setValidators(Validators.required);
          this.visaForm
            .get('isHealthAssessed')
            ?.setValidators(Validators.required);
          this.visaForm
            .get('intendedWork')
            ?.setValidators([Validators.required, Validators.min(1)]);
          this.visaForm.get('lengthOfStay')?.setValidators(null);
          this.visaForm.get('hasLetterReceived')?.setValidators(null);
        } else if (embassyId === 2) {
          this.visaForm
            .get('hasLetterReceived')
            ?.setValidators(Validators.required);
          this.visaForm.get('isTemporaryVisa')?.setValidators(null);
          this.visaForm.get('isHealthAssessed')?.setValidators(null);
          this.visaForm.get('intendedWork')?.setValidators(null);
          this.visaForm.get('lengthOfStay')?.setValidators(null);
        } else if (embassyId === 3) {
          this.visaForm
            .get('lengthOfStay')
            ?.setValidators([Validators.required, Validators.min(1)]);
          this.visaForm.get('hasLetterReceived')?.setValidators(null);
          this.visaForm.get('isTemporaryVisa')?.setValidators(null);
          this.visaForm.get('isHealthAssessed')?.setValidators(null);
          this.visaForm.get('intendedWork')?.setValidators(null);
        }

        this.visaForm.get('isTemporaryVisa')?.updateValueAndValidity();
        this.visaForm.get('isHealthAssessed')?.updateValueAndValidity();
        this.visaForm.get('intendedWork')?.updateValueAndValidity();
        this.visaForm.get('lengthOfStay')?.updateValueAndValidity();
        this.visaForm.get('hasLetterReceived')?.updateValueAndValidity();
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  nextPage() {
    if (!this.visaForm.invalid) {
      this.store.dispatch(
        UpdateVisaInformation({
          payload: <IVisaInformation>this.visaForm.getRawValue(),
        })
      );
      this.router.navigate(['appointment/review']);
    }
  }

  prevPage() {
    this.store.dispatch(
      UpdateVisaInformation({
        payload: <IVisaInformation>this.visaForm.getRawValue(),
      })
    );
    this.router.navigate(['appointment/personal-info']);
  }
}
