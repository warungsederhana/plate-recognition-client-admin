"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import DataTable from "../../../../../components/DataTable";

const DataMerkKendaraanPage = () => {
  const [dataMerkKendaraan, setDataMerkKendaraan] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const [size, setSize] = useState<number>(0);
  const router = useRouter();

  const handleSearch = (nama_merk: string) => {
    setSearch(nama_merk);
  };

  const handleDetail = (uid: string) => {
    router.push(`/dashboard/data/merk-kendaraan/${uid}`);
  };

  useEffect(() => {
    const fetchDataMerkKendaraan = async () => {
      const res = await axios.get(`http://localhost:3344/api/merk-kendaraan/?nama_merk=${search}`);
      setSize(res.data.size);
      const data = res.data.data.map((item: any) => {
        delete item.createdAt;
        delete item.updatedAt;
        return item;
      });
      console.log(data);
      setDataMerkKendaraan([...data]);
    };

    fetchDataMerkKendaraan();
  }, [search]);
  return (
    <>
      <div className="pt-6 px-16">
        <DataTable
          title={"Merk Kendaraan"}
          data={dataMerkKendaraan}
          handleSearch={handleSearch}
          handleDetail={handleDetail}
        />
      </div>
    </>
  );
};

export default DataMerkKendaraanPage;
