import { useEffect, useState } from "react";
import axios from "axios";

function useCycleTimeChart(date, machine) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios(
          `http://127.0.0.1:8000/cycle_times_by_source_and_date?source_id=${
            machine - 1
          }&date=${date}`
        );
        const cycleData = Object.values(response.data.cycle_times);

        const hourMap = new Map();
        const hourlyCycleTimeArray = Array.from({ length: 24 }, () => 0);
        const hourlyCycleCountArray = Array.from({ length: 24 }, () => 0);

        cycleData.forEach((item) => {
          const startHour = parseInt(item.start_time.split(":")[0]); // Extract the hour
          const cycleTime = item.cycle_time;

          // Update the corresponding index in the arrays
          hourlyCycleTimeArray[startHour] += cycleTime;
          hourlyCycleCountArray[startHour]++;
        });

        // Calculate average cycle times
        for (let i = 0; i < 24; i++) {
          if (hourlyCycleCountArray[i] > 0) {
            hourlyCycleTimeArray[i] = (
              hourlyCycleTimeArray[i] / hourlyCycleCountArray[i]
            ).toFixed(2);
          }
        }

        setData(hourlyCycleTimeArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [date, machine]);

  const cycleChart = {
    series: [
      {
        name: "Cycle Time",
        // data: data,
        data: [
          1, 2, 4, 6, 4, 6, 8, 2, 5, 4, 3, 2, 4, 6, 8, 2, 5, 4, 3, 2, 4, 6, 8,
          2,
        ],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        title: { text: "Hours" },
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
        title: { text: "Seconds" },
      },
      tooltip: {
        x: {
          format: "",
        },
        y: {
          formatter: function (value) {
            return parseFloat(value).toFixed(2) + " seconds"; // Format value with 2 decimal places and add 'seconds'
          },
        },
      },
    },
  };
  return cycleChart;
}

export default useCycleTimeChart;
