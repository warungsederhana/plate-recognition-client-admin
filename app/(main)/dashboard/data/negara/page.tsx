"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "../../../../../components/DataTable";

const DataNegaraPage = () => {
  const [dataNegara, setDataNegara] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const [size, setSize] = useState<number>(0);

  const handleSearch = (nama_negara: string) => {
    setSearch(nama_negara);
  };

  useEffect(() => {
    const fetchDataNegara = async () => {
      // Menambahkan query pencarian ke URL
      const res = await axios.get(`http://localhost:3344/api/negara-asal/?nama_negara=${search}`);
      setSize(res.data.size);
      const data = res.data.data.map((item: any) => {
        delete item.uid;
        delete item.createdAt;
        delete item.updatedAt;
        return item;
      });
      console.log(data);
      setDataNegara([...data]);
    };

    // Memanggil fetchDataNegara setiap kali nilai 'search' berubah
    fetchDataNegara();
  }, [search]); // Tambahkan 'search' sebagai dependency

  return (
    <>
      <div className="pt-6 px-16">
        <DataTable title={"Negara"} data={dataNegara} handleSearch={handleSearch} />
      </div>
    </>
  );
};

export default DataNegaraPage;
