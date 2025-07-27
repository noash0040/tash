import { useEffect, useState } from "react";
import FileUploadButton from "../../Components/HoveringButton/FileUploadButton";
import * as XLSX from "xlsx";
import Table from "../../Components/Table/Table";
import { assignedTableRow, soldier } from "../../Models/TableModels";
import { makeFutureTable } from "../../Functions/TableFunctions";

enum propertyCheck {
  soldiers = 'מס"ד',
  assignments = "תאריך",
}

enum fileText {
  unsupported = "נבחר קובץ לא נתמך",
  chooseFiles = "יש לבחור רשימת שואבים ורשימת תורניות מחודש שעבר",
  chooseSoliders = "יש לבחור רשימת שואבים",
  choosePastAssignments = "יש לבחור רשימת תורניות מחודש שעבר",
  done = "מחשב...",
}

const Home = () => {
  const [file, setFile] = useState<File | null>(null);
  const [soldierList, setSoldierList] = useState<soldier[]>([]);
  const [lastMonthList, setLastMonthList] = useState<assignedTableRow[]>([]);
  const [fileValidText, setFileValidText] = useState("");
  const [futureMonth, setFutureMonth] = useState<assignedTableRow[]>([]);

  const isFileValid = file?.name.split(".").pop() == "xlsx";

  useEffect(() => {
    handlefileChange();
  }, [file]);

  useEffect(() => {
    if (soldierList.length > 0 && lastMonthList.length > 0) {
      setFileValidText(fileText.done);
      setFutureMonth(makeFutureTable(soldierList, lastMonthList));
    }
  }, [soldierList, lastMonthList]);

  const handlefileChange = async () => {
    if (file && isFileValid) {
      const data = await file.arrayBuffer();
      const wb = XLSX.read(data);

      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];

      const jsondata = XLSX.utils.sheet_to_json(ws);

      if (jsondata[0]?.hasOwnProperty(propertyCheck.soldiers)) {
        setSoldierList(jsondata as soldier[]);
        setFileValidText(fileText.choosePastAssignments);
      } else if (jsondata[0]?.hasOwnProperty(propertyCheck.assignments)) {
        setLastMonthList(jsondata as assignedTableRow[]);
        setFileValidText(fileText.chooseSoliders);
      }
    } else if (file && !isFileValid) {
      setFileValidText(fileText.unsupported);
    } else {
      setFileValidText(fileText.chooseFiles);
    }
  };

  return (
    <div>
      <p dir="rtl" className="text-right">
        {fileValidText}
      </p>
      {isFileValid && soldierList && (
        <div className="w-9/10 h-9/10">
          <Table data={futureMonth}></Table>
        </div>
      )}
      <div className="fixed left-1/2 bottom-5">
        <div className="relative left-[-50%] w-30 h-15">
          <FileUploadButton
            color="pink"
            handleChange={(event) => setFile(event.target.files?.[0] || null)}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
