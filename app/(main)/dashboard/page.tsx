"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
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
  const [isLoading, setIsLoading] = useState(true);
  const isFetched = useRef(false);
  const cookies = parseCookies();
  const token = `Bearer ${cookies.access_token}`;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (!isFetched.current) {
        const res = await axios.get(
          "https://plate-recognition-be-oop-dzgubwy2uq-et.a.run.app/api/main",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const allData = res.data.data;
        const jenisKendaraan: DataItem = allData.jenisKendaraan;
        const kendaraan: DataItem = allData.kendaraan;
        const merekKendaraan: DataItem = allData.merekKendaraan;
        const negaraAsal: DataItem = allData.negaraAsal;
        const typeKendaraan: DataItem = allData.typeKendaraan;

        setCardData(
          [jenisKendaraan, kendaraan, merekKendaraan, negaraAsal, typeKendaraan].sort((a, b) =>
            a.title.localeCompare(b.title)
          )
        );

        const tableJenisKendaraan = {
          ...jenisKendaraan,
          data: jenisKendaraan.data.slice(0, 5),
        };
        const tableKendaraan = {
          ...kendaraan,
          data: kendaraan.data.slice(0, 5),
        };
        const tableMerekKendaraan = {
          ...merekKendaraan,
          data: merekKendaraan.data.slice(0, 5),
        };
        const tableNegaraAsal = {
          ...negaraAsal,
          data: negaraAsal.data.slice(0, 5),
        };
        const tableTypeKendaraan = {
          ...typeKendaraan,
          data: typeKendaraan.data.slice(0, 5),
        };

        setTableData(
          [
            tableJenisKendaraan,
            tableKendaraan,
            tableMerekKendaraan,
            tableNegaraAsal,
            tableTypeKendaraan,
          ].sort((a, b) => a.title.localeCompare(b.title))
        );
        isFetched.current = true; // Ini harus ada untuk menghindari fetch berulang
      }
      setIsLoading(false);
    };

    if (!isFetched.current) {
      fetchData();
    }
  }, [token]);

  return (
    <div className="flex flex-col gap-8 items-center justify-center lg:items-stretch lg:justify-normal pb-8">
      <div className="flex flex-col lg:flex-row lg:flex-shrink lg:gap-4 px-16">
        {cardData.map((item, index) => (
          <DashboardCard key={index} size={item.size} title={item.title} />
        ))}
      </div>
      <div className="flex flex-col items-center justify-center lg:flex-row lg:flex-wrap lg:gap-4 px-16">
        {tableData.map((item, index) => (
          <div
            key={index}
            className="flex-grow flex-shrink w-full sm:max-w-sm lg:w-auto md:max-w-screen-md lg:max-w-none"
          >
            <DashboardTable key={index} title={item.title} data={item.data} />
          </div>
        ))}
      </div>
    </div>
  );
  // return (
  //   <div className="flex flex-col gap-8 items-center justify-center lg:items-stretch lg:justify-normal pb-8">
  //     {isLoading ? (
  //       <div className="flex items-center justify-center h-96">
  //         <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-500"></div>
  //       </div>
  //     ) : (
  //       <>
  // <div className="flex flex-col lg:flex-row lg:flex-shrink lg:gap-4 px-16">
  //   {cardData.map((item, index) => (
  //     <DashboardCard key={index} size={item.size} title={item.title} />
  //   ))}
  // </div>
  // <div className="flex flex-col items-center justify-center lg:flex-row lg:flex-wrap lg:gap-4 px-16">
  //   {tableData.map((item, index) => (
  //     <div className="flex-grow flex-shrink w-full sm:max-w-sm lg:w-auto md:max-w-screen-md lg:max-w-none">
  //       <DashboardTable key={index} title={item.title} data={item.data} />
  //     </div>
  //           ))}
  //         </div>
  //       </>
  //     )}
  //   </div>
  // );
};

export default DashboardPage;
