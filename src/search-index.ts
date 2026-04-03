export type TabId = 'general' | 'assessment' | 'scales' | 'monitoring' | 'diary' | 'medications' | 'devices' | 'careplan' | 'procedures';
export type AssessmentSubTab = 'initial' | 'model1' | 'model2' | 'model3' | 'model4' | 'model5' | 'model6' | 'model7' | 'model8' | 'model9' | 'model10' | 'model11';

export interface SearchEntry {
  id: string;
  label: string;
  breadcrumb: string;
  tab: TabId;
  assessmentSubTab?: AssessmentSubTab;
  elementId?: string;
  keywords: string[];
}

export const SEARCH_INDEX: SearchEntry[] = [
  // ── Tab generali ────────────────────────────────────────────────────────
  {
    id: 'tab-general',
    label: 'Dati Tirocinio e Studente',
    breadcrumb: 'Dati Tirocinio e Studente',
    tab: 'general',
    keywords: ['tirocinio', 'studente', 'studente', 'paziente', 'sede', 'tutor', 'coordinatore', 'anno accademico', 'corso', 'matricola', 'reparto', 'presa in carico', 'nazionalità', 'lingua', 'stato civile', 'diagnosi', 'ricovero'],
  },

  // ── Accertamento — Dati Iniziali ────────────────────────────────────────
  {
    id: 'assessment-initial',
    label: 'Dati Iniziali Paziente',
    breadcrumb: 'Accertamento',
    tab: 'assessment',
    assessmentSubTab: 'initial',
    keywords: ['dati anagrafici', 'ammissione', 'anamnesi', 'provenienza', 'modalità arrivo', 'diagnosi medica', 'motivo ricovero', 'fonte dati', 'storia clinica'],
  },

  // ── Accertamento — Modelli di Gordon ────────────────────────────────────
  {
    id: 'assessment-model1',
    label: 'Modello 1 — Percezione e Gestione della Salute',
    breadcrumb: 'Accertamento',
    tab: 'assessment',
    assessmentSubTab: 'model1',
    keywords: ['salute generale', 'fumo', 'fumo di sigaretta', 'alcol', 'allergie', 'terapia domiciliare', 'farmaci domicilio', 'aspetto fisico', 'prevenzione', 'conley', 'cadute', 'rischio caduta'],
  },
  {
    id: 'assessment-model2',
    label: 'Modello 2 — Nutrizione e Metabolismo',
    breadcrumb: 'Accertamento',
    tab: 'assessment',
    assessmentSubTab: 'model2',
    keywords: ['nutrizione', 'alimentazione', 'peso', 'altezza', 'bmi', 'indice di massa corporea', 'cute', 'pelle', 'edema', 'braden', 'decubito', 'accesso venoso', 'catetere venoso', 'nutrizione enterale', 'sng', 'nutrizione parenterale', 'deglutizione', 'dentizione', 'protesi dentaria', 'THROAT', 'cavo orale', 'glicemia', 'temperatura', 'cicatrici', 'lesioni cutanee', 'appetito', 'dieta', 'malnutrizione', 'must'],
  },
  {
    id: 'assessment-model3',
    label: 'Modello 3 — Eliminazione',
    breadcrumb: 'Accertamento',
    tab: 'assessment',
    assessmentSubTab: 'model3',
    keywords: ['urine', 'diuresi', 'minzione', 'feci', 'alvo', 'catetere', 'catetere vescicale', 'stomia', 'incontinenza urinaria', 'incontinenza fecale', 'stitichezza', 'diarrea', 'bristol', 'roma III', 'drenaggi', 'lassativi', 'addome', 'peristalsi'],
  },
  {
    id: 'assessment-model4',
    label: 'Modello 4 — Attività ed Esercizio Fisico',
    breadcrumb: 'Accertamento',
    tab: 'assessment',
    assessmentSubTab: 'model4',
    keywords: ['mobilità', 'attività fisica', 'esercizio', 'respirazione', 'respiro', 'frequenza respiratoria', 'polso', 'pressione arteriosa', 'barthel', 'deambulazione', 'forza muscolare', 'tono muscolare', 'escursione articolare', 'equilibrio', 'protesi', 'saturazione', 'spo2', 'dispnea', 'tosse', 'espettorato', 'dispositivi respiratori'],
  },
  {
    id: 'assessment-model5',
    label: 'Modello 5 — Riposo e Sonno',
    breadcrumb: 'Accertamento',
    tab: 'assessment',
    assessmentSubTab: 'model5',
    keywords: ['sonno', 'riposo', 'insonnia', 'ore di sonno', 'disturbi del sonno', 'farmaci per dormire', 'difficoltà addormentamento'],
  },
  {
    id: 'assessment-model6',
    label: 'Modello 6 — Cognitivo e Percettivo',
    breadcrumb: 'Accertamento',
    tab: 'assessment',
    assessmentSubTab: 'model6',
    keywords: ['coscienza', 'orientamento', 'dolore', 'nrs', 'scala dolore', 'vista', 'udito', 'linguaggio', 'afasia', 'memoria', 'concentrazione', 'gcs', 'glasgow coma scale', 'avpu', 'rassScore', 'collaborazione', 'comprensione', 'atteggiamento'],
  },
  {
    id: 'assessment-model7',
    label: 'Modello 7 — Percezione e Concetto di Sé',
    breadcrumb: 'Accertamento',
    tab: 'assessment',
    assessmentSubTab: 'model7',
    keywords: ['autopercezione', 'contatto oculare', 'voce', 'atteggiamento colloquio', 'concetto di sé', 'descrizione di sé'],
  },
  {
    id: 'assessment-model8',
    label: 'Modello 8 — Ruoli e Relazioni',
    breadcrumb: 'Accertamento',
    tab: 'assessment',
    assessmentSubTab: 'model8',
    keywords: ['famiglia', 'relazioni', 'ruoli', 'lavoro', 'occupazione', 'supporto sociale', 'convivenza', 'struttura familiare', 'stato civile', 'istruzione'],
  },
  {
    id: 'assessment-model9',
    label: 'Modello 9 — Sessualità e Riproduzione',
    breadcrumb: 'Accertamento',
    tab: 'assessment',
    assessmentSubTab: 'model9',
    keywords: ['sessualità', 'riproduzione', 'mestruazioni', 'menopausa', 'gravidanza', 'figli', 'contraccettivi', 'screening', 'mammografia', 'pap test', 'testicoli'],
  },
  {
    id: 'assessment-model10',
    label: 'Modello 10 — Coping e Tolleranza allo Stress',
    breadcrumb: 'Accertamento',
    tab: 'assessment',
    assessmentSubTab: 'model10',
    keywords: ['stress', 'coping', 'ansia', 'cambiamenti di vita', 'preoccupazioni', 'strategie di coping', 'preoccupazione', 'salute psicologica'],
  },
  {
    id: 'assessment-model11',
    label: 'Modello 11 — Valori e Convinzioni',
    breadcrumb: 'Accertamento',
    tab: 'assessment',
    assessmentSubTab: 'model11',
    keywords: ['valori', 'religione', 'spiritualità', 'convinzioni', 'credenze', 'restrizioni religiose', 'assistenza spirituale', 'soddisfazione'],
  },

  // ── Scale di Valutazione ────────────────────────────────────────────────
  {
    id: 'scales-braden',
    label: 'Scala Braden — Rischio Lesioni da Pressione',
    breadcrumb: 'Scale Valutazione',
    tab: 'scales',
    keywords: ['braden', 'lesioni da pressione', 'ulcere da decubito', 'piaghe', 'mobilità', 'umidità', 'attività', 'nutrizione', 'frizione', 'scivolamento', 'sensory'],
  },
  {
    id: 'scales-conley',
    label: 'Scala Conley — Rischio Cadute',
    breadcrumb: 'Scale Valutazione',
    tab: 'scales',
    keywords: ['conley', 'cadute', 'rischio caduta', 'fall risk', 'prevenzione cadute'],
  },
  {
    id: 'scales-must',
    label: 'Scala MUST — Rischio Malnutrizione',
    breadcrumb: 'Scale Valutazione',
    tab: 'scales',
    keywords: ['must', 'malnutrizione', 'stato nutrizionale', 'bmi', 'perdita di peso', 'malattia acuta', 'nutritional screening'],
  },
  {
    id: 'scales-gcs',
    label: 'Glasgow Coma Scale (GCS)',
    breadcrumb: 'Scale Valutazione',
    tab: 'scales',
    keywords: ['glasgow', 'gcs', 'coma', 'coscienza', 'occhi', 'verbale', 'motore', 'tbi', 'trauma cranico'],
  },
  {
    id: 'scales-avpu',
    label: 'Scala AVPU — Livello di Coscienza',
    breadcrumb: 'Scale Valutazione',
    tab: 'scales',
    keywords: ['avpu', 'alert', 'voice', 'pain', 'unresponsive', 'coscienza', 'stato di coscienza'],
  },
  {
    id: 'scales-borg',
    label: 'Scala di Borg — Dispnea / Sforzo percepito',
    breadcrumb: 'Scale Valutazione',
    tab: 'scales',
    keywords: ['borg', 'dispnea', 'affanno', 'sforzo percepito', 'fatica', 'fiato', 'breathlessness'],
  },
  {
    id: 'scales-barthel',
    label: 'Indice di Barthel — Autonomia nelle ADL',
    breadcrumb: 'Scale Valutazione',
    tab: 'scales',
    keywords: ['barthel', 'adl', 'autonomia', 'dipendenza', 'igiene', 'alimentazione', 'vestirsi', 'mobilità', 'bagno', 'scala', 'trasferimento', 'continenza'],
  },
  {
    id: 'scales-throat',
    label: 'Scala THROAT — Salute del Cavo Orale',
    breadcrumb: 'Scale Valutazione',
    tab: 'scales',
    keywords: ['throat', 'cavo orale', 'labbra', 'denti', 'lingua', 'mucosa', 'saliva', 'deglutizione', 'faringe', 'voce', 'igiene orale'],
  },
  {
    id: 'scales-nrs',
    label: 'Scala NRS — Valutazione del Dolore',
    breadcrumb: 'Scale Valutazione',
    tab: 'scales',
    keywords: ['nrs', 'dolore', 'intensità dolore', 'numeric rating scale', 'vas', 'scala analogica', 'dolore acuto', 'dolore cronico'],
  },
  {
    id: 'scales-bristol',
    label: 'Scala di Bristol — Caratteristiche delle Feci',
    breadcrumb: 'Scale Valutazione',
    tab: 'scales',
    keywords: ['bristol', 'feci', 'defecazione', 'stitichezza', 'diarrea', 'stipsi', 'alvo', 'evacuazione', 'bristol stool scale', 'consistenza feci'],
  },

  // ── Monitoraggio ────────────────────────────────────────────────────────
  {
    id: 'monitoring-vitals',
    label: 'Parametri Vitali',
    breadcrumb: 'Monitoraggio',
    tab: 'monitoring',
    keywords: ['parametri vitali', 'pressione arteriosa', 'pa', 'frequenza cardiaca', 'fc', 'temperatura corporea', 'tc', 'frequenza respiratoria', 'fr', 'saturazione', 'spo2', 'ossigeno', 'o2', 'glicemia', 'dolore', 'monitoraggio'],
  },
  {
    id: 'monitoring-fluid',
    label: 'Bilancio Idrico',
    breadcrumb: 'Monitoraggio',
    tab: 'monitoring',
    keywords: ['bilancio idrico', 'bilancio idroelettrolitico', 'entrate', 'uscite', 'diuresi', 'infusioni', 'fluidi orali', 'vomito', 'drenaggi', 'perspiratio', 'feci', 'balance idrico'],
  },
  {
    id: 'monitoring-exams',
    label: 'Esami Diagnostici',
    breadcrumb: 'Monitoraggio',
    tab: 'monitoring',
    keywords: ['esami', 'esami del sangue', 'laboratorio', 'radiologia', 'diagnostica', 'ecografia', 'tac', 'rx', 'esami strumentali', 'risultati esami'],
  },

  // ── Diario ──────────────────────────────────────────────────────────────
  {
    id: 'tab-diary',
    label: 'Diario — Note Giornaliere',
    breadcrumb: 'Diario',
    tab: 'diary',
    keywords: ['diario', 'note giornaliere', 'accertamento quotidiano', 'annotazioni', 'evoluzione clinica', 'andamento', 'nuovi problemi'],
  },

  // ── Farmaci ─────────────────────────────────────────────────────────────
  {
    id: 'tab-medications',
    label: 'Prescrizione Farmacologica',
    breadcrumb: 'Farmaci',
    tab: 'medications',
    keywords: ['farmaci', 'terapia farmacologica', 'prescrizione', 'medicinali', 'somministrazione', 'orari', 'dosaggio', 'via di somministrazione', 'ev', 'os', 'im', 'sc'],
  },

  // ── Presidi ─────────────────────────────────────────────────────────────
  {
    id: 'tab-devices',
    label: 'Presidi e Dispositivi',
    breadcrumb: 'Presidi e Medicazioni',
    tab: 'devices',
    keywords: ['presidi', 'dispositivi', 'catetere', 'sonda', 'drenaggio', 'cvc', 'picc', 'naso gastrica', 'tracheostomia', 'medicazione', 'data posizionamento', 'rinnovo'],
  },
  {
    id: 'tab-wounds',
    label: 'Lesioni Cutanee e Medicazioni',
    breadcrumb: 'Presidi e Medicazioni',
    tab: 'devices',
    keywords: ['lesioni', 'lesione cutanea', 'ferita', 'medicazione', 'detersione', 'cicatrizzazione', 'granulazione', 'fibrina', 'necrotico', 'essudato', 'margini', 'cute perilesionale', 'fissaggio', 'chirurgica', 'traumatica'],
  },

  // ── Piano Assistenza ────────────────────────────────────────────────────
  {
    id: 'tab-careplan',
    label: 'Piano Assistenza (PES)',
    breadcrumb: 'Piano Assistenza',
    tab: 'careplan',
    keywords: ['piano assistenza', 'pes', 'diagnosi infermieristica', 'obiettivi', 'interventi', 'valutazione', 'problema', 'eziologia', 'segni e sintomi', 'priorità', 'dimissione', 'fine presa in carico'],
  },

  // ── Procedure Speciali ───────────────────────────────────────────────────
  {
    id: 'procedures-endoscopia',
    label: 'Scheda Endoscopia',
    breadcrumb: 'Procedure Speciali',
    tab: 'procedures',
    keywords: ['endoscopia', 'egds', 'gastroscopia', 'colonscopia', 'broncoscopia', 'rss', 'endoscopio', 'sedazione', 'preparazione intestinale', 'consenso', 'digiuno', 'profilassi antibiotica'],
  },
  {
    id: 'procedures-dialisi',
    label: 'Scheda Dialisi',
    breadcrumb: 'Procedure Speciali',
    tab: 'procedures',
    keywords: ['dialisi', 'emodialisi', 'dialisi peritoneale', 'fistola', 'cvc', 'ultrafiltrazione', 'emofiltrazione', 'emodiafiltrazione', 'bicarbonato', 'peso secco', 'accesso vascolare', 'seduta dialitica', 'qb', 'qd'],
  },
  {
    id: 'procedures-blocco',
    label: 'Scheda Blocco Operatorio',
    breadcrumb: 'Procedure Speciali',
    tab: 'procedures',
    keywords: ['blocco operatorio', 'sala operatoria', 'intervento chirurgico', 'anestesia', 'spinale', 'peridurale', 'intubazione', 'tubo orotracheale', 'maschera laringea', 'decubito', 'emotrasfusione', 'garze', 'drenaggi', 'fili epicardici', 'referto operatorio'],
  },
];

export function searchEntries(query: string): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return SEARCH_INDEX;
  const words = q.split(/\s+/);
  return SEARCH_INDEX.filter(entry => {
    const haystack = [entry.label, entry.breadcrumb, ...entry.keywords].join(' ').toLowerCase();
    return words.every(w => haystack.includes(w));
  });
}
