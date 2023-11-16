import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import PropTypes from "prop-types";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartStatistic = ({ fileData }) => {
  const [averageSalary, setAverageSalary] = useState(null);
  const [chartData, setChartData] = useState(null);

  const maxSalary = 150000;
  const medSalary = 50000;
  const minSalary = 15000;

  const calculateColor = (salary) => {
    switch (true) {
      case salary >= maxSalary:
        return "#FF6384";
      case salary >= medSalary:
        return "#FFA07A";
      case salary >= minSalary:
        return "#FFD700";
      default:
        return "#7CFC00";
    }
  };

  useEffect(() => {
    // Filter out non-numeric values from fileData
    const numericData = fileData
      .filter((item) => typeof item === "number")
      .map((item) => parseFloat(item));

    if (numericData.length === 0) {
      // No numeric values found, set the averageSalary to null
      setAverageSalary(null);
    } else {
      // Calculate average salary
      const totalSalary = numericData.reduce((sum, salary) => sum + salary, 0);
      const calculatedAverageSalary = totalSalary / numericData.length;
      setAverageSalary(calculatedAverageSalary);
    }

    // Chart data based on numeric values
    const chartData = {
      labels: Array.from({ length: numericData.length }, (_, index) => index),
      datasets: [
        {
          data: numericData,
          backgroundColor: numericData.map((salary) => calculateColor(salary)),
          hoverBackgroundColor: numericData.map((salary) =>
            calculateColor(salary)
          ),
        },
      ],
    };

    setChartData(chartData);
  }, [fileData]);

  const options = {
    borderRadius: 2,
    hoverBorderWidth: 1,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div style={{ position: "relative", width: "300px", height: "300px" }}>
      {chartData && <Doughnut data={chartData} options={options} />}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        Average Salary: ${averageSalary !== null ? averageSalary.toFixed(2) : "N/A"}
      </div>
    </div>
  );
};

ChartStatistic.propTypes = {
  fileData: PropTypes.array.isRequired,
};

export default ChartStatistic;
