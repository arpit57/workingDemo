import { useEffect, useState } from "react";
import axios from "axios";

function useMachineUtilisationChart(date) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      const newData = [];
      for (let i = 0; i <= 39; i++) {
        console.log(
          `http://127.0.0.1:8000/data_by_date_and_source?date=${date}&source_id=${i}`
        );
        const res = await axios(
          `http://127.0.0.1:8000/data_by_date_and_source?date=${date}&source_id=${i}`
        );
        newData.push(res.data.count);
      }
      setData(newData);
    }
    getData();
  }, [date]);

  const machineUtilisationChart = {
    series: [
      {
        name: "Production",
        // data: data,
        data: [
          1, 5, 6, 3, 4, 15, 6, 17, 8, 19, 4, 11, 18, 13, 14, 5, 16, 7, 18, 9,
          2, 21, 12, 23, 24, 5, 26, 7, 28, 19, 30, 31, 22, 33, 4, 15, 36, 37,
          38, 39,
        ],
      },
    ],
    options: {
      chart: {
        type: "bar",
      },
      plotOptions: {
        bar: {
          horizontal: false,
          dataLabels: {
            position: "top",
          },
          barHeight: "30%",
          barWidth: "30%",
          distributed: true,
        },
      },
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: "12px",
          colors: ["#fff"],
        },
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["#fff"],
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      xaxis: {
        categories: [
          "Machine 1",
          "Machine 2",
          "Machine 3",
          "Machine 4",
          "Machine 5",
          "Machine 6",
          "Machine 7",
          "Machine 8",
          "Machine 9",
          "Machine 10",
          "Machine 11",
          "Machine 12",
          "Machine 13",
          "Machine 14",
          "Machine 15",
          "Machine 16",
          "Machine 17",
          "Machine 18",
          "Machine 19",
          "Machine 20",
          "Machine 21",
          "Machine 22",
          "Machine 23",
          "Machine 24",
          "Machine 25",
          "Machine 26",
          "Machine 27",
          "Machine 28",
          "Machine 29",
          "Machine 30",
          "Machine 31",
          "Machine 32",
          "Machine 33",
          "Machine 34",
          "Machine 35",
          "Machine 36",
          "Machine 37",
          "Machine 38",
          "Machine 39",
          "Machine 40",
        ],
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

  return machineUtilisationChart;
}

export default useMachineUtilisationChart;
