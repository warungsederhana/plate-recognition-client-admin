"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import DataTable from "../../../../../components/DataTable";

const TypeKendaraanPage = () => {
  const [dataTypeKendaraan, setDataTypeKendaraan] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const [size, setSize] = useState<number>(0);
  const router = useRouter();

  const handleSearch = (nama_type: string) => {
    setSearch(nama_type);
  };

  const handleDetail = (uid: string) => {
    router.push(`/dashboard/data/type-kendaraan/${uid}`);
  };

  useEffect(() => {
    const fetchDataTypeKendaraan = async () => {
      const res = await axios.get(
        `http://localhost:3344/api/type-kendaraan/?nama_type_kendaraan=${search}`
      );
      setSize(res.data.size);
      const data = res.data.data.map((item: any) => {
        delete item.createdAt;
        delete item.updatedAt;
        return item;
      });
      console.log(data);
      setDataTypeKendaraan([...data]);
    };

    fetchDataTypeKendaraan();
  }, [search]);
  return (
    <>
      <div className="pt-6 px-16">
        <DataTable
          title={"Type Kendaraan"}
          data={dataTypeKendaraan}
          handleSearch={handleSearch}
          handleDetail={handleDetail}
        />
      </div>
    </>
  );
};

export default TypeKendaraanPage;