import { useEffect, useState } from "react";
import FileUploadButton from "../../Components/HoveringButton/FileUploadButton";
import * as XLSX from "xlsx";
import Table from "../../Components/Table/Table";

const Home = () => {
  const [file, setFile] = useState<File | null>(null);
  const [jsonData, setJsonData] = useState<Array<Object>>();

  const isFileValid = file?.name.split(".").pop() == "xlsx";

  useEffect(() => {
    const handlefile = async () => {
      if (file) {
        const data = await file.arrayBuffer();
        const wb = XLSX.read(data);

        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];

        setJsonData(XLSX.utils.sheet_to_json(ws));
      }
    };

    handlefile();
  }, [file]);

  return (
    <div>
      <p dir="rtl" className="text-right">
        {file
          ? isFileValid
            ? `נבחר הקובץ ${file?.name}`
            : "נבחר קובץ לא נתמך"
          : "לא נבחר שום קובץ"}
      </p>
      {isFileValid && jsonData && <Table data={jsonData} />}
      <div className="absolute left-1/2 bottom-5">
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
