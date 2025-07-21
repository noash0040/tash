export type tableHeader = {
  name: string;
  heName: string;
};

export const tableHeaders: tableHeader[] = [
  {
    name: "id",
    heName: 'מס"ד',
  },
  {
    name: "commander",
    heName: 'רמ"ד',
  },
  {
    name: "class",
    heName: "מדור",
  },
  {
    name: "name",
    heName: "שם",
  },
  {
    name: "lastName",
    heName: "שם משפחה",
  },
  {
    name: "type",
    heName: "שיוך",
  },
  {
    name: "license",
    heName: "בעל רישיון צבאי",
  },
  {
    name: "trained",
    heName: "עבר הכשרת שאיבות",
  },
  {
    name: "fit",
    heName: "כשיר",
  },
];
