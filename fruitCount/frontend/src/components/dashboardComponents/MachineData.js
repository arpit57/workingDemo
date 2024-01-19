import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import useMachineDataChart from "../../customHooks/dashboardCharts/useMachineDataChart";
import useMediaQuery from "@mui/material/useMediaQuery";

function MachineData(props) {
  const [machine, setMachine] = useState("1");
  const machineDataChart = useMachineDataChart(props.date);
  const sizeSmall = useMediaQuery("(max-width:992px)");



  const machineArray = Array.from({ length: 40 }, (_, index) =>
    (index + 1).toString()
  );

  return (
    <div className="chart">
      <div className="autocomplete-container">
        <h5>Machine Data</h5>

      </div>
      <ReactApexChart
        options={machineDataChart.options}
        series={machineDataChart.series}
        type="bar"
        height={430}
        width="100%"
      />
    </div>
  );
}

export default MachineData;
