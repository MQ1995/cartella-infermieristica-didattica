export interface ProceduresFields {
  // Procedura endoscopica
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

  // Dialisi
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

  // Blocco operatorio
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

export const defaultProceduresValues: ProceduresFields = {
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
