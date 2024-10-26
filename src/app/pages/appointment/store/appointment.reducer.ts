import { createReducer, on } from '@ngrx/store';
import * as AppointmentPageActions from './appointment.action';
import { formatDate } from '@angular/common';
import { IAppointment, ISchedule } from '@app/shared/interface';

export const initialState: IAppointment = {
  isAcceptedTerms: false,
  schedule: {
    appointmentDate: '',
    appointmentTime: 0,
    product: 0,
    price: 0
  },
  timeSlots: []
};

export const appointmentPageReducer = createReducer(
  initialState,
  on(AppointmentPageActions.ResetAppointmentForm, (state): IAppointment => {
    let schedule = initialState.schedule;
    return {
      ...state,
      isAcceptedTerms: false,
      schedule
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
    AppointmentPageActions.UpdateTimeSlots,
    (state, { payload }): IAppointment => {

      return {
        ...state,
        timeSlots: payload,
      };
    }
  )
);
