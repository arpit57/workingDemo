import { useEffect, useState } from "react";
import axios from "axios";

function useThroughputChart(date) {

  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      const res = await axios(
        `http://127.0.0.1:8000/date/hour_count?date=${date}`
      );
      setData(res.data.map((data)=>data.count));
    }
    getData();
  }, [date]);

  const throughputChart = {
    series: [
      {
        name: "Production",
        data: data,
       
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
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
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [
          "00",
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
        ],
      },
      yaxis: {
        forceNiceScale: false,
      },
    },
  };

  return throughputChart;
}

export default useThroughputChart;
