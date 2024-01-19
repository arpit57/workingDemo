import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import useCycleTimeChart from "../../customHooks/dashboardCharts/useCycleTimeChart";
import useMediaQuery from "@mui/material/useMediaQuery";

function CycleTimeTrend(props) {
  const [machine, setMachine] = useState("1");
  const cycleChart = useCycleTimeChart(props.date, machine);
  const sizeSmall = useMediaQuery("(max-width:992px)");

  const handleMachineChange = (e) => {
    setMachine(e.target.value);
  };

  const machineArray = Array.from({ length: 40 }, (_, index) =>
    (index + 1).toString()
  );

  return (
    <div className="chart area-chart">
      <div className="autocomplete-container">
        <h5>Cycle Time Trend</h5>
        <TextField
          select
          size="large"
          margin="normal"
          variant="outlined"
          label="Select Machine"
          sx={{ width: sizeSmall ? 150 : 300 }}
          value={machine}
          onChange={handleMachineChange}
        >
          {machineArray.map((machine) => {
            return (
              <MenuItem key={machine} value={machine}>
                {machine}
              </MenuItem>
            );
          })}
        </TextField>
      </div>

      <ReactApexChart
        options={cycleChart.options}
        series={cycleChart.series}
        type="line"
        height={350}
      />
    </div>
  );
}

export default CycleTimeTrend;
