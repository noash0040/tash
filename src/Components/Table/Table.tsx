import { useEffect, useState } from "react";
import { tableHeader, tableHeaders } from "../../Models/TableModels";

type props = {
  data: Array<Object>;
};

const Table = ({ data }: props) => {
  useEffect(() => {
    console.log(data);
  }, []);

  const getHeadings = (data: Array<Object>) => {
    return Object.keys(data[0]).map((key) => {
      return <th className="border-1">{key}</th>;
    });
  };

  // `map` over the data to return
  // row data, passing in each mapped object
  // to `getCells`
  const getRows = (data: Array<Object>) => {
    return data.map((obj) => {
      return <tr className="border-1">{getCells(obj)}</tr>;
    });
  };

  // Return an array of cell data using the
  // values of each object
  const getCells = (obj: Object) => {
    return Object.values(obj).map((value) => {
      return <td className="border-1">{value}</td>;
    });
  };

  return (
    <table>
      <thead className="border-1">{getHeadings(data)}</thead>
      <tbody className="border-1">{getRows(data)}</tbody>
    </table>
  );
};

export default Table;
