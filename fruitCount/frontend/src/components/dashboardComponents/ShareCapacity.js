import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import useshareCapacityChart from "../../customHooks/dashboardCharts/useShareCapacityChart";
import useMediaQuery from "@mui/material/useMediaQuery";

function ShareCapacity(props) {
  const [machine, setMachine] = useState("0");
  const shareCapacityChart = useshareCapacityChart(props.date, machine);
  const sizeSmall = useMediaQuery("(max-width:992px)");

  const handleMachineChange = (e) => {
    setMachine(e.taret.value); // Update the machine state with the selected value.
  };

  const machineArray = Array.from({ length: 40 }, (_, index) =>
    index.toString()
  );

  return (
    <div className="chart donut-chart">
      <div className="autocomplete-container">
        <h5>Share Capacity</h5>
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
        options={shareCapacityChart.options}
        series={shareCapacityChart.series}
        type="bar"
        height={350}
      />
    </div>
  );
}

export default ShareCapacity;
