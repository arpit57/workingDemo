import { useEffect, useState } from "react";
import axios from "axios";

function useMachineDataChart(date) {
  const [data, setData] = useState([]);


  useEffect(() => {
    async function getData() {
      try {
        const res = await axios(`http://127.0.0.1:8000/date/month_count?year=${date.split('-')[0]}`);
        const desiredLength = 12;
  
        // Assuming res.data is the array you want to modify
        let dataArray = res.data.map(data => data.count);
        while (dataArray.length < desiredLength) {
          dataArray.push(0);
        }
  
        setData(dataArray); // Update state with the new array
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error as needed
      }
    }
  
    getData();
  }, [date]); // Empty dependency array to run only once after the initial render
  

  const machineDataChart = {
    series: [
      {
        name: "Production",
        data: data,
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 550,
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
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
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
            return val;
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

  return machineDataChart;
}
export default useMachineDataChart;
