// DEBUG mode
export const DEBUG = process.env.NODE_ENV === 'development';

// Duration of the notification displayed at the bottom of the screen [in milliseconds]
export const NOTIFICATION_DURATION = 5000;

// Vector of names of aggregated data sets to not group in the Modelling -> Populations tab
export const nonGroupedDataNames = ['DEAD', 'AIDS'];

export const aggrDataGroups = {
  Dead: ['Dead'],
  AIDS: ['AIDS'],
  HIV: ['HIV', 'HIVAIDS'],
  CD4: ['HIV_CD4_1', 'HIV_CD4_2', 'HIV_CD4_3', 'HIV_CD4_4'],
}
