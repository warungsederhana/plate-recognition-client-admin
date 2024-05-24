"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { parseCookies } from "nookies";
import DataTable from "../../../../../components/DataTable";

const JenisKendaraanPage = () => {
  const [dataJenisKendaraan, setDataJenisKendaraan] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const KEY = [
    "id",
    "nama_jenis_kendaraan",
    "kode_jenis_kendaraan",
    "jumlah_sumbu",
    "id_jenis_mapping",
    "id_model_kendaraan",
    "kategori_jenis",
  ];
  const cookies = parseCookies();
  const token = `Bearer ${cookies.access_token}`;
  const router = useRouter();

  const handleSearch = (nama_jenis: string) => {
    setSearch(nama_jenis);
  };

  const handleDetail = (uid: string) => {
    router.push(`/dashboard/data/jenis-kendaraan/detail/${uid}`);
  };

  const handleEdit = (uid: string) => {
    router.push(`/dashboard/data/jenis-kendaraan/edit/${uid}`);
  };

  const handleDelete = async (uid: string) => {
    try {
      await axios.delete(
        `https://plate-recognition-be-oop-dzgubwy2uq-et.a.run.app/api/jenis-kendaraan/${uid}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const data = dataJenisKendaraan.filter((item) => item.uid !== uid);
      setDataJenisKendaraan(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreate = () => {
    router.push("/dashboard/data/jenis-kendaraan/create");
  };

  useEffect(() => {
    const fetchDataJenisKendaraan = async () => {
      const res = await axios.get(
        `https://plate-recognition-be-oop-dzgubwy2uq-et.a.run.app/api/jenis-kendaraan/`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const data = res.data.data.map((item: any) => {
        delete item.createdAt;
        delete item.updatedAt;
        return item;
      });
      console.log(data);
      setDataJenisKendaraan([...data]);
    };

    fetchDataJenisKendaraan();
  }, [token]);
  return (
    <>
      <div className="pt-6 px-16">
        <DataTable
          title={"Jenis Kendaraan"}
          data={dataJenisKendaraan}
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

export default JenisKendaraanPage;
