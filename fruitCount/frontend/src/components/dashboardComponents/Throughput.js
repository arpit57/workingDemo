import React from "react";
import ReactApexChart from "react-apexcharts"
import useThroughputChart from "../../customHooks/dashboardCharts/useThroughputChart";

function Throughput(props) {
  const throughputChart = useThroughputChart(props.date);

 


  return (
    <div className="chart area-chart">
      <div className="autocomplete-container">
        <h5>Throughput</h5>
      
      </div>

      <ReactApexChart
        options={throughputChart.options}
        series={throughputChart.series}
        type="line"
        height={350}
      />
    </div>
  );
}

export default Throughput;
