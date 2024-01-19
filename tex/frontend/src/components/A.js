import React from "react";
import * as xlsx from "xlsx";

function A() {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = handleFileRead;
    reader.readAsBinaryString(file);
  };

  const handleFileRead = (event) => {
    const content = event.target.result;
    const workbook = xlsx.read(content, { type: "binary" });

    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    // Convert the worksheet to an array of arrays
    const arrayData = xlsx.utils.sheet_to_row_object_array(worksheet);
    console.log(JSON.stringify(arrayData));

    // Filter rows 11 to 42 and remove rows with no data except "Operation Description"
    const filteredData = arrayData.slice(10, 42).filter((row) => {
      const keys = Object.keys(row);
      const operationDescription = row["Operation Description"];
      return keys.length > 1 || (keys.length === 1 && operationDescription);
    });
    // console.log(JSON.stringify(filteredData));
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
}

export default A;
