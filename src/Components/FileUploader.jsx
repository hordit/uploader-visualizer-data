import React, { Suspense, useState } from "react";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import Table from "./Table";
import { DivContainer, StyledButton, StyledFileUploader } from "./FileUploader.styled";
import { toast } from "react-toastify";
import Filter from "./Filter";
import ChartStatistic from "./ChartStatistic";
import { AiOutlineCloudUpload } from "react-icons/ai";

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

  return (
    <StyledFileUploader>
      <h1>Data Visualization</h1>
      <DivContainer>
      <p>
        Upload a CSV or JSON file (max size: {MAX_FILE_SIZE_MB} MB) containing
        data to see the results.
      </p>
      <StyledButton onClick={handleButtonClick}>
       <span>Upload File</span> 
       <AiOutlineCloudUpload size={30} color="white" />
        </StyledButton>
      </DivContainer>
      
      <Filter value={filter} onChange={handleFilter} />
      <div
        {...getRootProps()}
        style={{ display: isButtonClicked ? "block" : "none" }}
      >
        <input {...getInputProps()} />

        {visibleFileData.length > 0 && (
          <div>
            <Suspense fallback={<div>Loading...</div>}>
              <Table columns={columns} data={visibleFileData} />
              <ChartStatistic visibleFileData={visibleFileData} />
            </Suspense>
          </div>
        )}
      </div>
    </StyledFileUploader>
  );
};

export default FileUploader;
