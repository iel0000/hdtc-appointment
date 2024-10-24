import {
  IPersonalInformation,
  ISchedule,
  IVisaInformation,
} from '@app/shared/interface';
import { createAction, props } from '@ngrx/store';

export const ResetAppointmentForm = createAction(
  '[Appointment Component] Reset ResetAppointmentForm'
);

export const UpdatePersonalInformation = createAction(
  '[Personal Component] Update Personal Information',
  props<{ payload: IPersonalInformation }>()
);

export const UpdateAcceptedTerms = createAction(
  '[Notice Component] Update Accepted Terms',
  props<{ payload: boolean }>()
);

export const UpdateSchedule = createAction(
  '[Schedule Component] Update Schedule',
  props<{ payload: ISchedule }>()
);

export const UpdateVisaInformation = createAction(
  '[Visa Info Component] Update Visa Information',
  props<{ payload: IVisaInformation }>()
);
