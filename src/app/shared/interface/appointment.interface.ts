export interface IAppointment {
  isAcceptedTerms: boolean;
  schedule: ISchedule;
  personalInformation: IPersonalInformation;
  visaInformation: IVisaInformation;
}

export interface ISchedule {
  site: string;
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

export interface IVisaInformation {
  id: number;
  embassy: string;
  visaType: string;
  visaCategory: string;
  isFirstVisa: string;
  hasVisaRejected: string;
  lengthOfStay: string;
  hasLetterReceived: string;
  isTemporaryVisa: string;
  isHealthAssessed: string;
  intendedWork: string;
}
