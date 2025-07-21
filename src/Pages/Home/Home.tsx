import { useEffect, useState } from "react";
import FileUploadButton from "../../Components/HoveringButton/FileUploadButton";
import * as XLSX from "xlsx";
import Table from "../../Components/Table/Table";
import { heBolean, soldier } from "../../Models/TableModels";

const Home = () => {
  const [file, setFile] = useState<File | null>(null);
  const [jsonData, setJsonData] = useState<soldier[]>();
  const [leaders, setLeaders] = useState<soldier[]>([]);
  const [extras, setExtras] = useState<soldier[]>([]);

  const isFileValid = file?.name.split(".").pop() == "xlsx";

  useEffect(() => {
    const handlefile = async () => {
      if (file) {
        const data = await file.arrayBuffer();
        const wb = XLSX.read(data);

        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];

        filterData(XLSX.utils.sheet_to_json(ws) as soldier[]);
        setJsonData(XLSX.utils.sheet_to_json(ws) as soldier[]);
      }
    };

    handlefile();
  }, [file]);

  const filterData = (data: soldier[]) => {
    const filteredData = data.filter((obj: soldier) => {
      return heBolean[obj['כשיר/ה (חוסן, ת"ש)']];
    });

    setLeaders(
      filteredData.filter(
        (person: soldier) => heBolean[person["בעל/ת רישיון צבאי"]]
      )
    );

    setExtras(
      filteredData.filter(
        (person: soldier) => !heBolean[person["בעל/ת רישיון צבאי"]]
      )
    );
  };

  return (
    <div>
      <p dir="rtl" className="text-right">
        {file
          ? isFileValid
            ? `נבחר הקובץ ${file?.name}`
            : "נבחר קובץ לא נתמך"
          : "לא נבחר שום קובץ"}
      </p>
      {isFileValid && jsonData && (
        <div className="w-full h-full">
          <Table data={leaders} />
          <Table data={extras} />
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
