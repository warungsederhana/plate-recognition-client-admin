"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import DataTable from "../../../../../components/DataTable";

const DataNegaraPage = () => {
  const [dataNegara, setDataNegara] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const KEY = ["id", "nama_negara", "kode_negara"];
  const router = useRouter();

  const handleSearch = (nama_negara: string) => {
    setSearch(nama_negara);
  };

  const handleDetail = (uid: string) => {
    router.push(`/dashboard/data/negara/detail/${uid}`);
  };

  const handleEdit = (uid: string) => {
    router.push(`/dashboard/data/negara/edit/${uid}`);
  };

  const handleDelete = async (uid: string) => {
    try {
      await axios.delete(`http://localhost:3344/api/negara-asal/${uid}`);
      const data = dataNegara.filter((item) => item.uid !== uid);
      setDataNegara(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreate = () => {
    router.push("/dashboard/data/negara/create");
  };

  useEffect(() => {
    const fetchDataNegara = async () => {
      // Menambahkan query pencarian ke URL
      const res = await axios.get(`http://localhost:3344/api/negara-asal/?nama_negara=${search}`);
      const data = res.data.data.map((item: any) => {
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
        <DataTable
          title={"Negara"}
          data={dataNegara}
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

export default DataNegaraPage;
