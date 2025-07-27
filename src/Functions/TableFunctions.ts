import {
  assignedTableRow,
  classes,
  daysOfTheWeek,
  heBolean,
  soldier,
  weekend,
} from "../Models/TableModels";
import moment, { Moment } from "moment";

const fitHeader = 'כשיר/ה (חוסן, ת"ש)';
const licenseHeader = "בעל/ת רישיון צבאי";
const dateFormat = "DD.MM.YYYY";
const weeksInMonth = 4;
const daysInWeek = 7;

export const makeFutureTable = (
  soldierList: soldier[],
  lastMonthList: assignedTableRow[]
) => {
  const filteredSolderData = soldierList.filter((obj: soldier) => {
    return heBolean[obj[fitHeader]];
  });

  const Leaders = filteredSolderData.filter(
    (person: soldier) => heBolean[person[licenseHeader]]
  );

  const Extras = filteredSolderData.filter(
    (person: soldier) => !heBolean[person[licenseHeader]]
  );

  return fillAMonth(soldierList, Leaders, Extras, lastMonthList);
};

const fillAMonth = (
  soldiers: soldier[],
  Leaders: soldier[],
  Extras: soldier[],
  lastMonthList: assignedTableRow[]
) => {
  const lastMonthLastRow = lastMonthList[lastMonthList.length - 1];
  const day = moment(lastMonthLastRow?.תאריך, dateFormat);
  const firstDayOfFutureTable = day.clone().add(1, "day");

  let month: assignedTableRow[] = [];

  for (let index = 0; index < weeksInMonth; index++) {
    const lastClassAssigned =
      month.length === 0 ? lastMonthLastRow.ענף : month[month.length - 1].ענף;

    const startingDate =
      month.length > 0
        ? moment(month[month.length - 1].תאריך, dateFormat).add(1, "day")
        : firstDayOfFutureTable;

    switch (lastClassAssigned) {
      case classes.bakara:
      case classes.migun:
        const week = fillAWeek(soldiers, [], Leaders, Extras, startingDate);
        month = month.concat(week);
        break;
      case classes.tos:
        const wholeLists = lastMonthList.concat(month);

        const lastNotTosClass =
          wholeLists[wholeLists.length - daysInWeek - 1].ענף;

        month = month.concat(
          createEmptyWeek(
            startingDate,
            lastNotTosClass == classes.bakara ? classes.migun : classes.bakara
          )
        );
        break;
    }
  }

  return month;
};

const fillAWeek = (
  soldiers: soldier[],
  table: assignedTableRow[],
  leaders: soldier[],
  extras: soldier[],
  startingDay: Moment,
  rowNumber: number = 0
): assignedTableRow[] => {
  if (rowNumber >= daysInWeek) {
    return table;
  }

  const leader = leaders[Math.floor(Math.random() * leaders.length)];
  const extra = extras[Math.floor(Math.random() * extras.length)];
  const leaderFullName = `${leader.שם} ${leader["שם משפחה"]}`;
  const extraFullName = `${extra.שם} ${extra["שם משפחה"]}`;

  isWeekend(daysOfTheWeek[rowNumber])
    ? (leader.נקודות += 2)
    : (leader.נקודות += 1);

  const row = newAssignedTableRow(
    startingDay,
    leaderFullName,
    extraFullName,
    leader['רמ"ד'],
    classes.tos
  );

  table.push(row);
  fillAWeek(
    soldiers,
    table,
    leaders.filter((lead) => leader.שם !== lead.שם),
    extras.filter((ext) => ext.שם !== extra.שם),
    startingDay.clone().add(1, "day"),
    rowNumber + 1
  );

  return table;
};

const createEmptyWeek = (startingDate: Moment, classType: classes) => {
  const week: assignedTableRow[] = [];
  const date = startingDate;

  for (let index = 0; index < daysInWeek; index++) {
    week.push(newEmptyAssignedTableRow(date, classType));
    date.add(1, "day");
  }

  return week;
};

const newAssignedTableRow = (
  date: Moment,
  leads: string,
  extraSoldier: string,
  commander: string,
  classType: classes
): assignedTableRow => {
  return {
    תאריך: date.format(dateFormat),
    "יום בשבוע": daysOfTheWeek[date.day()],
    "מוביל המשימה": leads,
    "תורן נוסף": extraSoldier,
    'רמ"ד': commander,
    ענף: classType,
    "בוצע?": false,
  };
};

const newEmptyAssignedTableRow = (
  date: Moment,
  classType: classes
): assignedTableRow => {
  return {
    תאריך: date.format(dateFormat),
    "יום בשבוע": daysOfTheWeek[date.day()],
    "מוביל המשימה": "",
    "תורן נוסף": "",
    'רמ"ד': "",
    ענף: classType,
    "בוצע?": false,
  };
};

export const isWeekend = (day: any) => {
  let isweekend = false;
  switch (typeof day) {
    case "string":
      isweekend = weekend.includes(day);
      break;
    case "object":
      isweekend = weekend.includes((day as assignedTableRow)["יום בשבוע"]);
      break;
    case "number":
      isweekend = weekend.includes(daysOfTheWeek[day]);
      break;
  }
  return isweekend;
};
