import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { ArcElement, Tooltip, Legend, Chart, CategoryScale, DoughnutController, LinearScale } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend, LinearScale, CategoryScale, DoughnutController);

const ChartStatistic = ({ fileData }) => {
  const [chartData, setChartData] = useState(null);
  const [averageSalary, setAverageSalary] = useState(null);

  const maxSalary = 80000;
  const minSalary = 40000;
  const medSalary = 60000;

  const calculateColor = (salary) => {
    switch (true) {
      case salary >= maxSalary:
        return '#FF6384';
      case salary >= medSalary:
        return '#FFA07A';
      case salary >= minSalary:
        return '#FFD700';
      default:
        return '#7CFC00';
    }
  };

  useEffect(() => {
    const salaryData = fileData.map((item) => ({
      category: item.name,
      salary: parseFloat(item.salary),
    }));

    const totalSalary = salaryData.reduce((sum, item) => sum + item.salary, 0);

    const calculatedChartData = {
      labels: salaryData.map((item) => item.category),
      datasets: [
        {
          data: salaryData.map((item) => item.salary),
          backgroundColor: salaryData.map((item) => calculateColor(item.salary)),
          hoverBackgroundColor: salaryData.map((item) => calculateColor(item.salary)),
        },
      ],
    };

    setChartData(calculatedChartData);

    const calculatedAverageSalary = totalSalary / salaryData.length;
    setAverageSalary(calculatedAverageSalary);
  }, [fileData]);

  const options = {
    cutout: '80%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.formattedValue || '';
            return `${label}: ${value}`;
          },
        },
      },
      doughnutLabel: {
        labels: [
          {
            text: `Average\n${averageSalary.toFixed(2)}`,
            font: {
              size: 20,
              weight: 'bold',
            },
          },
        ],
      },
    },
  };

  return (
    <div>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

ChartStatistic.propTypes = {
  fileData: PropTypes.array.isRequired,
};

export default ChartStatistic;
