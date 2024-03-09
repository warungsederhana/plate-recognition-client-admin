"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import DataTable from "../../../../../components/DataTable";

const KendaraanPage = () => {
  const [dataKendaraan, setDataKendaraan] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const [size, setSize] = useState<number>(0);
  const router = useRouter();

  const handleSearch = (nama_kendaraan: string) => {
    setSearch(nama_kendaraan);
  };

  const handleDetail = (uid: string) => {
    router.push(`/dashboard/data/kendaraan/${uid}`);
  };

  useEffect(() => {
    const fetchDataKendaraan = async () => {
      const res = await axios.get(`http://localhost:3344/api/kendaraan/?nama_kendaraan=${search}`);
      setSize(res.data.size);
      const data = res.data.data.map((item: any) => {
        delete item.createdAt;
        delete item.updatedAt;
        return item;
      });
      console.log(data);
      setDataKendaraan([...data]);
    };

    fetchDataKendaraan();
  }, [search]);

  return (
    <>
      <div className="p-6 px-16">
        <DataTable
          title={"Kendaraan"}
          data={dataKendaraan}
          handleSearch={handleSearch}
          handleDetail={handleDetail}
        />
      </div>
    </>
  );
};

export default KendaraanPage;
