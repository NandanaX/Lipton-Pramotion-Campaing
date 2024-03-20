import React, { useState, useEffect } from "react";
import { Table, Select, Input, Button } from "antd";
import axios from "axios";
import "../css/styles.css";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const { Option } = Select;

function RecordsView() {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [selectedOption, setSelectedOption] = useState("brand");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await axios.get("api/forms/getRecords");
      setRecords(response.data);
      setFilteredRecords(response.data);
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  const handleOptionChange = (value) => {
    setSelectedOption(value);
    setSearchValue("");
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchValue(value);
    filterRecords(selectedOption, value);
  };

  const filterRecords = (selectedOption, searchValue = "") => {
    let filtered = records.filter((record) => {
      const optionMatch =
        !selectedOption ||
        record[selectedOption].toLowerCase().includes(searchValue);
      return optionMatch;
    });
    setFilteredRecords(filtered);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Place",
      dataIndex: "place",
      key: "place",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Cup per Day",
      dataIndex: "cups",
      key: "cups",
    },
    {
      title: "Geo Location",
      dataIndex: "googlemaps",
      key: "googlemaps",
    },
  ];

  const handleDownload = () => {
    const filteredData = filteredRecords.map((record) => ({
      Name: record.name,
      Place: record.place,
      Brand: record.brand,
      CupsPerDay: record.cups,
      GeoLocation: record.googlemaps,
    }));

    const worksheet = XLSX.utils.json_to_sheet(filteredData);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Survey Details");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const excelData = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(excelData, "survey_details.xlsx");
  };

  return (
    <div className="records-view">
      <h1 className="header">Survey Details</h1>
      <div className="filters">
        <Select
          placeholder="Select Filter"
          value={selectedOption}
          onChange={handleOptionChange}
        >
          <Option value="brand">Brand</Option>
          <Option value="place">Place</Option>
          <Option value="googlemaps">Geo Location</Option>
        </Select>
        <Input
          placeholder={`Search ${selectedOption}`}
          value={searchValue}
          onChange={handleSearch}
        />
        <div className="btn-download">
          <Button
            type="primary"
            onClick={handleDownload}
            style={{
              backgroundColor: "gold",
              borderColor: "gold",
              color: "red",
            }}
          >
            <b>Download</b>
          </Button>
        </div>
      </div>
      <Table dataSource={filteredRecords} columns={columns} />
    </div>
  );
}

export default RecordsView;
