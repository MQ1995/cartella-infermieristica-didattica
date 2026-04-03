export interface NursingAssessment {
  // 1. Dati Generali
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
  
  // MODEL 1
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
  fallRiskScaleUsed: string;
  conleyEvaluations: Array<{
    date: string;
    conley1: string;
    conley2: string;
    conley3: string;
    conley4: string;
    conley5: string;
    conley6: string;
    notes: string;
  }>;

  // MODEL 2
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
  bradenEvaluations: Array<{
    date: string;
    sensory: string;
    moisture: string;
    activity: string;
    mobility: string;
    nutrition: string;
    friction: string;
    notes: string;
  }>;
  pressureUlcerRiskFactors: string;
  pressureUlcerRiskFactorsDetails: string;

  throatScaleScore: string;
  gcsEvaluations: Array<{
    date: string;
    time: string;
    eyes: string;
    verbal: string;
    motor: string;
    notes: string;
  }>;

  avpuEvaluations: Array<{
    date: string;
    time: string;
    score: string;
    notes: string;
  }>;

  borgEvaluations: Array<{
    date: string;
    time: string;
    score: string;
    notes: string;
  }>;

  barthelEvaluations: Array<{
    date: string;
    feeding: string;
    bathing: string;
    grooming: string;
    dressing: string;
    bowel: string;
    bladder: string;
    toilet: string;
    transfer: string;
    mobility: string;
    stairs: string;
    notes: string;
  }>;

  throatEvaluations: Array<{
    date: string;
    time: string;
    lips: string;
    teeth: string;
    gums: string;
    mucosa: string;
    tongue: string;
    saliva: string;
    pharynx: string;
    voice: string;
    swallowing: string;
    notes: string;
  }>;
  model2Notes: string;
  model2Status: string;

  // MODEL 3
  urinationType: string;
  urinationFrequency: string;
  urinaryIncontinenceTypes: string[];
  urinaryRetention: string;
  urinaryRetentionResidue: string;
  otherUrinaryAlterations: string[];
  pollakiuriaFrequency: string;
  urineCharacteristics: string;
  urineAlterationsDescription: string;
  diuresis24h: string;
  diuresisAlteration: string;
  incontinenceAids: string;
  incontinenceAidsDetails: string;
  urinaryCatheter: string;
  urinaryCatheterDate: string;
  urinaryCatheterDetails: string;
  urinaryCatheterManagement: string;
  urinaryCatheterManagedBy: string;
  urinaryStoma: string;
  urinaryStomaDetails: string;
  urinaryStomaManagement: string;
  urinaryStomaManagedBy: string;
  
  bowelFrequency: string;
  lastBowelMovement: string;
  bowelAlterations: string;
  bowelAlterationsTypes: string[];
  bowelIncontinenceType: string;
  bowelIncontinenceAids: string;
  bowelIncontinenceAidsDetails: string;
  laxatives: string;
  laxativesDetails: string;
  stoolCharacteristics: string;
  stoolAlterationsDetails: string;
  bristolScale: string;
  romaIIIScale: string;
  abdomenExam: string;
  peristalsis: string;
  peristalsisType: string;
  bowelStoma: string;
  bowelStomaDetails: string;
  bowelStomaManagement: string;
  bowelStomaManagedBy: string;
  drains: string;
  drainsDetails: string;
  eliminationOtherObservations: string;
  model3Notes: string;
  model3Status: string;

  // MODEL 4
  energyLevel: string;
  leisureActivities: string;
  exerciseRoutine: string;
  funcAlimentazione: string;
  funcCuraAspetto: string;
  funcBagno: string;
  funcMobilitaGen: string;
  funcGabinetto: string;
  funcCucinare: string;
  funcMobilitaLetto: string;
  funcCasa: string;
  funcVestirsi: string;
  funcSpesa: string;

  assumedPosition: string;
  decubitusType: string;
  muscleTone: string;
  muscleToneAlterations: string;
  muscleStrength: string;
  muscleStrengthAlterations: string;
  jointExcursion: string;
  jointExcursionAlterations: string;
  balance: string;
  walking: string;
  walkingAlterations: string;
  prosthesis: string;
  prosthesisDetails: string;
  barthelScore: string;
  generalAppearance: string;

  respiratoryFunction: string;
  respiratoryRate: string;
  spo2: string;
  breathingDepth: string;
  breathingQuality: string;
  dyspneaType: string;
  breathingAlterations: string[];
  breathingPathological: string;
  breathingOtherAlterations: string;
  respiratoryNoises: string;
  respiratoryNoisesDetails: string;
  coughReflex: string;
  cough: string;
  coughDetails: string;
  sputum: string;
  sputumDetails: string;
  sputumAbility: string;
  respiratoryDevice: string;
  respiratorySupport: string;

  pulseRate: string;
  pulseLocation: string;
  pulseType: string;
  pulseRhythm: string;
  pulseAmplitude: string;
  bloodPressureValue: string;
  bloodPressureLocation: string;
  bloodPressurePosture: string[];
  capillaryRefill: string;

  model4Notes: string;
  model4Status: string;

  // MODEL 5
  sleepHours: string;
  sleepRested: string;
  sleepRestedNotes: string;
  sleepFallAsleepDiff: string;
  sleepFallAsleepDiffNotes: string;
  sleepMaintainDiff: string;
  sleepMaintainDiffNotes: string;
  sleepMeds: string;
  sleepMedsDetails: string;
  sleepObservation: string;
  model5Notes: string;
  model5Status: string;

  // MODEL 6
  consciousness: string;
  avpuScore: string;
  gcsScore: string;
  otherNeurologicalEvaluations: string[];
  rassScore: string;
  orientation: string;
  disorientationTypes: string[];
  disorientationDuration: string;
  collaboration: string;
  collaborationDetails: string;
  collaborationFamilyDetails: string;
  collaborationPartialDetails: string;
  collaborationOtherDetails: string;
  spokenLanguage: string;
  speech: string;
  aphasiaType: string;
  comprehension: string;
  attitude: string;
  attitudeOther: string;
  memory: string;
  memoryAlterationDetails: string;
  concentration: string;
  concentrationAlterationDetails: string;
  vision: string;
  visionAlterationDetails: string;
  hearing: string;
  hearingAlterationDetails: string;
  pain: string;
  painLocation: string;
  painTime: string;
  painQuality: string;
  painFactors: string;
  painNrs: string;
  painTreatment: string;
  model6Notes: string;
  model6Status: string;

  // MODEL 7
  selfDescription: string;
  eyeContact: string;
  voicePatterns: string;
  interviewAttitude: string;
  interviewAttitudeOther: string;
  model7Notes: string;
  model7Status: string;

  // MODEL 8
  maritalStatusRoles: string;
  educationLevel: string;
  occupationalRole: string;
  occupationalActivityType: string;
  occupationalPrevious: string;
  occupationalDesired: string;
  occupationalEnrolled: string;
  livingSituation: string;
  livingSituationOther: string;
  familyStructure: string;
  significantRelationships: string;
  supportSystem: string[];
  supportSystemOther: string;
  model8Notes: string;
  model8Status: string;

  // MODEL 9
  lastMenstruation: string;
  menarche: string;
  menstrualProblems: string;
  menopause: string;
  menopauseProblems: string;
  pregnancies: string;
  contraceptives: string;
  contraceptivesProblems: string;
  breastExam: string;
  breastExamReason: string;
  screeningTests: string;
  screeningTestsReason: string;
  numberOfChildren: string;
  testiclesExam: string;
  testiclesExamReason: string;
  model9Notes: string;
  model9Status: string;

  // MODEL 10
  lifeChanges: string;
  healthConcerns: string;
  stressors: string;
  copingBehaviors: string;
  copingReferencePersons: string;
  model10Notes: string;
  model10Status: string;

  // MODEL 11
  lifeGoalsSatisfaction: string;
  religiousConflicts: string;
  religiousConflictsReason: string;
  religiousRestrictionsModel11: string;
  religiousRestrictionsDetails: string;
  religiousAssistance: string;
  religiousAssistanceDetails: string;
  model11Notes: string;
  model11Status: string;

  // Prescrizione farmacologica
  medications: Array<{
    drug: string;
    dosage: string;
    route: string;
    ora8: boolean;
    ora12: boolean;
    ora14: boolean;
    ora16: boolean;
    ora20: boolean;
    ora24: boolean;
    oraCustom: string;
    notes: string;
  }>;

  // Accertamento quotidiano (diario)
  dailyAssessments: Array<{
    date: string;
    notes: string;
    newProblems: string;
  }>;

  // Fine presa in carico
  dischargeUnresolvedProblems: string;
  dischargeObjectives: string;
  dischargePlannedActions: string;
  dischargeReason: string;
  dischargeDate: string;
  dischargeNotes: string;

  // Care Plan
  carePlans: Array<{ problem: string; objective: string; plannedInterventions: string; implementedInterventions: string; evaluation: string; status: string; priority: string }>;

  // Esami diagnostici
  diagnosticExams: Array<{
    date: string;
    time: string;
    examType: string;
    result: string;
    notes: string;
  }>;

  // Bilancio idrico giornaliero
  fluidBalanceDays: Array<{
    date: string;
    intakeInfusions: string;
    intakeOral: string;
    intakeOther: string;
    intakeOtherNote: string;
    outputUrine: string;
    outputFeces: string;
    outputVomit: string;
    outputPerspiratio: string;
    outputDrains: string;
    outputOther: string;
    outputOtherNote: string;
    notes: string;
  }>;

  // Gestione presidi
  devices: Array<{
    deviceType: string;
    present: boolean;
    placementDate: string;
    renewalDate: string;
    dressingType: string;
    notes: string;
  }>;

  // Lesioni cutanee / medicazioni
  woundCare: Array<{
    etiology: string;
    location: string;
    dimensions: string;
    tissueType: string[];
    exudatePresent: string;
    exudateQuantity: string;
    exudateQuality: string;
    margins: string;
    perilesionalSkin: string;
    dressingUsed: string;
    cleansing: string;
    products: string;
    fixation: string;
    executionDate: string;
    renewalDate: string;
    notes: string;
  }>;

  // Scale MUST
  mustEvaluations: Array<{
    date: string;
    step1Bmi: string;
    step2WeightLoss: string;
    step3AcuteDisease: string;
    notes: string;
  }>;

  // Scala dolore NRS
  painEvaluations: Array<{
    date: string;
    time: string;
    score: string;
    location: string;
    notes: string;
  }>;

  bristolEvaluations: Array<{
    date: string;
    time: string;
    type: string;
    notes: string;
  }>;

  // Monitoraggio parametri vitali
  vitalSigns: Array<{
    date: string;
    time: string;
    bloodPressure: string;
    heartRate: string;
    temperature: string;
    respiratoryRate: string;
    spo2: string;
    o2Therapy: string;
    pain: string;
    glycemia: string;
    notes: string;
  }>;

  // ── Procedure Speciali ──────────────────────

  endoscopia: {
    date: string;
    time: string;
    ward: string;
    procedureEGDS: boolean;
    procedureRSS: boolean;
    procedureColon: boolean;
    procedureBronco: boolean;
    procedureOther: string;
    // Pre
    preIdentification: string;
    preConsent: string;
    // Intra
    intraAntibiotic: string;
    intraFasting: string;
    intraFastingNotes: string;
    intraBowelPrep: string;
    intraMedSuspension: string;
    intraVascularAccess: string;
    intraVascularAccessDetails: string;
    intraStartTime: string;
    intraProcedureScheduled: string;
    intraProcedureOther: string;
    intraAnesthesiaLocal: boolean;
    intraAnesthesiaAnxiolysis: boolean;
    intraAnesthesiaSedation: boolean;
    intraAnesthesiaGeneral: boolean;
    intraDeviceSNG: boolean;
    intraDeviceSND: boolean;
    intraDeviceStent: boolean;
    intraDeviceIVAccess: boolean;
    intraDeviceOther: string;
    intraPositionSupine: boolean;
    intraPositionLateral: boolean;
    intraPositionProne: boolean;
    intraComplications: string;
    intraComplicationsDetails: string;
    intraMonitoring: Array<{ time: string; pa: string; fc: string; tc: string; fr: string; spo2: string; nrs: string }>;
    intraEndTime: string;
    // Post
    postReassessment: string;
    postSampleLabel: string;
    postNausea: boolean;
    postVomiting: boolean;
    postCough: boolean;
    postDyspnea: boolean;
    postOther: string;
    postFasting: string;
    postFastingDetails: string;
    postMonitoring: Array<{ time: string; pa: string; fc: string; tc: string; fr: string; spo2: string; nrs: string }>;
    signatureDateTime: string;
  };

  dialisi: {
    date: string;
    startTime: string;
    ward: string;
    initialWeight: string;
    lastWeight: string;
    deltaWeight: string;
    dryWeight: string;
    totalWeightLoss: string;
    typePeritoneal: boolean;
    typeExtracorporeal: boolean;
    accessFistula: boolean;
    accessCVC: boolean;
    sessionBicarbonate: boolean;
    sessionUltrafiltration: boolean;
    sessionHemofiltration: boolean;
    sessionHemodiafiltration: boolean;
    monitoring: Array<{ time: string; weight: string; pa: string; fc: string; fr: string; spo2: string; qb: string; qd: string; pArt: string; pVen: string; glycemia: string; heparin: string; therapy: string }>;
    finalWeight: string;
    endTime: string;
    notes: string;
    signatureDateTime: string;
  };

  bloccoOperatorio: {
    date: string;
    time: string;
    ward: string;
    surgery: string;
    // Pre
    preIdentification: string;
    preSurgeryConsent: string;
    preAnesthesiaConsent: string;
    preTransfusionConsent: string;
    preBloodAvailability: string;
    // Intra
    intraAntibiotic: string;
    intraAnesthesiaGeneral: boolean;
    intraAnesthesiaSedation: boolean;
    intraAnesthesiaLocoregional: boolean;
    intraAnesthesiaSpinal: boolean;
    intraAnesthesiaEpidural: boolean;
    intraAnesthesiaLocal: boolean;
    intraAirwayOTTarmato: boolean;
    intraAirwayOTT: boolean;
    intraAirwayNaso: boolean;
    intraAirwayCarlens: boolean;
    intraAirwayLMA: boolean;
    intraAirwayMask: boolean;
    intraSNG: string;
    intraUrinaryCatheter: string;
    intraCVP: string;
    intraArterialAccess: string;
    intraCVC: string;
    intraSwanGanz: string;
    intraPositionSupine: boolean;
    intraPositionLateralR: boolean;
    intraPositionLateralL: boolean;
    intraPositionSitting: boolean;
    intraPositionProne: boolean;
    intraPositionGyneco: boolean;
    intraPositionKneeChest: boolean;
    intraArmHyperextR: boolean;
    intraArmHyperextL: boolean;
    intraStartTime: string;
    intraIncision: string;
    intraBloodTransfusion: string;
    intraPlasmaTransfusion: string;
    intraBloodRecovery: string;
    intraHistoImmediate: string;
    intraHistoDefinitive: string;
    intraGauzeCount: string;
    intraGauzeMatch: string;
    intraInstrumentCount: string;
    intraInstrumentMatch: string;
    intraDressing: string;
    intraEndTime: string;
    // Post
    postReassessment: string;
    postDrainThoracic: boolean;
    postDrainAbdominal: boolean;
    postDrainBreast: boolean;
    postDrainCranio: boolean;
    postDrainSpine: boolean;
    postDrainOther: boolean;
    postDrainVentricularInt: boolean;
    postDrainVentricularExt: boolean;
    postDrainVentricularClosed: boolean;
    postDrainVentricularOpen: boolean;
    postEpicardialAtrialWires: boolean;
    postEpicardialVentricularWires: boolean;
    postSampleLabel: string;
    postOperativeReport: string;
    monitoring: Array<{ time: string; pa: string; fc: string; tc: string; pvc: string; fr: string; spo2: string; nrs: string; glycemia: string; input: string; urine: string; bloodLoss: string; balance: string }>;
    observations: string;
    signatureDateTime: string;
  };
}

export const defaultValues: NursingAssessment = {
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
  fallRiskScaleUsed: '',
  conleyEvaluations: [],
  
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
  bradenEvaluations: [],
  pressureUlcerRiskFactors: '',
  pressureUlcerRiskFactorsDetails: '',
  throatScaleScore: '',
  model2Notes: '',
  model2Status: '',

  urinationType: '',
  urinationFrequency: '',
  urinaryIncontinenceTypes: [],
  urinaryRetention: '',
  urinaryRetentionResidue: '',
  otherUrinaryAlterations: [],
  pollakiuriaFrequency: '',
  urineCharacteristics: '',
  urineAlterationsDescription: '',
  diuresis24h: '',
  diuresisAlteration: '',
  incontinenceAids: 'false',
  incontinenceAidsDetails: '',
  urinaryCatheter: 'No',
  urinaryCatheterDate: '',
  urinaryCatheterDetails: '',
  urinaryCatheterManagement: 'Si',
  urinaryCatheterManagedBy: '',
  urinaryStoma: 'false',
  urinaryStomaDetails: '',
  urinaryStomaManagement: 'Si',
  urinaryStomaManagedBy: '',
  
  bowelFrequency: '',
  lastBowelMovement: '',
  bowelAlterations: 'false',
  bowelAlterationsTypes: [],
  bowelIncontinenceType: '',
  bowelIncontinenceAids: 'false',
  bowelIncontinenceAidsDetails: '',
  laxatives: 'false',
  laxativesDetails: '',
  stoolCharacteristics: '',
  stoolAlterationsDetails: '',
  bristolScale: '',
  romaIIIScale: '',
  abdomenExam: '',
  peristalsis: '',
  peristalsisType: '',
  bowelStoma: 'false',
  bowelStomaDetails: '',
  bowelStomaManagement: 'Si',
  bowelStomaManagedBy: '',
  drains: 'false',
  drainsDetails: '',
  eliminationOtherObservations: '',
  model3Notes: '',
  model3Status: '',

  energyLevel: '',
  leisureActivities: '',
  exerciseRoutine: '',
  funcAlimentazione: '',
  funcCuraAspetto: '',
  funcBagno: '',
  funcMobilitaGen: '',
  funcGabinetto: '',
  funcCucinare: '',
  funcMobilitaLetto: '',
  funcCasa: '',
  funcVestirsi: '',
  funcSpesa: '',

  assumedPosition: '',
  decubitusType: '',
  muscleTone: '',
  muscleToneAlterations: '',
  muscleStrength: '',
  muscleStrengthAlterations: '',
  jointExcursion: '',
  jointExcursionAlterations: '',
  balance: '',
  walking: '',
  walkingAlterations: '',
  prosthesis: 'false',
  prosthesisDetails: '',
  barthelScore: '',
  generalAppearance: '',

  respiratoryFunction: '',
  respiratoryRate: '',
  spo2: '',
  breathingDepth: '',
  breathingQuality: '',
  dyspneaType: '',
  breathingAlterations: [],
  breathingPathological: '',
  breathingOtherAlterations: '',
  respiratoryNoises: '',
  respiratoryNoisesDetails: '',
  coughReflex: '',
  cough: '',
  coughDetails: '',
  sputum: '',
  sputumDetails: '',
  sputumAbility: '',
  respiratoryDevice: '',
  respiratorySupport: '',

  pulseRate: '',
  pulseLocation: '',
  pulseType: '',
  pulseRhythm: '',
  pulseAmplitude: '',
  bloodPressureValue: '',
  bloodPressureLocation: '',
  bloodPressurePosture: [],
  capillaryRefill: '',

  model4Notes: '',
  model4Status: '',

  sleepHours: '',
  sleepRested: '',
  sleepRestedNotes: '',
  sleepFallAsleepDiff: '',
  sleepFallAsleepDiffNotes: '',
  sleepMaintainDiff: '',
  sleepMaintainDiffNotes: '',
  sleepMeds: '',
  sleepMedsDetails: '',
  sleepObservation: '',
  model5Notes: '',
  model5Status: '',

  consciousness: '',
  avpuScore: '',
  gcsScore: '',
  otherNeurologicalEvaluations: [],
  rassScore: '',
  orientation: '',
  disorientationTypes: [],
  disorientationDuration: '',
  collaboration: '',
  collaborationDetails: '',
  collaborationFamilyDetails: '',
  collaborationPartialDetails: '',
  collaborationOtherDetails: '',
  spokenLanguage: '',
  speech: '',
  aphasiaType: '',
  comprehension: '',
  attitude: '',
  attitudeOther: '',
  memory: '',
  memoryAlterationDetails: '',
  concentration: '',
  concentrationAlterationDetails: '',
  vision: '',
  visionAlterationDetails: '',
  hearing: '',
  hearingAlterationDetails: '',
  pain: 'false',
  painLocation: '',
  painTime: '',
  painQuality: '',
  painFactors: '',
  painNrs: '',
  painTreatment: '',
  model6Notes: '',
  model6Status: '',

  selfDescription: '',
  eyeContact: '',
  voicePatterns: '',
  interviewAttitude: '',
  interviewAttitudeOther: '',
  model7Notes: '',
  model7Status: '',

  maritalStatusRoles: '',
  educationLevel: '',
  occupationalRole: '',
  occupationalActivityType: '',
  occupationalPrevious: '',
  occupationalDesired: '',
  occupationalEnrolled: '',
  livingSituation: '',
  livingSituationOther: '',
  familyStructure: '',
  significantRelationships: '',
  supportSystem: [],
  supportSystemOther: '',
  model8Notes: '',
  model8Status: '',

  lastMenstruation: '',
  menarche: '',
  menstrualProblems: '',
  menopause: 'false',
  menopauseProblems: '',
  pregnancies: '',
  contraceptives: 'false',
  contraceptivesProblems: '',
  breastExam: 'true',
  breastExamReason: '',
  screeningTests: 'true',
  screeningTestsReason: '',
  numberOfChildren: '',
  testiclesExam: 'true',
  testiclesExamReason: '',
  model9Notes: '',
  model9Status: '',

  lifeChanges: '',
  healthConcerns: '',
  stressors: '',
  copingBehaviors: '',
  copingReferencePersons: '',
  model10Notes: '',
  model10Status: '',

  lifeGoalsSatisfaction: '',
  religiousConflicts: 'false',
  religiousConflictsReason: '',
  religiousRestrictionsModel11: 'false',
  religiousRestrictionsDetails: '',
  religiousAssistance: 'false',
  religiousAssistanceDetails: '',
  model11Notes: '',
  model11Status: '',

  painEvaluations: [],
  bristolEvaluations: [],
  mustEvaluations: [],
  gcsEvaluations: [],
  avpuEvaluations: [],
  borgEvaluations: [],
  barthelEvaluations: [],
  throatEvaluations: [],
  medications: [],
  dailyAssessments: [],
  devices: [],
  woundCare: [],
  dischargeUnresolvedProblems: '',
  dischargeObjectives: '',
  dischargePlannedActions: '',
  dischargeReason: '',
  dischargeDate: '',
  dischargeNotes: '',
  carePlans: [],
  diagnosticExams: [],
  fluidBalanceDays: [],
  vitalSigns: [],

  endoscopia: {
    date: '', time: '', ward: '',
    procedureEGDS: false, procedureRSS: false, procedureColon: false, procedureBronco: false, procedureOther: '',
    preIdentification: '', preConsent: '',
    intraAntibiotic: '', intraFasting: '', intraFastingNotes: '', intraBowelPrep: '', intraMedSuspension: '',
    intraVascularAccess: '', intraVascularAccessDetails: '', intraStartTime: '',
    intraProcedureScheduled: '', intraProcedureOther: '',
    intraAnesthesiaLocal: false, intraAnesthesiaAnxiolysis: false, intraAnesthesiaSedation: false, intraAnesthesiaGeneral: false,
    intraDeviceSNG: false, intraDeviceSND: false, intraDeviceStent: false, intraDeviceIVAccess: false, intraDeviceOther: '',
    intraPositionSupine: false, intraPositionLateral: false, intraPositionProne: false,
    intraComplications: '', intraComplicationsDetails: '',
    intraMonitoring: [], intraEndTime: '',
    postReassessment: '', postSampleLabel: '',
    postNausea: false, postVomiting: false, postCough: false, postDyspnea: false, postOther: '',
    postFasting: '', postFastingDetails: '',
    postMonitoring: [], signatureDateTime: '',
  },

  dialisi: {
    date: '', startTime: '', ward: '',
    initialWeight: '', lastWeight: '', deltaWeight: '', dryWeight: '', totalWeightLoss: '',
    typePeritoneal: false, typeExtracorporeal: false,
    accessFistula: false, accessCVC: false,
    sessionBicarbonate: false, sessionUltrafiltration: false, sessionHemofiltration: false, sessionHemodiafiltration: false,
    monitoring: [],
    finalWeight: '', endTime: '', notes: '', signatureDateTime: '',
  },

  bloccoOperatorio: {
    date: '', time: '', ward: '', surgery: '',
    preIdentification: '', preSurgeryConsent: '', preAnesthesiaConsent: '', preTransfusionConsent: '', preBloodAvailability: '',
    intraAntibiotic: '',
    intraAnesthesiaGeneral: false, intraAnesthesiaSedation: false, intraAnesthesiaLocoregional: false,
    intraAnesthesiaSpinal: false, intraAnesthesiaEpidural: false, intraAnesthesiaLocal: false,
    intraAirwayOTTarmato: false, intraAirwayOTT: false, intraAirwayNaso: false,
    intraAirwayCarlens: false, intraAirwayLMA: false, intraAirwayMask: false,
    intraSNG: '', intraUrinaryCatheter: '', intraCVP: '', intraArterialAccess: '', intraCVC: '', intraSwanGanz: '',
    intraPositionSupine: false, intraPositionLateralR: false, intraPositionLateralL: false,
    intraPositionSitting: false, intraPositionProne: false, intraPositionGyneco: false, intraPositionKneeChest: false,
    intraArmHyperextR: false, intraArmHyperextL: false,
    intraStartTime: '', intraIncision: '', intraBloodTransfusion: '', intraPlasmaTransfusion: '', intraBloodRecovery: '',
    intraHistoImmediate: '', intraHistoDefinitive: '',
    intraGauzeCount: '', intraGauzeMatch: '', intraInstrumentCount: '', intraInstrumentMatch: '',
    intraDressing: '', intraEndTime: '',
    postReassessment: '',
    postDrainThoracic: false, postDrainAbdominal: false, postDrainBreast: false, postDrainCranio: false,
    postDrainSpine: false, postDrainOther: false,
    postDrainVentricularInt: false, postDrainVentricularExt: false,
    postDrainVentricularClosed: false, postDrainVentricularOpen: false,
    postEpicardialAtrialWires: false, postEpicardialVentricularWires: false,
    postSampleLabel: '', postOperativeReport: '',
    monitoring: [], observations: '', signatureDateTime: '',
  },
};
