import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import PropTypes from "prop-types";
import { AverageSalary, ChartContainer, DonutContainer } from "./ChartStatistic.styled";
import ColorPalette from "./ColorPalette";

const ChartStatistic = ({ visibleFileData }) => {
  const valuesSalary = visibleFileData.reduce((values, item) => {
    Object.keys(item).forEach((key) => {
      if (
        key.toLocaleLowerCase().includes("salary") &&
        item[key] !== null &&
        !values.includes(item[key])
      ) {
        values.push(item[key]);
      }
    });
    return values;
  }, []);

  const numericSalaries = valuesSalary.map((salary) => {
    if (typeof salary === "number") {
      return salary;
    }
    const cleanedSalaryString = salary.replace(/[^\d.]/g, "");
    return parseFloat(cleanedSalaryString);
  });

  const averageSalary =
    numericSalaries.reduce((acc, salary) => acc + salary, 0) /
    numericSalaries.length;

  const sortedSalaries = numericSalaries.sort((a, b) => b - a);

  ChartJS.register(ArcElement, Tooltip, Legend);

  const maxSalary = 100000;
  const medSalary = 60000;
  const minSalary = 30000;

  const colorBySalary = (salary) => {
    if (salary >= maxSalary) return "#FF6384";
    if (salary >= medSalary) return "#FFA07A";
    if (salary >= minSalary) return "#FFD700";
    return "#7CFC00";
  };

  const data = {
    datasets: [
      {
        label: "Salary",
        data: sortedSalaries,
        backgroundColor: sortedSalaries.map((salary) => colorBySalary(salary)),
        borderColor: sortedSalaries.map((salary) =>
          colorBySalary(salary).replace("0.2", "1")
        ),
        borderWidth: 0.5,
        hoverOffset: 4,
      },
    ],
  };

  return (
    <ChartContainer>
    <DonutContainer>
      <AverageSalary >
        <span>Average Salary</span> 
        {averageSalary.toFixed()}
      </AverageSalary>
      <Doughnut data={data}  />
    </DonutContainer>
    <ColorPalette />
   </ChartContainer>
  );
};

ChartStatistic.propTypes = {
  visibleFileData: PropTypes.array.isRequired,
};

export default ChartStatistic;
