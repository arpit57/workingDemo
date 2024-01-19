import React from "react";
import ReactApexChart from "react-apexcharts";
import useMachineUtilisationChart from "../../customHooks/dashboardCharts/useMachineUtilisationChart";

function MachineUtilisation(props) {
  const machineUtilisationChart = useMachineUtilisationChart(props.date);
  return (
    <div className="chart donut-chart">
      <div className="autocomplete-container">
        <h5>Machine Utilisation</h5>
      </div>
      <ReactApexChart
        className="machine-utilisation-chart"
        options={machineUtilisationChart.options}
        series={machineUtilisationChart.series}
        type="bar"
        height={430}
      />
    </div>
  );
}

export default MachineUtilisation;
