import { createReducer, on } from '@ngrx/store';
import * as AppointmentPageActions from './appointment.action';
import { formatDate } from '@angular/common';
import { IAppointment, ISchedule } from '@app/shared/interface';

export const initialState: IAppointment = {
  isAcceptedTerms: false,
  schedule: {
    appointmentDate: '',
    appointmentTime: '',
    site: '',
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
  visaInformation: {
    id: 0,
    embassy: '',
    visaType: '',
    visaCategory: '',
    isFirstVisa: '',
    hasVisaRejected: '',
    lengthOfStay: '0',
    hasLetterReceived: '',
    isTemporaryVisa: '',
    isHealthAssessed: '',
    intendedWork: '0',
  },
};

export const appointmentPageReducer = createReducer(
  initialState,
  on(AppointmentPageActions.ResetAppointmentForm, (state): IAppointment => {
    let schedule = initialState.schedule;
    let personalInformation = initialState.personalInformation;
    let visaInformation = initialState.visaInformation;
    return {
      ...state,
      isAcceptedTerms: false,
      schedule,
      personalInformation,
      visaInformation,
    };
  }),
  on(
    AppointmentPageActions.UpdateAcceptedTerms,
    (state, { payload }): IAppointment => {
      return {
        ...state,
        isAcceptedTerms: payload,
      };
    }
  ),
  on(
    AppointmentPageActions.UpdateSchedule,
    (state, { payload }): IAppointment => {
      let values = { ...payload };
      values.appointmentDate = payload.appointmentDate
        ? formatDate(
            payload.appointmentDate,
            'yyyy-MM-ddT00:00:00.000',
            'en-US'
          )
        : '';

      return {
        ...state,
        schedule: values,
      };
    }
  ),
  on(
    AppointmentPageActions.UpdatePersonalInformation,
    (state, { payload }): IAppointment => {
      let values = { ...payload };
      values.birthDate = payload.birthDate
        ? formatDate(payload.birthDate, 'yyyy-MM-ddT00:00:00.000', 'en-US')
        : '';

      values.dateIssued = payload.dateIssued
        ? formatDate(payload.dateIssued, 'yyyy-MM-ddT00:00:00.000', 'en-US')
        : '';

      values.menstrualPeriodEnd = payload.menstrualPeriodEnd
        ? formatDate(
            payload.menstrualPeriodEnd,
            'yyyy-MM-ddT00:00:00.000',
            'en-US'
          )
        : '';

      values.menstrualPeriodStart = payload.menstrualPeriodStart
        ? formatDate(
            payload.menstrualPeriodStart,
            'yyyy-MM-ddT00:00:00.000',
            'en-US'
          )
        : '';

      return {
        ...state,
        personalInformation: values,
      };
    }
  ),
  on(
    AppointmentPageActions.UpdateVisaInformation,
    (state, { payload }): IAppointment => {
      return { ...state, visaInformation: payload };
    }
  )
);
