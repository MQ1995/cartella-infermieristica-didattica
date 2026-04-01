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
  weightNotDetectedReason: string;
  height: string;
  temperature: string;
  temperatureLocation: string;
  idealWeight: string;
  bmi: string;
  weightClass: string;
  obesityGrade: string;
  basalMetabolism: string;
  caloricNeed: string;
  dentition: string;
  dentitionProsthesisType: string;
  swallowing: string;
  swallowingAlteration: string;
  enteralNutrition: string;
  enteralNutritionType: string;
  enteralNutritionSize: string;
  enteralNutritionDate: string;
  parenteralNutrition: string;
  capillaryGlycemia: string;
  
  malnutritionTool: string;
  malnutritionRiskScore: string;
  malnutritionRisk: boolean;

  // Skin Status
  skinTemperature: string;
  skinColdLocation: string;
  skinWarmLocation: string;
  skinColor: string;
  skinColorOther: string;
  skinTurgor: string;
  skinMoisture: string;
  itching: boolean;
  itchingLocation: string;
  erythema: boolean;
  erythemaLocation: string;
  edema: boolean;
  edemaLocation: string;
  edemaGrade: string;
  tc: string;

  vascularAccess: boolean;
  vascularAccessType: string;
  vascularAccessDetailsType: string;
  vascularAccessLocation: string;
  vascularAccessDate: string;
  vascularAccessDressing: string;
  vascularAccessDressingDate: string;
  exitSiteScale: string;
  exitSiteScore: string;

  skinIntegrity: boolean;
  surgicalWounds: string;
  skinLesions: string;
  otherSkinLesions: string;
  skinAppendagesAlterations: string;

  bradenScore: number;
  pressureUlcerRisk: string;
  pressureUlcerRiskFactors: string;
  pressureUlcerRiskFactorsDetails: string;

  throatScaleScore: string;
  
  model2Notes: string;
  model2Status: string;

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
  weightNotDetectedReason: '',
  height: '',
  temperature: '',
  temperatureLocation: '',
  idealWeight: '',
  bmi: '',
  weightClass: '',
  obesityGrade: '',
  basalMetabolism: '',
  caloricNeed: '',
  dentition: '',
  dentitionProsthesisType: '',
  swallowing: '',
  swallowingAlteration: '',
  enteralNutrition: '',
  enteralNutritionType: '',
  enteralNutritionSize: '',
  enteralNutritionDate: '',
  parenteralNutrition: '',
  capillaryGlycemia: '',
  malnutritionTool: '',
  malnutritionRiskScore: '',
  malnutritionRisk: false,
  skinTemperature: '',
  skinColdLocation: '',
  skinWarmLocation: '',
  skinColor: '',
  skinColorOther: '',
  skinTurgor: '',
  skinMoisture: '',
  itching: false,
  itchingLocation: '',
  erythema: false,
  erythemaLocation: '',
  edema: false,
  edemaLocation: '',
  edemaGrade: '',
  tc: '',
  vascularAccess: false,
  vascularAccessType: '',
  vascularAccessDetailsType: '',
  vascularAccessLocation: '',
  vascularAccessDate: '',
  vascularAccessDressing: '',
  vascularAccessDressingDate: '',
  exitSiteScale: '',
  exitSiteScore: '',
  skinIntegrity: true,
  surgicalWounds: '',
  skinLesions: '',
  otherSkinLesions: '',
  skinAppendagesAlterations: '',
  bradenScore: 0,
  pressureUlcerRisk: '',
  pressureUlcerRiskFactors: '',
  pressureUlcerRiskFactorsDetails: '',
  throatScaleScore: '',
  model2Notes: '',
  model2Status: '',
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