"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { parseCookies } from "nookies";
import DataTable from "../../../../../components/DataTable";
import { toast } from "react-toastify";

const DataMerkKendaraanPage = () => {
  const [dataMerekKendaraan, setDataMerekKendaraan] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const KEY = ["id", "nama_merek", "kode_negara_asal"];
  const cookies = parseCookies();
  const token = `Bearer ${cookies.access_token}`;

  const router = useRouter();

  const handleSearch = (nama_merek: string) => {
    setSearch(nama_merek);
  };

  const handleDetail = (uid: string) => {
    router.push(`/dashboard/data/merk-kendaraan/detail/${uid}`);
  };

  const handleEdit = (uid: string) => {
    router.push(`/dashboard/data/merk-kendaraan/edit/${uid}`);
  };

  const handleDelete = async (uid: string) => {
    try {
      await axios.delete(
        `https://plate-recognition-be-oop-dzgubwy2uq-et.a.run.app/api/merek-kendaraan/${uid}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const data = dataMerekKendaraan.filter((item) => item.uid !== uid);
      setDataMerekKendaraan(data);
      toast.success("Data berhasil dihapus.");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreate = () => {
    router.push("/dashboard/data/merk-kendaraan/create");
  };

  useEffect(() => {
    const fetchDataMerekKendaraan = async () => {
      const res = await axios.get(
        `https://plate-recognition-be-oop-dzgubwy2uq-et.a.run.app/api/merek-kendaraan/`,
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
      setDataMerekKendaraan([...data]);
    };

    fetchDataMerekKendaraan();
  }, [token]);
  return (
    <>
      <div className="pt-6 px-16">
        <DataTable
          title={"Merek Kendaraan"}
          data={dataMerekKendaraan}
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

export default DataMerkKendaraanPage;
