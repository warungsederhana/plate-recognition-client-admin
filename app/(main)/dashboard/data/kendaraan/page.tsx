"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import DataTable from "../../../../../components/DataTable";

const KendaraanPage = () => {
  const [dataKendaraan, setDataKendaraan] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const KEY = [
    "id",
    "no_daftar",
    "no_daftar_eri",
    "id_kepemilikan",
    "no_kk",
    "no_polisi",
    "no_polisi_lama",
    "nama_pemilik",
    "nama_pemilik_lama",
    "alamat1",
    "alamat2",
    "id_kelurahan",
    "no_telp",
    "id_jenis_kendaraan",
    "id_merek_kendaraan",
    "id_type_kendaraan",
    "id_model_kendaraan",
    "id_jenis_map",
    "tahun_buat",
    "tahun_rakit",
    "tahun_ub",
    "cylinder",
    "id_golongan_kendaraan",
    "id_warna_tnkb",
    "warna_kendaraan",
    "id_lokasi",
    "dati2_induk",
    "id_fungsi_kendaraan",
    "id_bahan_bakar",
    "no_rangka",
    "no_mesin",
    "no_bpkb",
    "jumlah_sumbu",
    "kode_jenis",
    "status_blokir",
    "progresif",
    "progresif_tarif",
    "id_pendaftaran",
    "id_lokasi_proses",
    "dati2_proses",
    "tujuan_mutasi",
    "tanggal_faktur",
    "tanggal_kwitansi",
    "tanggal_akhir_stnk",
    "tanggal_akhir_stnk_lama",
    "tanggal_jatuh_tempo",
    "tanggal_jatuh_tempo_lama",
    "id_status",
    "bbn1_pokok",
    "bbn1_denda",
    "pkb_pokok",
    "pkb_denda",
    "pkb_bunga",
    "swdkllj_pokok",
    "swdkllj_denda",
    "stnk",
    "no_skpd",
    "no_kohir",
    "no_skum",
    "tanggal_daftar",
    "tanggal_bayar",
    "tahun_berlaku",
    "tanggal_max_bayar_bbn",
    "tanggal_max_bayar_pkb",
    "tanggal_max_bayar_swdkllj",
    "kode_pembayaran",
    "dpwkp",
    "ket_dpwkp",
    "tanggal_jatuh_tempo_dpwkp",
    "subsidi",
    "njkb",
  ];
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const fetchDataKendaraan = async () => {
      const res = await axios.get(`http://localhost:3344/api/kendaraan/`, {
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
      setDataKendaraan([...data]);
    };

    fetchDataKendaraan();
  }, []);

  const handleSearch = (nama_kendaraan: string) => {
    setSearch(nama_kendaraan);
  };

  const handleDetail = (uid: string) => {
    router.push(`/dashboard/data/kendaraan/detail/${uid}`);
  };

  const handleEdit = (uid: string) => {
    router.push(`/dashboard/data/kendaraan/edit/${uid}`);
  };

  const handleDelete = async (uid: string) => {
    const token = localStorage.getItem("access_token");
    try {
      await axios.delete(`http://localhost:3344/api/kendaraan/${uid}`, {
        headers: {
          Authorization: token,
        },
      });
      const data = dataKendaraan.filter((item) => item.uid !== uid);
      setDataKendaraan(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreate = () => {
    router.push("/dashboard/data/kendaraan/create");
  };

  return (
    <>
      <div className="p-6 px-16">
        <DataTable
          title={"Kendaraan"}
          data={dataKendaraan}
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

export default KendaraanPage;
