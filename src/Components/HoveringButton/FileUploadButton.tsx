import { useState } from "react";

type props = {
  color: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
};

const FileUploadButton = ({ color, handleChange }: props) => {
  const handleClick = () => {
    document.getElementById("file-upload")?.click();
  };

  return (
    <>
      <input id="file-upload" type="file" onChange={handleChange} hidden />
      <button
        id="button-label"
        className={`w-full h-full rounded-full flex items-center justify-center hover:opacity-70 shadow-2xl active:translate-y-1`}
        style={{ backgroundColor: color }}
        onClick={handleClick}
      >
        קובץ
      </button>
    </>
  );
};

export default FileUploadButton;
