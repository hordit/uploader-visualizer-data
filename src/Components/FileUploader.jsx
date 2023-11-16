import React, { Suspense, useState } from "react";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import Table from "./Table";
import { StyledFileUploader } from "./FileUploader.styled";
import { toast } from "react-toastify";
import Filter from "./Filter";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

const MAX_FILE_SIZE_MB = 1;

const FileUploader = () => {
  const [fileData, setFileData] = useState([]);
  const [isButtonClicked, setButtonClicked] = useState(false);
  const [filter, setFilter] = useState("");
  const [filtredData, setFiltredData] = useState([]);

  const onDrop = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        toast.error(
          "File size exceeds the limit (3MB). Please choose a smaller file."
        );
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        try {
          if (file.name.endsWith(".csv")) {
            Papa.parse(reader.result, {
              header: true,
              dynamicTyping: true,
              complete: (result) => {
                setFileData(result.data);
              },
            });
          } else if (file.name.endsWith(".json")) {
            const jsonData = JSON.parse(reader.result);
            setFileData(jsonData);
          } else {
            throw new Error("Unsupported file format");
          }
        } catch (error) {
          console.log("Error parsing file:", error.message);
        }
      };

      reader.readAsText(file);
    });
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
  });

  const handleButtonClick = () => {
    open();
    setButtonClicked(true);
  };

  const handleFilter = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setFilter(inputValue);

    const newFilteredData = fileData.filter((item) =>
      Object.values(item).some(
        (value) => value && value.toString().toLowerCase().includes(inputValue)
      )
    );

    setFiltredData(newFilteredData);
  };

  const visibleFileData = filter ? filtredData : fileData;

  const columns = React.useMemo(
    () =>
      visibleFileData.length > 0
        ? Object.keys(visibleFileData[0]).map((key) => ({
            Header: key,
            accessor: key,
          }))
        : [],
    [visibleFileData]
  );

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
      },
    ],
  };

  return (
    <StyledFileUploader>
      <h1>Data Visualization</h1>
      <p>
        Upload a CSV or JSON file (max size: {MAX_FILE_SIZE_MB} MB) containing
        data to see the results.
      </p>
      <button onClick={handleButtonClick}>Upload File</button>
      <Filter value={filter} onChange={handleFilter} />
      <div
        {...getRootProps()}
        style={{ display: isButtonClicked ? "block" : "none" }}
      >
        <input {...getInputProps()} />

        {visibleFileData.length > 0 && (
          <div>
            <h4>Uploaded Data:</h4>
            <Suspense fallback={<div>Loading...</div>}>
              <Table columns={columns} data={visibleFileData} />
              <Doughnut data={data} />
            </Suspense>
          </div>
        )}
      </div>
    </StyledFileUploader>
  );
};

export default FileUploader;
