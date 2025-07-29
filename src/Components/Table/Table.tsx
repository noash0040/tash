import { ReactElement } from "react";
import "./Table.css";
import { isWeekend } from "../../Functions/TableFunctions";
import { FaCloudUploadAlt } from "react-icons/fa";
import * as XLSX from "xlsx";
import { assignedTableRow } from "../../Models/TableModels";

const futureTableId = "future-table";
type props = {
  data: object[];
  tableId: string;
  fileName: string;
};

const Table = ({ data, tableId, fileName }: props) => {
  const getHeadings = () => {
    let headers: Array<ReactElement> = [];

    if (data.length > 0) {
      headers = Object.keys(data[0]).map((key) => {
        return <th key={key}>{key}</th>;
      });
    }

    return headers;
  };

  const getRows = () => {
    return data.map((obj) => {
      return (
        <tr className={isWeekend(obj) ? "bg-gray-100" : "bg-white"}>
          {getCells(obj)}
        </tr>
      );
    });
  };

  const createXLSXFile = (data: object[]) => {
    const opts: XLSX.WritingOptions = { type: "file", bookType: "xlsx" };
    if (tableId === futureTableId) {
      console.log(data[1]);
      fileName = `${fileName} ${(data[1] as assignedTableRow).תאריך}`;
    }
    const ws = XLSX.utils.json_to_sheet(data);

    const wb = XLSX.utils.book_new();

    //set right to left
    XLSX.utils.book_append_sheet(wb, ws);
    if (!wb.Workbook) wb.Workbook = {};
    if (!wb.Workbook.Views) wb.Workbook.Views = [];
    if (!wb.Workbook.Views[0]) wb.Workbook.Views[0] = {};
    wb.Workbook.Views[0].RTL = true;

    XLSX.writeFileXLSX(wb, `${fileName}.xlsx`, opts);
  };

  const getCells = (obj: Object) => {
    return Object.values(obj).map((value) => {
      return <td>{value}</td>;
    });
  };

  return (
    <div className="w-full h-full">
      <table id={tableId} dir="rtl" className="w-full h-full">
        <thead>
          <tr>{getHeadings()}</tr>
        </thead>
        <tbody>{getRows()}</tbody>
      </table>
      <button
        id="button-label"
        className={`w-2/10 h-1/20 bg-green-400 rounded-full flex items-center justify-center hover:opacity-70 cursor-pointer shadow-2xl active:translate-y-1`}
        onClick={() => createXLSXFile(data)}
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
