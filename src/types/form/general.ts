export interface GeneralFields {
  // Dati studente + tirocinio
  academicYear: string;
  courseYear: string;
  studentFirstName: string;
  studentLastName: string;
  studentId: string;
  internshipPeriodFrom: string;
  internshipPeriodTo: string;
  internshipLocation: string;
  ward: string;
  clinicalGuide: string;
  coordinator: string;
  tutor: string;

  // Dati paziente + ammissione
  patientGender: string;
  patientAge: string;
  nationality: string;
  patientLanguage: string;
  careStartDate: string;
  careEndDate: string;
  assessmentStartDate: string;
  maritalStatus: string;
  referencePerson: string;
  admissionDate: string;
  admissionType: string;
  admissionTransferFrom: string;
  origin: string;
  originOther: string;
  arrivalMode: string;
  medicalDiagnosis: string;
  admissionReason: string;
  pastMedicalHistory: Array<{ date: string; pathology: string; notes: string }>;
  dataSource: string;
  dataSourceOther: string;
}

export const defaultGeneralValues: GeneralFields = {
  academicYear: '',
  courseYear: '',
  studentFirstName: '',
  studentLastName: '',
  studentId: '',
  internshipPeriodFrom: '',
  internshipPeriodTo: '',
  internshipLocation: '',
  ward: '',
  clinicalGuide: '',
  coordinator: '',
  tutor: '',
  patientGender: '',
  patientAge: '',
  nationality: '',
  patientLanguage: '',
  careStartDate: '',
  careEndDate: '',
  assessmentStartDate: '',
  maritalStatus: '',
  referencePerson: '',
  admissionDate: '',
  admissionType: '',
  admissionTransferFrom: '',
  origin: '',
  originOther: '',
  arrivalMode: '',
  medicalDiagnosis: '',
  admissionReason: '',
  pastMedicalHistory: [],
  dataSource: '',
  dataSourceOther: '',
};
