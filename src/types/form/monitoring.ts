export interface MonitoringFields {
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

  // Piano assistenziale
  carePlans: Array<{
    problem: string;
    objective: string;
    plannedInterventions: string;
    implementedInterventions: string;
    evaluation: string;
    status: string;
    priority: string;
  }>;

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

  // Scale libere (non legate a un modello specifico)
  mustEvaluations: Array<{
    date: string;
    step1Bmi: string;
    step2WeightLoss: string;
    step3AcuteDisease: string;
    notes: string;
  }>;

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
}

export const defaultMonitoringValues: MonitoringFields = {
  medications: [],
  dailyAssessments: [],
  dischargeUnresolvedProblems: '',
  dischargeObjectives: '',
  dischargePlannedActions: '',
  dischargeReason: '',
  dischargeDate: '',
  dischargeNotes: '',
  carePlans: [],
  diagnosticExams: [],
  fluidBalanceDays: [],
  devices: [],
  woundCare: [],
  mustEvaluations: [],
  painEvaluations: [],
  bristolEvaluations: [],
  vitalSigns: [],
};
