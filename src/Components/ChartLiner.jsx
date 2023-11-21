// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Filler,
//   Legend,
// } from "chart.js";
// import { Line } from "react-chartjs-2";
// import PropTypes from "prop-types";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Filler,
//   Legend
// );

// const ChartLinear = ({ visibleFileData }) => {
//   const valuesSalary = visibleFileData.reduce((values, item) => {
//     Object.keys(item).forEach((key) => {
//       if (
//         key.toLocaleLowerCase().includes("salary") &&
//         item[key] !== null &&
//         !values.includes(item[key])
//       ) {
//         values.push(item[key]);
//       }
//     });
//     return values;
//   }, []);

//   const numericSalaries = valuesSalary.map((salary) => {
//     if (typeof salary === "number") {
//       return salary;
//     }
//     const cleanedSalaryString = salary.replace(/[^\d.]/g, "");
//     return parseFloat(cleanedSalaryString);
//   });

//   const valuesJobTitle = visibleFileData.reduce((values, item) => {
//     Object.keys(item).forEach((key) => {
//       if (
//         key.toLocaleLowerCase().includes("job") && 
//         key.toLocaleLowerCase().includes("title") &&
//         item[key] !== null &&
//         !values.includes(item[key])
//       ) {
//         values.push(item[key]);
//       }
//     });
//     return values;
//   }, []);

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       title: {
//         display: true,
//         text: "Line Chart",
//       },
//     },
//   };

//   const labels = valuesJobTitle;

//   const data = {
//     labels,
//     datasets: [
//       {
//         fill: true,
//         label: "Level Salary",
//         data: numericSalaries,
//         borderColor: "#313535",
//         backgroundColor: "#54ADBB",
//       },
//     ],
//   };

//   return <Line options={options} data={data} />;
// };

// ChartLinear.propTypes = {
//   visibleFileData: PropTypes.array.isRequired,
// };

// export default ChartLinear;
