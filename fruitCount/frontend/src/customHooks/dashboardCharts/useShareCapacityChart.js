import { useEffect } from "react";

function useShareCapacityChart(date) {
  useEffect(() => {}, []);

  const shareCapacityChart = {
    series: [
      {
        name: "Production",
        data: [8, 11, 18, 22, 10, 15, 17],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "50%",
          endingShape: "rounded",
          distributed: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: ["m2", "m3", "m4", "m5", "m6", "m7", "m8"],
      },
      yaxis: {
        title: {
          text: "",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands";
          },
        },
      },
      title: {
        text: "",
        align: "left",
        margin: 40,
        floating: true,
        style: {
          fontSize: "1rem",
          fontWeight: "500",
          fontFamily: "poppins",
          color: "#212121",
          lineHeight: "1.2",
          marginBottom: "50px !important",
        },
      },
    },
  };

  return shareCapacityChart;
}

export default useShareCapacityChart;
