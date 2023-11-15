import React, { Suspense, useState } from "react";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import Table from "./Table";
import PropTypes from "prop-types";
import { StyledFileUploader } from "./FileUploader.styled";
import { toast } from "react-toastify";
import Filter from "./Filter";
// import ChartStatistic from "./ChartStatistic";

const MAX_FILE_SIZE_MB = 1;

const FileUploader = ({ onDataLoad }) => {
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
                onDataLoad(result.data);
              },
            });
          } else if (file.name.endsWith(".json")) {
            const jsonData = JSON.parse(reader.result);
            setFileData(jsonData);
            onDataLoad(jsonData);
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

  console.log("Visible File Data:", visibleFileData);

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
              {/* <ChartStatistic fileData={visibleFileData}/> */}
            </Suspense>
          </div>
        )}
      </div>
    </StyledFileUploader>
  );
};

FileUploader.propTypes = {
  onDataLoad: PropTypes.func.isRequired,
};

export default FileUploader;
