export type { GeneralFields } from './form/general';
export type { ModelsFields } from './form/models';
export type { MonitoringFields } from './form/monitoring';
export type { ProceduresFields } from './form/procedures';

import { defaultGeneralValues } from './form/general';
import { defaultModelsValues } from './form/models';
import { defaultMonitoringValues } from './form/monitoring';
import { defaultProceduresValues } from './form/procedures';

import type { GeneralFields } from './form/general';
import type { ModelsFields } from './form/models';
import type { MonitoringFields } from './form/monitoring';
import type { ProceduresFields } from './form/procedures';

export type NursingAssessment =
  GeneralFields &
  ModelsFields &
  MonitoringFields &
  ProceduresFields;

export const defaultValues: NursingAssessment = {
  ...defaultGeneralValues,
  ...defaultModelsValues,
  ...defaultMonitoringValues,
  ...defaultProceduresValues,
};
