export type tableHeader = {
  name: string;
  heName: string;
};

export const futureTableHeaders: tableHeader[] = [
  {
    name: "date",
    heName: "תאריך",
  },
  {
    name: "day",
    heName: "יום",
  },
  {
    name: "leader",
    heName: "מוביל",
  },
  {
    name: "extra",
    heName: "תורן נוסף",
  },
  {
    name: "commander",
    heName: 'רמ"ד',
  },
  {
    name: "class",
    heName: "ענף",
  },
];

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
  "בוצע?": boolean;
}

export interface soldier {
  'מס"ד': string;
  'רמ"ד': string;
  מדור: string;
  שם: string;
  "שם משפחה": string;
  שיוך: string;
  "בעל/ת רישיון צבאי": heBolean;
  "עבר/ה הכשרה לשאיבות": heBolean;
  'כשיר/ה (חוסן, ת"ש)': heBolean;
}

export enum heBolean {
  "לא" = 0,
  "כן" = 1,
}

export const weekend = [daysOfTheWeek["ו'"], daysOfTheWeek["ש'"]];
