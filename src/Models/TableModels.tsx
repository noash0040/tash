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

export type soldier = {
  'מס"ד': string;
  'רמ"ד': string;
  מדור: string;
  שם: string;
  "שם משפחה": string;
  שיוך: string;
  "בעל/ת רישיון צבאי": heBolean;
  "עבר/ה הכשרה לשאיבות": heBolean;
  'כשיר/ה (חוסן, ת"ש)': heBolean;
};

export enum heBolean {
  לא = 0,
  כן = 1,
}
