"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import DataTable from "../../../../../components/DataTable";

const JenisKendaraanPage = () => {
  const [dataJenisKendaraan, setDataJenisKendaraan] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const [size, setSize] = useState<number>(0);
  const router = useRouter();

  const handleSearch = (nama_jenis: string) => {
    setSearch(nama_jenis);
  };

  const handleDetail = (uid: string) => {
    router.push(`/dashboard/data/jenis-kendaraan/detail/${uid}`);
  };

  const handleDelete = async (uid: string) => {
    try {
      await axios.delete(`http://localhost:3344/api/jenis-kendaraan/${uid}`);
      const data = dataJenisKendaraan.filter((item) => item.uid !== uid);
      setDataJenisKendaraan(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchDataJenisKendaraan = async () => {
      const res = await axios.get(
        `http://localhost:3344/api/jenis-kendaraan/?nama_jenis_kendaraan=${search}`
      );
      setSize(res.data.size);
      const data = res.data.data.map((item: any) => {
        delete item.createdAt;
        delete item.updatedAt;
        return item;
      });
      console.log(data);
      setDataJenisKendaraan([...data]);
    };

    fetchDataJenisKendaraan();
  }, [search]);
  return (
    <>
      <div className="pt-6 px-16">
        <DataTable
          title={"Jenis Kendaraan"}
          data={dataJenisKendaraan}
          handleSearch={handleSearch}
          handleDetail={handleDetail}
          handleDelete={handleDelete}
        />
      </div>
    </>
  );
};

export default JenisKendaraanPage;
