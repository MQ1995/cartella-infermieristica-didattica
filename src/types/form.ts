export interface NursingAssessment {
  // 1. Dati Generali
  academicYear: string;
  courseYear: string;
  studentName: string;
  studentId: string;
  internshipPeriod: string;
  internshipLocation: string;
  ward: string;
  clinicalGuide: string;
  coordinator: string;
  tutor: string;
  
  // Patient Info
  patientGender: string;
  patientAge: string;
  nationality: string;
  language: string;
  maritalStatus: string;
  referencePerson: string;
  admissionDate: string;
  admissionType: string;
  admissionTransferFrom: string;
  origin: string;
  arrivalMode: string;
  medicalDiagnosis: string;
  admissionReason: string;
  pastMedicalHistory: Array<{ date: string; pathology: string }>;
  dataSource: string;
  dataSourceOther: string;
  
  // 2. Accertamento (Gordon)
  // Health Perception
  generalHealth: string;
  healthPromotion: string;
  preventiveActions: string;
  alcoholConsumption: boolean;
  alcoholDetails: string;
  smoking: boolean;
  smokingDetails: string;
  allergies: boolean;
  allergyDetails: string;
  physicalAppearance: string;
  homeTherapy: Array<{ drug: string; reason: string; dose: string; schedule: string; route: string }>;
  model1Notes: string;
  model1Status: string;
  conleyScore: number;
  fallRisk: boolean;

  // Nutrition
  eatingHabits: string;
  dietaryRestrictions: string;
  foodAllergies: string;
  weightChange: string;
  weightChangeAmount: string;
  appetite: string;
  appetiteAlterations: string[];
  currentWeight: string;
  height: string;
  temperature: string;
  idealWeight: string;
  bmi: string;
  weightClass: string;
  basalMetabolism: string;
  caloricNeed: string;
  dentition: string;
  swallowing: string;
  enteralNutrition: string;
  parenteralNutrition: string;
  capillaryGlycemia: string;
  mustScore: number;
  malnutritionRisk: boolean;

  // Skin Status
  skinTemperature: string;
  skinColor: string;
  skinTurgor: string;
  skinMoisture: string;
  itching: boolean;
  itchingLocation: string;
  erythema: boolean;
  erythemaLocation: string;
  edema: boolean;
  edemaLocation: string;
  edemaGrade: string;
  vascularAccess: boolean;
  vascularAccessType: string;
  skinIntegrity: boolean;
  wounds: Array<{ type: string; location: string; description: string; x: number; y: number }>;
  bradenScore: number;
  pressureUlcerRisk: string;

  // Elimination
  urinationType: string;
  urinationAlterations: string[];
  urineCharacteristics: string;
  diuresis24h: string;
  incontinenceAids: string;
  urinaryCatheter: string;
  bowelFrequency: string;
  bowelAlterations: string[];
  laxatives: string;
  stoolCharacteristics: string;
  abdomen: string;

  // Activity & Exercise
  energyLevel: string;
  leisureActivities: string;
  exercise: string;
  barthelScore: number;
  respiratoryFunction: string;
  respiratoryRate: string;
  spo2: string;
  heartRate: string;
  bloodPressure: string;
  
  // Other Models (Sleep, Cognitive, Self-perception, Roles, Sexuality, Coping, Values)
  sleepHours: string;
  sleepRested: boolean;
  sleepMeds: string;
  consciousness: string;
  orientation: string;
  pain: boolean;
  painNrs: string;
  selfDescription: string;
  maritalRole: string;
  stressFactors: string;
  religiousRestrictions: string;

  // 3. Scale
  // Handled via computed values or specific fields above

  // 4. Piano di Assistenza (PES)
  carePlans: Array<{ problem: string; objective: string; plannedInterventions: string; implementedInterventions: string; evaluation: string }>;
}

export const defaultValues: NursingAssessment = {
  academicYear: '',
  courseYear: '',
  studentName: '',
  studentId: '',
  internshipPeriod: '',
  internshipLocation: '',
  ward: '',
  clinicalGuide: '',
  coordinator: '',
  tutor: '',
  patientGender: '',
  patientAge: '',
  nationality: '',
  language: '',
  maritalStatus: '',
  referencePerson: '',
  admissionDate: '',
  admissionType: '',
  admissionTransferFrom: '',
  origin: '',
  arrivalMode: '',
  medicalDiagnosis: '',
  admissionReason: '',
  pastMedicalHistory: [],
  dataSource: '',
  dataSourceOther: '',
  generalHealth: '',
  healthPromotion: '',
  preventiveActions: '',
  alcoholConsumption: false,
  alcoholDetails: '',
  smoking: false,
  smokingDetails: '',
  allergies: false,
  allergyDetails: '',
  physicalAppearance: '',
  homeTherapy: [],
  model1Notes: '',
  model1Status: '',
  conleyScore: 0,
  fallRisk: false,
  eatingHabits: '',
  dietaryRestrictions: '',
  foodAllergies: '',
  weightChange: '',
  weightChangeAmount: '',
  appetite: '',
  appetiteAlterations: [],
  currentWeight: '',
  height: '',
  temperature: '',
  idealWeight: '',
  bmi: '',
  weightClass: '',
  basalMetabolism: '',
  caloricNeed: '',
  dentition: '',
  swallowing: '',
  enteralNutrition: '',
  parenteralNutrition: '',
  capillaryGlycemia: '',
  mustScore: 0,
  malnutritionRisk: false,
  skinTemperature: '',
  skinColor: '',
  skinTurgor: '',
  skinMoisture: '',
  itching: false,
  itchingLocation: '',
  erythema: false,
  erythemaLocation: '',
  edema: false,
  edemaLocation: '',
  edemaGrade: '',
  vascularAccess: false,
  vascularAccessType: '',
  skinIntegrity: true,
  wounds: [],
  bradenScore: 0,
  pressureUlcerRisk: '',
  urinationType: '',
  urinationAlterations: [],
  urineCharacteristics: '',
  diuresis24h: '',
  incontinenceAids: '',
  urinaryCatheter: '',
  bowelFrequency: '',
  bowelAlterations: [],
  laxatives: '',
  stoolCharacteristics: '',
  abdomen: '',
  energyLevel: '',
  leisureActivities: '',
  exercise: '',
  barthelScore: 0,
  respiratoryFunction: '',
  respiratoryRate: '',
  spo2: '',
  heartRate: '',
  bloodPressure: '',
  sleepHours: '',
  sleepRested: true,
  sleepMeds: '',
  consciousness: '',
  orientation: '',
  pain: false,
  painNrs: '',
  selfDescription: '',
  maritalRole: '',
  stressFactors: '',
  religiousRestrictions: '',
  carePlans: []
};