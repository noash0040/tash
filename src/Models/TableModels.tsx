export type tableHeader = {
  name: string;
  heName: string;
};

export enum classes {
  tos = 'תו"ס',
  migun = "מיגון",
  bakara = "בקרה",
}

export enum daysOfTheWeek {
  "א'" = 0,
  "ב'" = 1,
  "ג'" = 2,
  "ד'" = 3,
  "ה'" = 4,
  "ו'" = 5,
  "ש'" = 6,
}

export interface assignedTableRow {
  תאריך: string;
  "יום בשבוע": string;
  "מוביל המשימה": string;
  "תורן נוסף": string;
  'רמ"ד': string;
  ענף: classes;
  "בוצע?": keyof typeof heBoolean;
}

export interface soldier {
  'מס"ד': string;
  'רמ"ד': string;
  מדור: string;
  שם: string;
  "שם משפחה": string;
  שיוך: string;
  "בעל/ת רישיון צבאי": heBoolean;
  "עבר/ה הכשרה לשאיבות": heBoolean;
  'כשיר/ה (חוסן, ת"ש)': heBoolean;
  נקודות: number;
}

export enum heBoolean {
  "לא" = 0,
  "כן" = 1,
}

export const heBooleanKeys = Object.keys(heBoolean);

export const weekend = Object.keys(daysOfTheWeek).slice(-2);
