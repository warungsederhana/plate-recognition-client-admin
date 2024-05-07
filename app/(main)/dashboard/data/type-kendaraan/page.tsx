"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import DataTable from "../../../../../components/DataTable";

const TypeKendaraanPage = () => {
  const [dataTypeKendaraan, setDataTypeKendaraan] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const KEY = [
    "id",
    "nama_type_kendaraan",
    "nama_type_kendaraan_eri",
    "id_jenis_kendaraan",
    "id_merek_kendaraan",
    "kode_negara_asal",
  ];
  const token = localStorage.getItem("access_token");
  const router = useRouter();

  const handleSearch = (nama_type: string) => {
    setSearch(nama_type);
  };

  const handleDetail = (uid: string) => {
    router.push(`/dashboard/data/type-kendaraan/detail/${uid}`);
  };

  const handleEdit = (uid: string) => {
    router.push(`/dashboard/data/type-kendaraan/edit/${uid}`);
  };

  const handleDelete = async (uid: string) => {
    try {
      await axios.delete(`http://localhost:3344/api/type-kendaraan/${uid}`, {
        headers: {
          Authorization: token,
        },
      });
      const data = dataTypeKendaraan.filter((item) => item.uid !== uid);
      setDataTypeKendaraan(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreate = () => {
    router.push("/dashboard/data/type-kendaraan/create");
  };

  useEffect(() => {
    const fetchDataTypeKendaraan = async () => {
      const res = await axios.get(`http://localhost:3344/api/type-kendaraan/`, {
        headers: {
          Authorization: token,
        },
      });
      const data = res.data.data.map((item: any) => {
        delete item.createdAt;
        delete item.updatedAt;
        return item;
      });
      console.log(data);
      setDataTypeKendaraan([...data]);
    };

    fetchDataTypeKendaraan();
  }, []);
  return (
    <>
      <div className="pt-6 px-16">
        <DataTable
          title={"Type Kendaraan"}
          data={dataTypeKendaraan}
          keys={KEY}
          handleSearch={handleSearch}
          handleDetail={handleDetail}
          handleDelete={handleDelete}
          handleCreate={handleCreate}
          handleEdit={handleEdit}
        />
      </div>
    </>
  );
};

export default TypeKendaraanPage;
