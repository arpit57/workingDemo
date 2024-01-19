import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import useIdleTimeChart from "../../customHooks/dashboardCharts/useIdleTimeChart";

function IdleTimeCauses(props) {
  const [machine, setMachine] = useState("Machine 1");
  const idleTimeCausesChart = useIdleTimeChart(props.date, machine);

  const handleMachineChange = (event, newValue) => {
    setMachine(newValue); // Update the machine state with the selected value.
  };

  const machineArray = [
    "Machine 1",
    "Machine 2",
    "Machine 3",
    "Machine 4",
    "Machine 5",
  ];

  return (
    <div className="chart column-chart">
      <div className="autocomplete-container">
        <h5>Idle Time Causes</h5>
        <Autocomplete
          disablePortal
          size="small"
          id="combo-box-demo"
          options={machineArray}
          getOptionLabel={(option) => option}
          sx={{ width: 180 }}
          renderInput={(params) => (
            <TextField {...params} label="Select machine" />
          )}
          value={machine}
          onChange={handleMachineChange}
        />
      </div>
      <ReactApexChart
        options={idleTimeCausesChart.options}
        series={idleTimeCausesChart.series}
        type="donut"
      />
    </div>
  );
}

export default IdleTimeCauses;
