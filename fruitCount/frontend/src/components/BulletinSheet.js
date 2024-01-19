import React from "react";
import { Viewer } from "@react-pdf-viewer/core"; // install this library
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"; // install this library
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Worker } from "@react-pdf-viewer/core"; // install this library

import samplePDF from "../assets/bulletin.pdf"; // Import the PDF file

export const BulletinSheet = () => {
  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div className="container">
      <div className="pdf-container">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
          <Viewer fileUrl={samplePDF} plugins={[defaultLayoutPluginInstance]} />
        </Worker>
      </div>
    </div>
  );
};

export default BulletinSheet;
