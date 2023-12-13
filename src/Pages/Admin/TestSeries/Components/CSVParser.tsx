import React, { CSSProperties } from "react";

import { useCSVReader } from "react-papaparse";

const styles = {
  csvReader: {
    display: "flex",

    flexDirection: "row",
    marginBottom: 10,
  } as CSSProperties,
  browseFile: {
    width: "20%",
    height: "3rem",
    background: "lightblue",
    fontSize: "1.3rem",
    fontWeight: "bold",
    fontFamily: "sans-serif",
  } as CSSProperties,
  acceptedFile: {
    // border: "1px solid #ccc",
    height: 45,
    lineHeight: 2.5,
    paddingLeft: 10,
    width: "70%",
  } as CSSProperties,
  remove: {
    borderRadius: 0,
    padding: "0 20px",
    color: "white",
    backgroundColor: "#E72926",
    fontSize: "1.3rem",
    fontWeight: "bold",
    fontFamily: "sans-serif",
  } as CSSProperties,
  progressBarBackgroundColor: {
    backgroundColor: "lightblue",
  } as CSSProperties,
};

interface CsvProps {
  setCsvData?: any;
  csvData?: any;
}

const CSVParser = ({ setCsvData, csvData }: CsvProps) => {
  const { CSVReader } = useCSVReader();

  const handleClick = () => {
    setCsvData([]);
  };

  return (
    <CSVReader
      onUploadAccepted={(results: any) => {
        setCsvData(results?.data);
      }}
      config={{
        header: true,
      }}
    >
      {({
        getRootProps,
        acceptedFile,
        ProgressBar,
        getRemoveFileProps,
      }: any) => (
        <>
          <div style={styles.csvReader}>
            <button type="button" {...getRootProps()} style={styles.browseFile}>
              Browse file
            </button>
            {csvData.length > 0 && (
              <>
                <div style={styles.acceptedFile}>
                  {acceptedFile && acceptedFile.name}
                </div>
                <button
                  {...getRemoveFileProps()}
                  style={styles.remove}
                  onClick={handleClick}
                >
                  Remove
                </button>
              </>
            )}
          </div>
          <ProgressBar style={styles.progressBarBackgroundColor} />
        </>
      )}
    </CSVReader>
  );
};

export default CSVParser;
