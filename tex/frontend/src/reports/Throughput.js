import { DataGrid } from "@mui/x-data-grid";
// import "../../../styles/throughput.scss";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "../../src/assets/images/logo.webp";
import img from "../../src/assets/images/logo.webp";
import bg from "../../src/assets/images/bg.png";

export default function Throughput(props) {
  const [rows, setRows] = useState([]);
  const [hasRecords, setHasRecords] = useState(true); 
  const gridRef = useRef(null);

 



  const columns = [
    {
      field: "hour_range",
      headerName: "Timing",
      align: "center",
      headerAlign:"center",
      sortable: false,
      width: 500,
    },
    {
      field: "count",
      headerName: "Production Count",
      align: "center",
      sortable: false,
      headerAlign:"center",
      width: 500,
    },
  ];

  // Get Table Rows
  useEffect(() => {
    const fetchData = async () => {
    const res=await axios(`http://127.0.0.1:8000/date/hour_count?date=${props.date}`)  
    setRows(res.data)
    };

    fetchData();
  }, [props.date]);

  // Total Count
  const totalCount = rows.reduce(
    (accumulator, current) => accumulator + current.count,
    0
  );

  const handleDownloadReport = () => {
    // Get the JSON data from the rows
    const jsonData = rows.map((row) => ({
      Timing: row.hour_range,
      "Production Count": row.count,
    }));

    // Calculate the total count from the jsonData
    const totalCount = jsonData.reduce(
      (acc, item) => acc + item["Production Count"],
      0
    );

    // Initialize the PDF instance
    const pdf = new jsPDF("p", "pt", "a4", true);

    // Add the background color up to 20% from the top
    const headerHeight = pdf.internal.pageSize.getHeight() * 0.2;
    pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), headerHeight, "F");

    // Add the header background image
    const headerBgImageData = bg;
    pdf.addImage(
      headerBgImageData,
      "PNG",
      0,
      0,
      pdf.internal.pageSize.getWidth(),
      headerHeight
    );

    const textY = headerHeight / 2;

    // Add the logo
    const headerImgData = logo;
    const headerImgWidth = 100;
    const headerImgHeight = 50;
    // pdf.addImage(
    //   headerImgData,
    //   "PNG",
    //   40,
    //   textY - 10 - 25,
    //   headerImgWidth,
    //   headerImgHeight
    // );

    // Calculate the x-coordinate for aligning the headings to the right
    const headingX = pdf.internal.pageSize.getWidth() - 40;

    const titleText = "Alluvium IOT Solutions Pvt. Ltd.";
    const subtitleText = `Per Hour Production Report on ${props.date
      .split("-")
      .reverse()
      .join("-")}`;
    const machineText = "Machine 1";

    pdf.setFontSize(24);
    pdf.setTextColor("#ffffff");
    pdf.text(titleText, headingX, textY - 10, null, null, "right");
    pdf.setFontSize(14);
    pdf.text(subtitleText, headingX, textY + 10, null, null, "right");
    pdf.setFontSize(12);
    pdf.text(machineText, headingX, textY + 30, null, null, "right");

    // Convert the JSON data to arrays of headers and rows
    const headers = ["Timing", "Production Count"];
    const rowsData = jsonData.map((item, index) => {
      return [
        {
          content: item.Timing,
          styles: {
            fillColor: index % 2 === 0 ? "#F0F0F0" : "#F8F8F8",
          },
        },
        {
          content: item["Production Count"],
          styles: {
            fillColor: index % 2 === 0 ? "#F0F0F0" : "#F8F8F8",
          },
        },
      ];
    });

    // Add the table using pdf.autoTable
    pdf.autoTable({
      startY: headerHeight + 20,
      head: [headers],
      body: rowsData,
      styles: {
        halign: "center",
        valign: "middle",
        fontSize: 12,
        cellPadding: 5,
      },
      headStyles: {
        fillColor: "#484848",
        textColor: "#fff",
        fontStyle: "bold",
      },
      columnStyles: {
        Timing: { fontStyle: "bold" },
        "Production Count": { fontStyle: "bold" },
      },
    });

   

    // Add another image at the footer
    const footerImgData = img;
    const footerImgWidth = 150; 
    const footerImgHeight = 20;
    const footerTextX = 40 

    // Set the line color to light gray (R, G, B values)
    pdf.setDrawColor(200, 200, 200);

    // Calculate the Y-coordinate for the line
    const lineY = pdf.internal.pageSize.getHeight() - footerImgHeight
- 30; // Adjust the value to control the vertical position of the line

    // Draw the horizontal line
    pdf.line(40, lineY, pdf.internal.pageSize.getWidth() - 40, lineY);

    // pdf.addImage(
    //   footerImgData,
    //   "PNG",
    //   40,
    //   pdf.internal.pageSize.getHeight() - footerImgHeight - 20,
    //   footerImgWidth,
    //   footerImgHeight
    // );

    const footerTextY =
      pdf.internal.pageSize.getHeight() - footerImgHeight - 17; 
    const companyText = "Alluvium IOT Solutions Pvt. Ltd.";
    const addressText = "A-306, Wallstreet 2, Ellisbridge";
    const cityText = "Ahmedabad, Gujarat";
    const contactText = "+91 9924300511";

    pdf.setFontSize(8);
    pdf.setTextColor("#000000");
    pdf.text(companyText, footerTextX, footerTextY, null, null, "left");
    pdf.text(addressText, footerTextX, footerTextY + 10, null, null, "left");
    pdf.text(cityText, footerTextX, footerTextY + 20, null, null, "left");
    pdf.text(contactText, footerTextX, footerTextY + 30, null, null, "left");

    // Save the PDF file
    const filename = `${props.date}.pdf`;
    pdf.save(filename);
  };



  return (
    <div style={{ textAlign: "center" }}>
      <h2>Alluvium IOT Solutions Pvt. Ltd.</h2>
      <h5>
        <b>Per Hour Production Report</b>
      </h5>
      <button
        onClick={handleDownloadReport}
        style={{
          width: "auto",
          float: "right",
          color: "#fff",
          border: "none",
          outline: "none",
          marginBottom: "10px",
          backgroundColor: "#252e3e",
          padding: "8px",
        }}
      >
        Download Report
      </button>

      <div style={{ height: "auto", width: "100%" }}>
        <div ref={gridRef}>
          {hasRecords ? (
            <DataGrid
              sx={{
                padding: "0 30px",
                "& .MuiDataGrid-row:hover": {
                  backgroundColor: "#f8f5ff",
                },
              }}
              getRowId={(row) => row.hour_range}
              className="table expense-table"
              headerAlign="center"
              rows={rows.filter((row) => row.count !== 0)} 
              columns={columns}
              pageSize={24}
              rowsPerPageOptions={[24]}
              rowHeight={50}
              autoHeight={true}
              disableColumnMenu={true}
              disableSelectionOnClick
            />
          ) : (
            <p>No records found.</p>
          )}
        </div>
        <h3
          style={{
            padding: "20px 0",
            color: "#F15C6D",
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Total Count: {totalCount}
        </h3>
      </div>
    </div>
  );
}