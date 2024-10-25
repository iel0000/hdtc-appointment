export interface IAppointment {
  isAcceptedTerms: boolean;
  schedule: ISchedule;
  personalInformation: IPersonalInformation;
}

export interface ISchedule {
  product: number;
  appointmentDate: string;
  appointmentTime: string;
}

export interface IPersonalInformation {
  id: number;
  personalCategory: string;
  referral: string;
  firstName: string;
  lastName: string;
  middleName: string;
  birthDate: string;
  age: string;
  gender: string;
  mobileNumber: string;
  email: string;
  address: string;
  civilStatus: string;
  hasMenstrualPeriod: boolean;
  menstrualPeriodStart: string;
  menstrualPeriodEnd: string;
  intendedOccupation: string;
  hasPassport: boolean;
  passportNumber: string;
  dateIssued: string;
  isExpired: boolean;
  hasOtherId: boolean;
  otherId: string;
  landLineNumber: string;
  isAcceptedTerms: boolean;
}

