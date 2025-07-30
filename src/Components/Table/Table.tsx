import { Dispatch, ReactElement } from "react";
import "./Table.css";
import { isWeekend } from "../../Functions/TableFunctions";
import { FaCloudUploadAlt } from "react-icons/fa";
import * as XLSX from "xlsx";
import { assignedTableRow, heBoolean, soldier } from "../../Models/TableModels";

const futureTableId = "future-table";
const editableCells = ["תורן נוסף", "מוביל המשימה"];
const extra = "תורן נוסף";

type props = {
  list: object[];
  tableId: string;
  fileName: string;
  soldierList?: soldier[];
  setList: Dispatch<React.SetStateAction<any>>;
};

const Table = ({ list, tableId, fileName, soldierList, setList }: props) => {
  const getHeadings = () => {
    let headers: Array<ReactElement> = [];

    if (list.length > 0) {
      headers = Object.keys(list[0]).map((key) => {
        return (
          <th key={key} className="text-center" style={{ textAlign: "center" }}>
            {key}
          </th>
        );
      });
    }

    return headers;
  };

  const getRows = () => {
    return list.map((obj, index) => {
      return (
        <tr key={index} className={isWeekend(obj) ? "bg-gray-100" : "bg-white"}>
          {getCells(obj, index)}
        </tr>
      );
    });
  };

  const createXLSXFile = (list: object[]) => {
    if (tableId === futureTableId) {
      fileName = `${fileName} ${(list[1] as assignedTableRow).תאריך}`;
    }

    const ws = XLSX.utils.json_to_sheet(list);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "sheet");

    //set right to left
    if (!wb.Workbook) wb.Workbook = {};
    if (!wb.Workbook.Views) wb.Workbook.Views = [];
    if (!wb.Workbook.Views[0]) wb.Workbook.Views[0] = {};
    wb.Workbook.Views[0].RTL = true;

    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  const getCells = (obj: Object, rowIndex: number) => {
    return Object.entries(obj).map(([key, value], i) => {
      const selectedSoldier = soldierList?.find(
        (soldier) => value === soldierFullName(soldier)
      );

      const soldierFullNameAndPoints =
        selectedSoldier && soldierFullString(selectedSoldier);

      return (
        <td key={i}>
          {editableCells.includes(key) && soldierFullNameAndPoints ? (
            <select
              key={i}
              defaultValue={soldierFullNameAndPoints}
              onChange={(e) => onDropDownChange(key, e.target.value, rowIndex)}
            >
              {key === extra
                ? soldierList
                    ?.filter(
                      (soldier) => !heBoolean[soldier["בעל/ת רישיון צבאי"]]
                    )
                    ?.map((soldier) => {
                      return <option>{soldierFullString(soldier)}</option>;
                    })
                : soldierList
                    ?.filter(
                      (soldier) => heBoolean[soldier["בעל/ת רישיון צבאי"]]
                    )
                    ?.map((soldier) => {
                      return <option>{soldierFullString(soldier)}</option>;
                    })}
            </select>
          ) : (
            value
          )}
        </td>
      );
    });
  };

  const soldierFullString = (soldier: soldier) => {
    return `${soldier.שם} ${soldier["שם משפחה"]} (${soldier.נקודות})`;
  };
  const soldierFullName = (soldier: soldier) => {
    return `${soldier.שם} ${soldier["שם משפחה"]}`;
  };

  const onDropDownChange = (key: string, value: string, rowIndex: number) => {
    const soldier = soldierList?.find((soldier) =>
      value.includes(soldierFullName(soldier))
    );

    if (soldier) {
      const fullName = soldierFullName(soldier);
      setList((prevData: assignedTableRow[]) =>
        prevData.map((row, i) =>
          i === rowIndex ? { ...row, [key]: fullName } : row
        )
      );
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-end justify-around">
      <table id={tableId} dir="rtl" className="h-8/10 w-full">
        <thead>
          <tr>{getHeadings()}</tr>
        </thead>
        <tbody>{getRows()}</tbody>
      </table>
      <button
        id="button-label"
        className={`lg:w-1/10 w-2/10 lg:p-3 p-1 lg:m-3 m-3 bg-green-200 rounded-full flex items-center justify-center hover:opacity-70 cursor-pointer shadow-2xl active:translate-y-1`}
        onClick={() => createXLSXFile(list)}
      >
        <h3 className="flex items-center justify-around w-8/10">
          הורד טבלה
          <FaCloudUploadAlt />
        </h3>
      </button>
    </div>
  );
};

export default Table;
