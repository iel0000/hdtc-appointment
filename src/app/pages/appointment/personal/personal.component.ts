import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CiviStatus } from '@app/shared/constant/civilStatus';
import { Gender } from '@app/shared/constant/gender';
import { IDropDown, IPersonalInformation } from '@app/shared/interface';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { HttpService } from 'src/services/http.service';
import { selectRecord, UpdatePersonalInformation } from '../store';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
})
export class PersonalComponent implements OnInit, OnDestroy {
  personalForm: FormGroup;
  gender = Gender;
  categories!: IDropDown[];
  referrals!: IDropDown[];
  civilStatus = CiviStatus;
  isPassportRequired = true;

  today: Date;
  birthDate!: string;
  dateIssued!: string;
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private store: Store,
    private httpSvc: HttpService
  ) {
    this.today = new Date();
    this.personalForm = this.formBuilder.group({
      id: 0,
      personalCategory: ['', Validators.required],
      referral: ['', Validators.required],
      firstName: ['', [Validators.required, Validators.pattern(/[\S]/)]],
      lastName: ['', [Validators.required, Validators.pattern(/[\S]/)]],
      middleName: ['', [Validators.required, Validators.pattern(/[\S]/)]],
      birthDate: ['', [Validators.required, Validators.pattern(/[\S]/)]],
      age: ['', [Validators.required, Validators.pattern(/[\S]/)]],
      gender: ['', [Validators.required, Validators.pattern(/[\S]/)]],
      mobileNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.pattern(/[\S]/)]],
      civilStatus: ['', Validators.required],
      hasMenstrualPeriod: false,
      menstrualPeriodStart: '',
      menstrualPeriodEnd: '',
      intendedOccupation: ['', Validators.required],
      hasPassport: false,
      passportNumber: ['', Validators.required],
      dateIssued: ['', Validators.required],
      isExpired: [false, Validators.required],
      hasOtherId: false,
      otherId: '',
      landLineNumber: ['', Validators.required],
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

        this.birthDate = s.personalInformation.birthDate;
        this.dateIssued = s.personalInformation.dateIssued;

        this.personalForm.patchValue({
          id: s.personalInformation.id,
          personalCategory: s.personalInformation.personalCategory,
          referral: s.personalInformation.referral,
          firstName: s.personalInformation.firstName,
          lastName: s.personalInformation.lastName,
          middleName: s.personalInformation.middleName,
          birthDate: this.birthDate,
          age: s.personalInformation.age,
          gender: s.personalInformation.gender,
          address: s.personalInformation.address,
          mobileNumber: s.personalInformation.mobileNumber,
          email: s.personalInformation.email,
          civilStatus: s.personalInformation.civilStatus,
          hasMenstrualPeriod: s.personalInformation.hasMenstrualPeriod,
          menstrualPeriodStart: s.personalInformation.menstrualPeriodStart
            ? s.personalInformation.menstrualPeriodStart
            : '',
          menstrualPeriodEnd: s.personalInformation.menstrualPeriodEnd
            ? s.personalInformation.menstrualPeriodEnd
            : '',
          intendedOccupation: s.personalInformation.intendedOccupation,
          hasPassport: s.personalInformation.hasPassport,
          passportNumber: s.personalInformation.passportNumber,
          dateIssued: this.dateIssued,
          isExpired: s.personalInformation.isExpired,
          hasOtherId: s.personalInformation.hasOtherId,
          otherId: s.personalInformation.otherId,
          landLineNumber: s.personalInformation.landLineNumber,
          isAcceptedTerms: s.personalInformation.isAcceptedTerms,
        });

        this.isPassportRequired = !s.personalInformation.hasOtherId;

        if (!this.isPassportRequired) {
          this.personalForm.get('passportNumber')?.setValidators(null);
          this.personalForm.get('dateIssued')?.setValidators(null);
          this.personalForm.get('isExpired')?.setValidators(null);
        } else {
          this.personalForm
            .get('passportNumber')
            ?.addValidators(Validators.required);
          this.personalForm
            .get('dateIssued')
            ?.addValidators(Validators.required);
          this.personalForm
            .get('isExpired')
            ?.addValidators(Validators.required);
        }
      });

    this.httpSvc
      .get('Appointment/GetPersonalCategories')
      .subscribe(response => {
        this.categories = response;
      });

    this.httpSvc.get('Appointment/GetReferrals').subscribe(response => {
      this.referrals = response;
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  // Menstrual Validation
  validateMenstrualDates(event: any) {
    this.personalForm.get('menstrualPeriodStart')?.patchValue('');
    this.personalForm.get('menstrualPeriodEnd')?.patchValue('');
    if (event.checked) {
      this.personalForm
        .get('menstrualPeriodStart')
        ?.addValidators(Validators.required);
      this.personalForm
        .get('menstrualPeriodEnd')
        ?.addValidators(Validators.required);
    } else {
      this.personalForm.get('menstrualPeriodStart')?.setValidators(null);
      this.personalForm.get('menstrualPeriodEnd')?.setValidators(null);
    }

    this.personalForm.get('menstrualPeriodStart')?.updateValueAndValidity();
    this.personalForm.get('menstrualPeriodEnd')?.updateValueAndValidity();
  }
  // Calculate Age
  calculateAge() {
    let control = this.personalForm.get('birthDate');
    console.log(control?.value);
    let age = 0;
    if (!control?.invalid) {
      let timeDiff = Math.abs(Date.now() - new Date(control?.value).getTime());
      age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    }

    this.personalForm.patchValue({ age: age });
  }
  // Other ID
  validateOtherId(event: any) {
    this.personalForm.get('otherId')?.patchValue('');
    if (event.checked) {
      this.personalForm.get('otherId')?.addValidators(Validators.required);
      this.personalForm.get('passportNumber')?.patchValue('');
      this.personalForm.get('dateIssued')?.patchValue('');
      this.personalForm.get('isExpired')?.patchValue(false);

      this.personalForm.get('passportNumber')?.setValidators(null);
      this.personalForm.get('dateIssued')?.setValidators(null);
      this.personalForm.get('isExpired')?.setValidators(null);
    } else {
      this.personalForm.get('otherId')?.setValidators(null);
      this.personalForm.get('otherId')?.setErrors(null);
      this.personalForm
        .get('passportNumber')
        ?.addValidators(Validators.required);
      this.personalForm.get('dateIssued')?.addValidators(Validators.required);
      this.personalForm.get('isExpired')?.addValidators(Validators.required);
    }

    this.personalForm.get('otherId')?.updateValueAndValidity();
    this.personalForm.get('passportNumber')?.updateValueAndValidity();
    this.personalForm.get('dateIssued')?.updateValueAndValidity();
    this.personalForm.get('isExpired')?.updateValueAndValidity();

    this.isPassportRequired = !event.checked;
  }

  // Control Validator
  validateControl(controlName: string): boolean {
    if (
      (this.personalForm.get(controlName)?.dirty ||
        this.personalForm.get(controlName)?.touched) &&
      this.personalForm.get(controlName)?.invalid
    ) {
      return true;
    }
    return false;
  }

  onPassportChange(event: any) {
    console.log(event.target.value);
    if (event.target.value) {
      this.personalForm.get('hasOtherId')?.patchValue(false);
    }
  }

  nextPage() {
    this.store.dispatch(
      UpdatePersonalInformation({
        payload: <IPersonalInformation>this.personalForm.getRawValue(),
      })
    );
    this.router.navigate(['appointment/visa-info']);
    return;
  }
  prevPage() {
    this.router.navigate(['appointment/schedule']);
  }
}
