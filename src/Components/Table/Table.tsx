import { ReactElement } from "react";
import "./Table.css";
import {
  assignedTableRow,
  daysOfTheWeek,
  tableHeader,
  weekend,
} from "../../Models/TableModels";

type props = {
  headers?: tableHeader[];
  data: assignedTableRow[];
};

const Table = ({ data }: props) => {
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
      const isWeekend = weekend.includes(daysOfTheWeek[obj["יום בשבוע"]]);
      return (
        <tr key={obj.תאריך} className={isWeekend ? "bg-gray-100" : "bg-white"}>
          {getCells(obj)}
        </tr>
      );
    });
  };

  const getCells = (obj: Object) => {
    return Object.values(obj).map((value) => {
      return <td>{value}</td>;
    });
  };

  return (
    <table dir="rtl" className="w-full h-full">
      <thead>
        <tr>{getHeadings()}</tr>
      </thead>
      <tbody>{getRows()}</tbody>
    </table>
  );
};

export default Table;
