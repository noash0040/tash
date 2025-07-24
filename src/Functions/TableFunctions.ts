import {
  assignedTableRow,
  classes,
  daysOfTheWeek,
  heBolean,
  soldier,
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

  const extras = filteredSolderData.filter(
    (person: soldier) => !heBolean[person[licenseHeader]]
  );

  const lastMonthLastRow = lastMonthList[lastMonthList.length - 1];
  const day = moment(lastMonthLastRow?.תאריך, dateFormat);
  const firstDayOfFutureTable = day.clone().add(1, "day");
  const lastDayOfFutureTable = day.clone().add(weeksInMonth, "weeks");

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
        const week = fillAWeek(
          [],
          Leaders,
          extras,
          lastMonthList,
          startingDate,
          lastDayOfFutureTable
        );
        month = month.concat(week);
        break;
      case classes.tos:
        month = month.concat(createEmptyWeek(startingDate, classes.bakara));
        break;
    }
  }

  return month;
};

const fillAWeek = (
  table: assignedTableRow[],
  leaders: soldier[],
  extras: soldier[],
  lastMonthList: assignedTableRow[],
  startingDay: Moment,
  lastDayOfFutureTable: Moment,
  rowNumber: number = 0
): assignedTableRow[] => {
  if (rowNumber >= daysInWeek) {
    return table;
  }

  const isLastAssignmentTableRelevant = startingDay
    .clone()
    .subtract(1, "week")
    .isSameOrBefore(lastDayOfFutureTable);
  const leader = leaders[Math.floor(Math.random() * leaders.length)];
  const extra = giveAvailableExtra(
    isLastAssignmentTableRelevant,
    extras,
    lastMonthList,
    startingDay
  );
  const leaderFullName = `${leader.שם} ${leader["שם משפחה"]}`;
  const extraFullName = `${extra.שם} ${extra["שם משפחה"]}`;

  const row = newAssignedTableRow(
    startingDay,
    leaderFullName,
    leader['רמ"ד'],
    classes.tos
  );

  if (isLastAssignmentTableRelevant) {
    if (!CheckIfSoldierValidToAssign(leader, startingDay, lastMonthList)) {
      fillAWeek(
        table,
        leaders,
        extras,
        lastMonthList,
        startingDay,
        lastDayOfFutureTable,
        rowNumber
      );
    } else {
      row["תורן נוסף"] = extraFullName;
      table.push(row);

      fillAWeek(
        table,
        leaders.filter((lead) => leader.שם !== lead.שם),
        extras.filter((ext) => ext.שם !== extra.שם),
        lastMonthList,
        startingDay.clone().add(1, "day"),
        lastDayOfFutureTable,
        rowNumber + 1
      );
    }
  } else {
    row["תורן נוסף"] = extraFullName;
    table.push(row);
    fillAWeek(
      table,
      leaders.filter((lead) => leader.שם !== lead.שם),
      extras.filter((ext) => ext.שם !== extra.שם),
      lastMonthList,
      startingDay.clone().add(1, "day"),
      lastDayOfFutureTable,
      rowNumber + 1
    );
  }

  return table;
};

const giveAvailableExtra = (
  isLastTableRelevant: boolean,
  extras: soldier[],
  lastMonthList: assignedTableRow[],
  startingDay: Moment
) => {
  const extra = extras[Math.floor(Math.random() * extras.length)];

  if (isLastTableRelevant) {
    if (!CheckIfSoldierValidToAssign(extra, startingDay, lastMonthList)) {
      giveAvailableExtra(
        isLastTableRelevant,
        extras.filter((ext) => ext.שם !== extra.שם),
        lastMonthList,
        startingDay
      );
    }
  }

  return extra;
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
  commander: string,
  classType: classes,
  extraSoldier = ""
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

const CheckIfSoldierValidToAssign = (
  soldier: soldier,
  date: Moment,
  lastMonthList: assignedTableRow[]
) => {
  const soldierFullName = `${soldier.שם} ${soldier["שם משפחה"]}`;
  const index = lastMonthList.findIndex((row) =>
    moment(row.תאריך, dateFormat).isSame(date.clone().subtract(1, "week"))
  );

  const exists = lastMonthList
    .slice(index)
    .some(
      (row) =>
        row["מוביל המשימה"] == soldierFullName ||
        row["תורן נוסף"] == soldierFullName
    );

  return !exists;
};
