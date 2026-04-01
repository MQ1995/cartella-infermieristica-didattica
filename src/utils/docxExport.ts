import { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType } from 'docx';
import { saveAs } from 'file-saver';
import type { NursingAssessment } from '../types/form';

export const generateDocx = async (data: NursingAssessment) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: "Corso di Laurea in Infermieristica",
            heading: HeadingLevel.TITLE,
            alignment: "center",
          }),
          new Paragraph({
            text: "Piano di assistenza infermieristica a uso didattico",
            heading: HeadingLevel.HEADING_2,
            alignment: "center",
            spacing: { after: 400 },
          }),

          // Sezione 1: Dati Tirocinio
          new Paragraph({ text: "Dati Tirocinio e Studente", heading: HeadingLevel.HEADING_1 }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Studente", bold: true })] })] }),
                  new TableCell({ children: [new Paragraph(data.studentName || '')] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Matricola", bold: true })] })] }),
                  new TableCell({ children: [new Paragraph(data.studentId || '')] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Sede di Tirocinio", bold: true })] })] }),
                  new TableCell({ children: [new Paragraph(data.internshipLocation || '')] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Degenza e U.O.", bold: true })] })] }),
                  new TableCell({ children: [new Paragraph(data.ward || '')] }),
                ],
              }),
            ],
          }),

          new Paragraph({ text: "", spacing: { after: 200 } }),

          // Sezione 2: Dati Paziente
          new Paragraph({ text: "Dati Persona Assistita", heading: HeadingLevel.HEADING_1 }),
          new Paragraph({
            children: [
              new TextRun({ text: "Genere: ", bold: true }),
              new TextRun(`${data.patientGender || ''}\t\t`),
              new TextRun({ text: "Età: ", bold: true }),
              new TextRun(`${data.patientAge || ''}\t\t`),
              new TextRun({ text: "Nazionalità: ", bold: true }),
              new TextRun(`${data.nationality || ''}`),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Motivo del ricovero: ", bold: true }),
              new TextRun(data.admissionReason || ''),
            ],
            spacing: { before: 200 },
          }),

          new Paragraph({ text: "", spacing: { after: 400 } }),

          // Sezione 3: Accertamento
          new Paragraph({ text: "Accertamento (Modelli di Gordon)", heading: HeadingLevel.HEADING_1 }),
          new Paragraph({ children: [new TextRun({ text: "Stato di salute generale:", bold: true })], spacing: { before: 200 } }),
          new Paragraph({ text: data.generalHealth || 'N/A' }),

          new Paragraph({ children: [new TextRun({ text: "Abitudini alimentari:", bold: true })], spacing: { before: 200 } }),
          new Paragraph({ text: data.eatingHabits || 'N/A' }),
          
          new Paragraph({
            children: [
              new TextRun({ text: "Peso (kg): ", bold: true }),
              new TextRun(`${data.currentWeight || '-'}\t\t`),
              new TextRun({ text: "Altezza (cm): ", bold: true }),
              new TextRun(`${data.height || '-'}\t\t`),
              new TextRun({ text: "BMI: ", bold: true }),
              new TextRun(`${data.bmi || '-'}`),
            ],
            spacing: { before: 200 },
          }),

          new Paragraph({ children: [new TextRun({ text: "Eliminazione:", bold: true })], spacing: { before: 200 } }),
          new Paragraph({ text: `Urinaria: ${data.urinationType || ''} - ${data.urineCharacteristics || ''}` }),
          new Paragraph({ text: `Intestinale: ${data.bowelFrequency || ''} - ${data.stoolCharacteristics || ''}` }),

          new Paragraph({ text: "", spacing: { after: 400 } }),

          // Sezione 4: Piano Assistenza
          new Paragraph({ text: "Piano di Assistenza (PES)", heading: HeadingLevel.HEADING_1 }),
          ...(data.carePlans || []).flatMap((cp, index) => [
            new Paragraph({ children: [new TextRun({ text: `Problema ${index + 1}: ${cp.problem || ''}`, bold: true })], spacing: { before: 200 } }),
            new Paragraph({ children: [new TextRun({ text: "Obiettivo: ", bold: true }), new TextRun(cp.objective || '')] }),
            new Paragraph({ children: [new TextRun({ text: "Interventi Pianificati: ", bold: true }), new TextRun(cp.plannedInterventions || '')] }),
            new Paragraph({ children: [new TextRun({ text: "Interventi Attuati: ", bold: true }), new TextRun(cp.implementedInterventions || '')] }),
            new Paragraph({ children: [new TextRun({ text: "Valutazione: ", bold: true }), new TextRun(cp.evaluation || '')] }),
          ]),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const fileName = data.studentName 
    ? `cartella-${data.studentName.replace(/\s+/g, '-').toLowerCase()}` 
    : 'cartella-infermieristica';
  
  saveAs(blob, `${fileName}.docx`);
};