import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function StatsChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/users/stats")
      .then(res => res.json())
      .then(data => {
        console.log("API DATA:", data);

        const labels = Object.keys(data);
        const values = Object.values(data);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Users",
              data: values,
              backgroundColor: ["#7C3AED", "#EC4899"],
              borderRadius: 8
            }
          ]
        });
      })
      .catch(err => console.error("Fetch error:", err));
  }, []);

  return (
    <div style={{ width: "100%", height: "300px" }}>
      {chartData ? (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false
          }}
        />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
}

export default StatsChart;