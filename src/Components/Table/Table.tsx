import { useEffect } from "react";
import "./Table.css";
import { soldier, tableHeader } from "../../Models/TableModels";

type props = {
  headers?: tableHeader[];
  data: soldier[];
};

const Table = ({ data, headers }: props) => {
  useEffect(() => {
    console.log(data);
  }, []);

  const getHeadings = () => {
    if (headers) {
      return headers.map((header: tableHeader) => {
        return <th>{header.heName}</th>;
      });
    }

    return Object.keys(data[0]).map((key) => {
      return <th key={key}>{key}</th>;
    });
  };

  const getRows = () => {
    return data.map((obj) => {
      return <tr>{getCells(obj)}</tr>;
    });
  };

  const getCells = (obj: Object) => {
    return Object.values(obj).map((value) => {
      return <td>{value}</td>;
    });
  };

  return (
    <table dir="rtl" className="w-full h-full">
      <thead>{getHeadings()}</thead>
      <tbody>{getRows()}</tbody>
    </table>
  );
};

export default Table;
