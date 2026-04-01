import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { NursingAssessment } from '../types/form';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#1e293b',
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 20,
    borderBottom: '2px solid #166A3D',
    paddingBottom: 10,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: '#166A3D',
  },
  subtitle: {
    fontSize: 12,
    color: '#64748b',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#166A3D',
    backgroundColor: '#ecfdf5',
    padding: '4 8',
    marginBottom: 8,
    borderRadius: 3,
  },
  subSectionTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    marginTop: 8,
    marginBottom: 4,
    color: '#334155',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  col: {
    flex: 1,
    paddingRight: 10,
  },
  col2: {
    flex: 2,
    paddingRight: 10,
  },
  label: {
    fontFamily: 'Helvetica-Bold',
    color: '#475569',
    marginRight: 4,
  },
  value: {
    color: '#0f172a',
  },
  textBlock: {
    marginBottom: 6,
  },
  table: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 5,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '20%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#f8fafc',
    padding: 4,
  },
  tableCol: {
    width: '20%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 4,
  },
  tableCellHeader: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 9,
  },
  tableCell: {
    fontSize: 9,
  },
  emptyNotice: {
    fontFamily: 'Helvetica-Oblique',
    color: '#94a3b8',
  },
  modelEval: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 5,
    paddingTop: 5,
    borderTop: '1px solid #e2e8f0',
  }
});

// Safe text wrapper to prevent crashes with undefined/null
const SafeText = ({ children, style }: { children: any, style?: any }) => {
  if (children === null || children === undefined) return <Text style={style}>{''}</Text>;
  return <Text style={style}>{String(children)}</Text>;
};

// Helper component for Label: Value
const Field = ({ label, value }: { label: string, value: any }) => {
  if (value === null || value === undefined || value === '' || value === 'false' || (Array.isArray(value) && value.length === 0)) {
    return null;
  }
  
  const displayValue = typeof value === 'boolean' || value === 'true' 
    ? 'Sì' 
    : Array.isArray(value) 
      ? value.join(', ') 
      : String(value);

  return (
    <View style={styles.row}>
      <SafeText style={styles.label}>{label}:</SafeText>
      <SafeText style={styles.value}>{displayValue}</SafeText>
    </View>
  );
};

// Main Document Component
export const AssessmentPDF = ({ data }: { data: NursingAssessment }) => {
  
  const formatDate = (dateStr: string | undefined) => {
    if (!dateStr) return '';
    try {
      return format(new Date(dateStr), 'dd/MM/yyyy', { locale: it });
    } catch {
      return dateStr;
    }
  };

  const formatDateTime = (dateStr: string | undefined) => {
    if (!dateStr) return '';
    try {
      return format(new Date(dateStr), 'dd/MM/yyyy HH:mm', { locale: it });
    } catch {
      return dateStr;
    }
  };

  // Safe checks for arrays
  const pastMedicalHistory = Array.isArray(data.pastMedicalHistory) ? data.pastMedicalHistory : [];
  const homeTherapy = Array.isArray(data.homeTherapy) ? data.homeTherapy : [];
  const carePlans = Array.isArray(data.carePlans) ? data.carePlans : [];

  return (
    <Document>
      {/* PAGE 1: Dati Generali */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <SafeText style={styles.title}>Cartella Infermieristica Didattica</SafeText>
            <SafeText style={styles.subtitle}>A.A. {data.academicYear || ''}</SafeText>
          </View>
        </View>

        <View style={styles.section}>
          <SafeText style={styles.sectionTitle}>1. Dati Studente e Tirocinio</SafeText>
          <View style={styles.row}>
            <View style={styles.col}><Field label="Studente" value={data.studentName} /></View>
            <View style={styles.col}><Field label="Matricola" value={data.studentId} /></View>
            <View style={styles.col}><Field label="Anno" value={data.courseYear} /></View>
          </View>
          <View style={styles.row}>
            <View style={styles.col}><Field label="Sede" value={data.internshipLocation} /></View>
            <View style={styles.col}><Field label="U.O." value={data.ward} /></View>
            <View style={styles.col}><Field label="Periodo" value={data.internshipPeriod} /></View>
          </View>
          <View style={styles.row}>
            <View style={styles.col}><Field label="Guida di Tirocinio" value={data.clinicalGuide} /></View>
            <View style={styles.col}><Field label="Tutor" value={data.tutor} /></View>
          </View>
        </View>

        <View style={styles.section}>
          <SafeText style={styles.sectionTitle}>2. Dati Persona Assistita e Ricovero</SafeText>
          <View style={styles.row}>
            <View style={styles.col}><Field label="Sesso" value={data.patientGender} /></View>
            <View style={styles.col}><Field label="Età" value={data.patientAge} /></View>
            <View style={styles.col}><Field label="Nazionalità" value={data.nationality} /></View>
            <View style={styles.col}><Field label="Lingua" value={data.patientLanguage} /></View>
          </View>
          <View style={styles.row}>
            <View style={styles.col}><Field label="Stato Civile" value={data.maritalStatus} /></View>
            <View style={styles.col2}><Field label="Persona Riferimento" value={data.referencePerson} /></View>
          </View>
          <View style={styles.row}>
            <View style={styles.col2}><Field label="Data Ricovero" value={formatDateTime(data.admissionDate)} /></View>
            <View style={styles.col}><Field label="Provenienza" value={data.origin} /></View>
            <View style={styles.col}><Field label="Modalità Arrivo" value={data.arrivalMode} /></View>
          </View>
          <View style={styles.row}>
            <View style={styles.col}>
              <Field 
                label="Tipo Ricovero" 
                value={`${data.admissionType || ''}${data.admissionType === 'Trasferimento interno' && data.admissionTransferFrom ? ` da ${data.admissionTransferFrom}` : ''}`} 
              />
            </View>
          </View>
          
          <View style={[styles.textBlock, { marginTop: 10 }]}>
            <SafeText style={styles.label}>Diagnosi Medica di Ingresso:</SafeText>
            <SafeText style={styles.value}>{data.medicalDiagnosis || '-'}</SafeText>
          </View>
          
          <View style={styles.textBlock}>
            <SafeText style={styles.label}>Motivo del ricovero:</SafeText>
            <SafeText style={styles.value}>{data.admissionReason || '-'}</SafeText>
          </View>
        </View>

        <View style={styles.section}>
          <SafeText style={styles.sectionTitle}>3. Anamnesi Patologica Remota</SafeText>
          {pastMedicalHistory.length > 0 ? (
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={[styles.tableColHeader, { width: '30%' }]}><SafeText style={styles.tableCellHeader}>Data / Anno</SafeText></View>
                <View style={[styles.tableColHeader, { width: '70%' }]}><SafeText style={styles.tableCellHeader}>Patologia / Ricoveri Pregressi</SafeText></View>
              </View>
              {pastMedicalHistory.map((item, i) => (
                <View style={styles.tableRow} key={i}>
                  <View style={[styles.tableCol, { width: '30%' }]}><SafeText style={styles.tableCell}>{item.date || ''}</SafeText></View>
                  <View style={[styles.tableCol, { width: '70%' }]}><SafeText style={styles.tableCell}>{item.pathology || ''}</SafeText></View>
                </View>
              ))}
            </View>
          ) : (
            <SafeText style={styles.emptyNotice}>Nessuna anamnesi pregressa segnalata.</SafeText>
          )}

          <View style={{ marginTop: 10 }}>
             <Field 
                label="Dati forniti da" 
                value={`${data.dataSource || ''}${data.dataSource === 'Altro' && data.dataSourceOther ? ` (${data.dataSourceOther})` : ''}`} 
              />
          </View>
        </View>
      </Page>

      {/* PAGE 2: Accertamento (Modelli di Gordon) */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <SafeText style={styles.title}>Accertamento Infermieristico (Modelli di Gordon)</SafeText>
        </View>

        {/* MODELLO 1 */}
        <View style={styles.section}>
          <SafeText style={styles.sectionTitle}>1. Modello di Percezione e Gestione della Salute</SafeText>
          
          {data.generalHealth && (
            <View style={styles.textBlock}>
              <SafeText style={styles.label}>Stato di salute generale:</SafeText>
              <SafeText style={styles.value}>{data.generalHealth}</SafeText>
            </View>
          )}
          
          {(data.alcoholConsumption || data.smoking || data.allergies) && (
            <View style={{ marginTop: 5 }}>
              <SafeText style={styles.subSectionTitle}>Fattori di rischio:</SafeText>
              {data.alcoholConsumption && <Field label="Alcool" value={data.alcoholDetails || 'Sì'} />}
              {data.smoking && <Field label="Fumo" value={data.smokingDetails || 'Sì'} />}
              {data.allergies && <Field label="Allergie" value={data.allergyDetails || 'Sì'} />}
            </View>
          )}

          {homeTherapy.length > 0 && (
            <View style={{ marginTop: 10 }}>
              <SafeText style={styles.subSectionTitle}>Terapia Domiciliare:</SafeText>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View style={styles.tableColHeader}><SafeText style={styles.tableCellHeader}>Farmaco</SafeText></View>
                  <View style={styles.tableColHeader}><SafeText style={styles.tableCellHeader}>Motivo</SafeText></View>
                  <View style={styles.tableColHeader}><SafeText style={styles.tableCellHeader}>Dose</SafeText></View>
                  <View style={styles.tableColHeader}><SafeText style={styles.tableCellHeader}>Orari</SafeText></View>
                  <View style={styles.tableColHeader}><SafeText style={styles.tableCellHeader}>Via</SafeText></View>
                </View>
                {homeTherapy.map((item, i) => (
                  <View style={styles.tableRow} key={i}>
                    <View style={styles.tableCol}><SafeText style={styles.tableCell}>{item.drug || ''}</SafeText></View>
                    <View style={styles.tableCol}><SafeText style={styles.tableCell}>{item.reason || ''}</SafeText></View>
                    <View style={styles.tableCol}><SafeText style={styles.tableCell}>{item.dose || ''}</SafeText></View>
                    <View style={styles.tableCol}><SafeText style={styles.tableCell}>{item.schedule || ''}</SafeText></View>
                    <View style={styles.tableCol}><SafeText style={styles.tableCell}>{item.route || ''}</SafeText></View>
                  </View>
                ))}
              </View>
            </View>
          )}
          
          <View style={styles.modelEval}>
             <SafeText style={[styles.label, { fontSize: 9 }]}>Valutazione Modello:</SafeText>
             <SafeText style={[styles.value, { fontSize: 9, fontFamily: 'Helvetica-Bold' }]}>{data.model1Status || 'Non valutato'}</SafeText>
          </View>
        </View>

        {/* MODELLO 2 */}
        <View style={styles.section}>
          <SafeText style={styles.sectionTitle}>2. Modello di Nutrizione e Metabolismo</SafeText>
          
          <View style={styles.row}>
            <View style={styles.col}><Field label="Peso" value={data.currentWeight ? `${data.currentWeight} kg` : ''} /></View>
            <View style={styles.col}><Field label="Altezza" value={data.height ? `${data.height} cm` : ''} /></View>
            <View style={styles.col}><Field label="BMI" value={data.bmi} /></View>
            <View style={styles.col}><Field label="Classe" value={data.weightClass} /></View>
          </View>
          <View style={styles.row}>
            <View style={styles.col}><Field label="Temp." value={data.temperature ? `${data.temperature} °C ${data.temperatureLocation ? `(${data.temperatureLocation})` : ''}` : ''} /></View>
            <View style={styles.col}><Field label="Glicemia" value={data.capillaryGlycemia ? `${data.capillaryGlycemia} mg/dl` : ''} /></View>
          </View>

          <View style={styles.row}>
            <View style={styles.col2}><Field label="Abitudini Alimentari" value={data.eatingHabits} /></View>
          </View>
          <View style={styles.row}>
             <View style={styles.col}><Field label="Appetito" value={data.appetite} /></View>
             <View style={styles.col2}><Field label="Alterazioni" value={data.appetiteAlterations} /></View>
          </View>
          <View style={styles.row}>
             <View style={styles.col}><Field label="Dentatura" value={`${data.dentition || ''} ${data.dentitionProsthesisType || ''}`} /></View>
             <View style={styles.col}><Field label="Deglutizione" value={`${data.swallowing || ''} ${data.swallowingAlteration || ''}`} /></View>
          </View>

          <SafeText style={styles.subSectionTitle}>Stato dei Tessuti</SafeText>
          <View style={styles.row}>
            <View style={styles.col}><Field label="Colore" value={`${data.skinColor || ''} ${data.skinColorOther || ''}`} /></View>
            <View style={styles.col}><Field label="Turgore" value={data.skinTurgor} /></View>
            <View style={styles.col}><Field label="Umidità" value={data.skinMoisture} /></View>
          </View>
          
          {(data.edema || data.erythema || data.itching) && (
            <View style={styles.row}>
              {data.edema && <View style={styles.col}><Field label="Edema" value={`${data.edemaLocation || ''} (Grado: ${data.edemaGrade || ''})`} /></View>}
              {data.erythema && <View style={styles.col}><Field label="Eritema" value={data.erythemaLocation} /></View>}
              {data.itching && <View style={styles.col}><Field label="Prurito" value={data.itchingLocation} /></View>}
            </View>
          )}

          {data.skinIntegrity === false && (
            <View style={{ marginTop: 5 }}>
              <Field label="Ferite chirurgiche" value={data.surgicalWounds} />
              <Field label="Lesioni cutanee (LDP, vascolari)" value={data.skinLesions} />
            </View>
          )}

          <View style={styles.modelEval}>
             <SafeText style={[styles.label, { fontSize: 9 }]}>Valutazione Modello:</SafeText>
             <SafeText style={[styles.value, { fontSize: 9, fontFamily: 'Helvetica-Bold' }]}>{data.model2Status || 'Non valutato'}</SafeText>
          </View>
        </View>

        {/* MODELLO 3 */}
        <View style={styles.section}>
          <SafeText style={styles.sectionTitle}>3. Modello di Eliminazione</SafeText>
          <SafeText style={styles.subSectionTitle}>Urinaria</SafeText>
          <View style={styles.row}>
            <View style={styles.col}><Field label="Minzione" value={data.urinationType} /></View>
            <View style={styles.col}><Field label="Diuresi 24h" value={data.diuresis24h ? `${data.diuresis24h} ml` : ''} /></View>
            <View style={styles.col}><Field label="Caratteristiche" value={data.urineCharacteristics} /></View>
          </View>
          {data.urinaryCatheter && data.urinaryCatheter !== 'No' && (
            <View style={styles.row}>
              <View style={styles.col2}><Field label="Catetere" value={`${data.urinaryCatheter} - ${data.urinaryCatheterDetails || ''}`} /></View>
            </View>
          )}

          <SafeText style={styles.subSectionTitle}>Intestinale</SafeText>
          <View style={styles.row}>
            <View style={styles.col}><Field label="Frequenza" value={data.bowelFrequency} /></View>
            <View style={styles.col}><Field label="Ultima evac." value={formatDate(data.lastBowelMovement)} /></View>
            <View style={styles.col}><Field label="Addome" value={data.abdomenExam} /></View>
          </View>

          <View style={styles.modelEval}>
             <SafeText style={[styles.label, { fontSize: 9 }]}>Valutazione Modello:</SafeText>
             <SafeText style={[styles.value, { fontSize: 9, fontFamily: 'Helvetica-Bold' }]}>{data.model3Status || 'Non valutato'}</SafeText>
          </View>
        </View>

      </Page>

      {/* PAGE 3: Modelli 4-11 & Piani */}
      <Page size="A4" style={styles.page}>
        
        {/* MODELLO 4 */}
        <View style={styles.section}>
          <SafeText style={styles.sectionTitle}>4. Modello di Attività ed Esercizio Fisico</SafeText>
          
          <View style={styles.row}>
            <View style={styles.col}><Field label="Energia Perceita" value={data.energyLevel} /></View>
            <View style={styles.col}><Field label="Barthel ADL" value={data.barthelScore} /></View>
            <View style={styles.col}><Field label="Equilibrio" value={data.balance} /></View>
          </View>

          <SafeText style={styles.subSectionTitle}>Cardio-Respiratorio</SafeText>
          <View style={styles.row}>
            <View style={styles.col}><Field label="Respiro" value={data.respiratoryFunction} /></View>
            <View style={styles.col}><Field label="Freq. Resp." value={data.respiratoryRate} /></View>
            <View style={styles.col}><Field label="SpO2" value={data.spo2 ? `${data.spo2}%` : ''} /></View>
          </View>
          <View style={styles.row}>
            <View style={styles.col}><Field label="Freq. Cardiaca" value={data.pulseRate} /></View>
            <View style={styles.col}><Field label="Pressione Art." value={data.bloodPressureValue} /></View>
            <View style={styles.col}><Field label="Ritmo" value={data.pulseRhythm} /></View>
          </View>

          <View style={styles.modelEval}>
             <SafeText style={[styles.label, { fontSize: 9 }]}>Valutazione Modello:</SafeText>
             <SafeText style={[styles.value, { fontSize: 9, fontFamily: 'Helvetica-Bold' }]}>{data.model4Status || 'Non valutato'}</SafeText>
          </View>
        </View>

        {/* MODELLO 5 */}
        <View style={styles.section}>
          <SafeText style={styles.sectionTitle}>5. Modello di Riposo e Sonno</SafeText>
          <View style={styles.row}>
            <View style={styles.col}><Field label="Ore Sonno" value={data.sleepHours} /></View>
            <View style={styles.col}><Field label="Riposato al risveglio" value={data.sleepRested === 'true' ? 'Sì' : 'No'} /></View>
            <View style={styles.col}><Field label="Farmaci" value={data.sleepMeds === 'true' ? data.sleepMedsDetails : 'No'} /></View>
          </View>
        </View>

        {/* MODELLO 6 */}
        <View style={styles.section}>
          <SafeText style={styles.sectionTitle}>6. Modello Cognitivo e Percettivo</SafeText>
          <View style={styles.row}>
            <View style={styles.col}><Field label="Coscienza" value={data.consciousness} /></View>
            <View style={styles.col}><Field label="Orientato" value={data.orientation === 'true' ? 'Sì' : 'No'} /></View>
            <View style={styles.col}><Field label="Collaborazione" value={data.collaboration} /></View>
          </View>
          <View style={styles.row}>
            <View style={styles.col}><Field label="Memoria" value={data.memory} /></View>
            <View style={styles.col}><Field label="Vista" value={data.vision} /></View>
            <View style={styles.col}><Field label="Udito" value={data.hearing} /></View>
          </View>
          {data.pain === 'true' && (
            <View style={{ marginTop: 5 }}>
              <SafeText style={styles.subSectionTitle}>Valutazione Dolore</SafeText>
              <View style={styles.row}>
                <View style={styles.col}><Field label="NRS" value={data.painNrs} /></View>
                <View style={styles.col}><Field label="Sede" value={data.painLocation} /></View>
                <View style={styles.col}><Field label="Qualità" value={data.painQuality} /></View>
              </View>
            </View>
          )}
        </View>

        {/* MODELLI 7-11 SINTESI */}
        <View style={styles.section}>
          <SafeText style={styles.sectionTitle}>Sintesi Altri Modelli (7-11)</SafeText>
          <Field label="Stato Civile/Ruoli" value={`${data.maritalStatusRoles || ''} ${data.occupationalRole || ''}`} />
          <Field label="Vive" value={data.livingSituation} />
          <Field label="Coping (Eventi Stressanti)" value={data.stressors} />
          <Field label="Valori/Religione (Note)" value={data.model11Notes} />
        </View>

      </Page>

      {/* PAGE 4: Piano Assistenza & Scale */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <SafeText style={styles.sectionTitle}>Scale di Valutazione</SafeText>
          <View style={styles.row}>
            <View style={styles.col}>
              <SafeText style={styles.subSectionTitle}>Rischio Lesioni (Braden)</SafeText>
              <Field label="Punteggio Totale" value={data.bradenScore} />
              <Field label="Rischio" value={data.pressureUlcerRisk} />
            </View>
            <View style={styles.col}>
              <SafeText style={styles.subSectionTitle}>Rischio Cadute (Conley)</SafeText>
              <Field label="Punteggio Totale" value={data.conleyScore} />
              <Field label="Rischio" value={data.fallRisk ? 'A rischio' : 'Nessun Rischio'} />
            </View>
          </View>
        </View>

        {carePlans.length > 0 && (
          <View style={styles.section}>
            <SafeText style={styles.sectionTitle}>Piano di Assistenza (PES)</SafeText>
            
            {carePlans.map((plan, i) => (
              <View key={i} style={{ marginBottom: 15, paddingBottom: 10, borderBottom: '1px solid #e2e8f0' }}>
                <SafeText style={[styles.subSectionTitle, { color: '#166A3D', fontSize: 12 }]}>Problema Assistenziale {i + 1}</SafeText>
                <View style={styles.textBlock}>
                  <SafeText style={styles.value}>{plan.problem || ''}</SafeText>
                </View>
                
                <View style={styles.row}>
                  <View style={styles.col}>
                     <SafeText style={styles.label}>Obiettivo:</SafeText>
                     <SafeText style={styles.value}>{plan.objective || '-'}</SafeText>
                  </View>
                  <View style={styles.col}>
                     <SafeText style={styles.label}>Valutazione (Esito):</SafeText>
                     <SafeText style={styles.value}>{plan.evaluation || '-'}</SafeText>
                  </View>
                </View>
                
                <View style={{ marginTop: 8 }}>
                  <SafeText style={styles.label}>Interventi Pianificati e Attuati:</SafeText>
                  <SafeText style={styles.value}>{plan.plannedInterventions || '-'}</SafeText>
                  {plan.implementedInterventions && (
                    <SafeText style={[styles.value, { marginTop: 4, fontFamily: 'Helvetica-Oblique' }]}>Attuati: {plan.implementedInterventions}</SafeText>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};
