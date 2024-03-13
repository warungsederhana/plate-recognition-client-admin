"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import DataTable from "../../../../../components/DataTable";

const DataMerkKendaraanPage = () => {
  const [dataMerkKendaraan, setDataMerkKendaraan] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const KEY = ["id", "nama_merk", "kode_negara_asal"];

  const router = useRouter();

  const handleSearch = (nama_merk: string) => {
    setSearch(nama_merk);
  };

  const handleDetail = (uid: string) => {
    router.push(`/dashboard/data/merk-kendaraan/detail/${uid}`);
  };

  const handleDelete = async (uid: string) => {
    try {
      await axios.delete(`http://localhost:3344/api/merk-kendaraan/${uid}`);
      const data = dataMerkKendaraan.filter((item) => item.uid !== uid);
      setDataMerkKendaraan(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreate = () => {
    router.push("/dashboard/data/merk-kendaraan/create");
  };

  useEffect(() => {
    const fetchDataMerkKendaraan = async () => {
      const res = await axios.get(`http://localhost:3344/api/merk-kendaraan/?nama_merk=${search}`);
      const data = res.data.data.map((item: any) => {
        delete item.createdAt;
        delete item.updatedAt;
        return item;
      });
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
          keys={KEY}
          handleSearch={handleSearch}
          handleDetail={handleDetail}
          handleDelete={handleDelete}
          handleCreate={handleCreate}
        />
      </div>
    </>
  );
};

export default DataMerkKendaraanPage;
