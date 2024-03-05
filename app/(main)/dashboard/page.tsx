"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import DashboardTable from "../../../components/DashboardTable";
import DashboardCard from "../../../components/DashboardCard";

interface DataItem {
  title: string;
  size: number;
  data: any;
}

const DashboardPage = () => {
  const [cardData, setCardData] = useState<DataItem[]>([]);
  const [tableData, setTableData] = useState<any[]>([]);
  const isFetched = useRef(false);

  useEffect(() => {
    const fetchCardData = async (endpoint: string) => {
      const res = await axios.get(`http://localhost:3344/api/${endpoint}`);
      const fetchedData: DataItem = {
        title: res.data.title,
        size: res.data.size,
        data: res.data.data,
      };
      setCardData((prevData) => {
        const newData = [...prevData, fetchedData];
        return newData.sort((a, b) => a.title.localeCompare(b.title));
      });
    };

    const fetchTableData = async (endpoint: string) => {
      const res = await axios.get(`http://localhost:3344/api/${endpoint}/latest`);
      console.log(`data fetched from ${endpoint}`, res.data);
      const fetchedData: any = {
        title: res.data.title,
        data: res.data.data,
      };
      setTableData((prevData) => {
        const newData = [...prevData, fetchedData];
        return newData.sort((a, b) => a.title.localeCompare(b.title));
      });
    };

    if (!isFetched.current) {
      fetchCardData("kendaraan");
      fetchCardData("negara-asal");
      fetchCardData("type-kendaraan");
      fetchCardData("jenis-kendaraan");
      fetchCardData("merk-kendaraan");
      fetchTableData("kendaraan");
      fetchTableData("merk-kendaraan");
      fetchTableData("negara-asal");
      fetchTableData("type-kendaraan");
      fetchTableData("jenis-kendaraan");
      isFetched.current = true;
    }
  }, []);

  return (
    <div className="flex flex-col gap-8 items-center justify-center lg:items-stretch lg:justify-normal pb-8">
      <div className="flex flex-col lg:flex-row lg:flex-shrink lg:gap-4 px-16">
        {cardData.map((item, index) => (
          <DashboardCard key={index} size={item.size} title={item.title} />
        ))}
      </div>
      <div className="flex flex-col items-center justify-center lg:flex-row lg:flex-wrap lg:gap-4 px-16">
        {tableData.map((item, index) => (
          <div className="flex-grow flex-shrink w-full sm:max-w-sm lg:w-auto md:max-w-screen-md lg:max-w-none">
            <DashboardTable key={index} title={item.title} data={item.data} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
