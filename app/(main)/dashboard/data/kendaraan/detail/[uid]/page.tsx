"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
  Tooltip,
  Select,
  Checkbox,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface DataKendaraan {
  uid: string;
  id: string;
  no_daftar: string;
  no_daftar_eri: string;
  id_kepemilikan: string;
  no_kk: string;
  no_polisi: string;
  no_polisi_lama?: string;
  nama_pemilik: string;
  nama_pemilik_lama?: string;
  alamat1: string;
  alamat2?: string;
  id_kelurahan?: string;
  no_telp: string;
  id_jenis_kendaraan: string;
  id_merek_kendaraan: string;
  id_type_kendaraan: string;
  id_model_kendaraan: string;
  id_jenis_map?: string;
  tahun_buat: number;
  tahun_rakit: number;
  tahun_ub: number;
  cylinder: number;
  id_golongan_kendaraan?: string;
  id_warna_tnkb?: number;
  warna_kendaraan: string;
  id_lokasi?: string;
  dati2_induk?: string;
  id_fungsi_kendaraan?: number;
  id_bahan_bakar?: number;
  no_rangka: string;
  no_mesin: string;
  no_bpkb: string;
  jumlah_sumbu?: number;
  kode_jenis?: string;
  status_blokir: boolean;
  progresif: number;
  progresif_tarif: number;
  id_pendaftaran?: string;
  id_lokasi_proses?: string;
  dati2_proses?: string;
  tujuan_mutasi?: string;
  tanggal_faktur: string;
  tanggal_kwitansi: string;
  tanggal_akhir_stnk: string;
  tanggal_akhir_stnk_lama: string;
  tanggal_jatuh_tempo: string;
  tanggal_jatuh_tempo_lama: string;
  id_status?: string;
  bbn1_pokok: number;
  bbn1_denda: number;
  pkb_pokok: number;
  pkb_denda: number;
  pkb_bunga: number;
  swdkllj_pokok: number;
  swdkllj_denda: number;
  stnk: number;
  no_skpd: string;
  no_kohir: string;
  no_skum: string;
  tanggal_daftar?: string;
  tanggal_bayar?: string;
  tahun_berlaku: number;
  tanggal_max_bayar_bbn: string;
  tanggal_max_bayar_pkb: string;
  tanggal_max_bayar_swdkllj: string;
  kode_pembayaran?: string;
  dpwkp?: number;
  ket_dpwkp?: string;
  tanggal_jatuh_tempo_dpwkp?: string;
  subsidi: boolean;
  njkb: number;
  createdAt: string;
  updatedAt: string;
}

const DetailKendaraanPage = ({ params }: { params: { uid: string } }) => {
  const router = useRouter();
  const [dataKendaraan, setDataKendaraan] = useState<DataKendaraan>();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchDataKendaraan = async () => {
      try {
        const response = await axios.get(`http://localhost:3344/api/kendaraan/${params.uid}`, {
          headers: {
            Authorization: token,
          },
        });
        setDataKendaraan(response.data.data);
      } catch (error) {
        console.error("Error fetching data kendaraan:", error);
      }
    };

    fetchDataKendaraan();
  }, [params.uid]);

  const handleEdit = () => {
    router.push(`/dashboard/data/kendaraan/edit/${params.uid}`);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3344/api/kendaraan/${dataKendaraan?.uid}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (
        response.status === 201 ||
        response.statusText === "Created" ||
        response.status === 200 ||
        response.statusText === "OK"
      ) {
        toast.success("Data berhasil dihapus");
        setOpenDeleteModal(false);
        router.push("/dashboard/data/kendaraan");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      toast.error("Gagal menghapus data");
    }
  };

  return (
    <>
      <div className="py-6 px-8 lg:px-16 w-full h-full">
        {dataKendaraan ? (
          <Card className="h-fit w-full" placeholder={undefined}>
            <CardHeader
              floated={false}
              shadow={false}
              className="rounded-none px-4 mb-4"
              placeholder={undefined}
            >
              <Typography color="blue-gray" variant="h5" placeholder={undefined}>
                Halaman Detail Kendaraan
              </Typography>
            </CardHeader>

            <CardBody className=" px-8 py-0 h-full block overflow-auto" placeholder={undefined}>
              <form className="flex flex-col w-full items-center justify-between gap-4 ">
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full h-full ">
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Id:
                    </Typography>
                    <Input
                      value={dataKendaraan.id}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Id Kepemilikan:
                    </Typography>
                    <Input
                      value={dataKendaraan.id_kepemilikan}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Id Pendaftaran:
                    </Typography>
                    <Input
                      value={dataKendaraan?.id_pendaftaran ? dataKendaraan.id_pendaftaran : "-"}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full h-full ">
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      No Daftar:
                    </Typography>
                    <Input
                      value={dataKendaraan.no_daftar}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      No Daftar Eri:
                    </Typography>
                    <Input
                      value={dataKendaraan.no_daftar_eri}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      No KK:
                    </Typography>
                    <Input
                      value={dataKendaraan.no_kk}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full h-full ">
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      No Polisi:
                    </Typography>
                    <Input
                      value={dataKendaraan.no_polisi}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      No Polisi Lama:
                    </Typography>
                    <Input
                      value={dataKendaraan?.no_polisi_lama ? dataKendaraan.no_polisi_lama : "-"}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      No BPKB:
                    </Typography>
                    <Input
                      value={dataKendaraan.no_bpkb}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full h-full ">
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      No Rangka:
                    </Typography>
                    <Input
                      value={dataKendaraan.no_rangka}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      No Mesin:
                    </Typography>
                    <Input
                      value={dataKendaraan.no_mesin}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Kode Jenis:
                    </Typography>
                    <Input
                      value={dataKendaraan?.kode_jenis ? dataKendaraan.kode_jenis : "-"}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full h-full ">
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Nama Pemilik:
                    </Typography>
                    <Input
                      value={dataKendaraan.nama_pemilik}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Nama Pemilik Lama:
                    </Typography>
                    <Input
                      value={
                        dataKendaraan?.nama_pemilik_lama ? dataKendaraan.nama_pemilik_lama : "-"
                      }
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Nomor Telepon:
                    </Typography>
                    <Input
                      value={dataKendaraan.no_telp}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full h-full ">
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Alamat 1:
                    </Typography>
                    <Input
                      value={dataKendaraan.alamat1}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Alamat 2:
                    </Typography>
                    <Input
                      value={dataKendaraan?.alamat2 ? dataKendaraan.alamat2 : "-"}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Id Kelurahan:
                    </Typography>
                    <Input
                      value={dataKendaraan?.id_kelurahan ? dataKendaraan.id_kelurahan : "-"}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full h-full ">
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Id Jenis Kendaraan:
                    </Typography>
                    <div className="max-w-96">
                      <Select
                        label="Select Version"
                        value={dataKendaraan.id_jenis_kendaraan}
                        disabled
                        placeholder={undefined}
                      >
                        <option value={dataKendaraan.id_jenis_kendaraan}>
                          {dataKendaraan.id_jenis_kendaraan}
                        </option>
                      </Select>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Id Merek Kendaraan:
                    </Typography>
                    <div className="max-w-96">
                      <Select
                        label="Select Version"
                        value={dataKendaraan.id_merek_kendaraan}
                        disabled
                        placeholder={undefined}
                      >
                        <option value={dataKendaraan.id_merek_kendaraan}>
                          {dataKendaraan.id_merek_kendaraan}
                        </option>
                      </Select>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Id Type Kendaraan:
                    </Typography>
                    <div className="max-w-96">
                      <Select
                        label="Select Version"
                        value={dataKendaraan.id_type_kendaraan}
                        disabled
                        placeholder={undefined}
                      >
                        <option value={dataKendaraan.id_type_kendaraan}>
                          {dataKendaraan.id_type_kendaraan}
                        </option>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full h-full ">
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Id Model Kendaraan:
                    </Typography>
                    <Input
                      value={dataKendaraan.id_model_kendaraan}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Tahun Pembuatan:
                    </Typography>
                    <Input
                      value={dataKendaraan.tahun_buat}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Tahun Perakitan:
                    </Typography>
                    <Input
                      value={dataKendaraan.tahun_rakit}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full h-full ">
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Tahun UB:
                    </Typography>
                    <Input
                      value={dataKendaraan?.tahun_ub ? dataKendaraan.tahun_ub : "-"}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Silinder:
                    </Typography>
                    <Input
                      value={dataKendaraan.cylinder}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Warna Kendaraan:
                    </Typography>
                    <Input
                      value={dataKendaraan.warna_kendaraan}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full h-full ">
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Jumlah Sumbu:
                    </Typography>
                    <Input
                      value={dataKendaraan?.jumlah_sumbu ? dataKendaraan.jumlah_sumbu : "-"}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Id Golongan Kendaraan:
                    </Typography>
                    <Input
                      value={
                        dataKendaraan?.id_golongan_kendaraan
                          ? dataKendaraan.id_golongan_kendaraan
                          : "-"
                      }
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Id Warna TNKB:
                    </Typography>
                    <Input
                      value={dataKendaraan?.id_warna_tnkb ? dataKendaraan.id_warna_tnkb : "-"}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full h-full ">
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Id Fungsi Kendaraan:
                    </Typography>
                    <Input
                      value={
                        dataKendaraan?.id_fungsi_kendaraan ? dataKendaraan.id_fungsi_kendaraan : "-"
                      }
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Id Bahan Bakar:
                    </Typography>
                    <Input
                      value={dataKendaraan?.id_bahan_bakar ? dataKendaraan.id_bahan_bakar : "-"}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Status Blokir:
                    </Typography>
                    <Checkbox
                      defaultChecked={dataKendaraan.status_blokir}
                      disabled
                      label="Terblokir"
                      placeholder={undefined}
                      crossOrigin={undefined}
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full h-full ">
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Id Lokasi:
                    </Typography>
                    <Input
                      value={dataKendaraan?.id_lokasi ? dataKendaraan.id_lokasi : "-"}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Dati2 Induk:
                    </Typography>
                    <Input
                      value={dataKendaraan?.dati2_induk ? dataKendaraan.dati2_induk : "-"}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Subsidi:
                    </Typography>
                    <Checkbox
                      defaultChecked={dataKendaraan.subsidi}
                      disabled
                      label="Mendapat subsidi"
                      placeholder={undefined}
                      crossOrigin={undefined}
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full h-full ">
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Id Jenis Map:
                    </Typography>
                    <Input
                      value={dataKendaraan?.id_jenis_map ? dataKendaraan.id_jenis_map : "-"}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Id Lokasi Proses:
                    </Typography>
                    <Input
                      value={dataKendaraan?.id_lokasi_proses ? dataKendaraan.id_lokasi_proses : "-"}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Dati2 Proses:
                    </Typography>
                    <Input
                      value={dataKendaraan?.dati2_proses ? dataKendaraan.dati2_proses : "-"}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full h-full ">
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Tujuan Mutasi:
                    </Typography>
                    <Input
                      value={dataKendaraan?.tujuan_mutasi ? dataKendaraan.tujuan_mutasi : "-"}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      BBN1 Pokok:
                    </Typography>
                    <Input
                      value={dataKendaraan?.bbn1_pokok ? dataKendaraan.bbn1_pokok : "-"}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      BBN1 Denda:
                    </Typography>
                    <Input
                      value={dataKendaraan?.bbn1_denda ? dataKendaraan.bbn1_denda : "-"}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full h-full ">
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      PKB Pokok:
                    </Typography>
                    <Input
                      value={dataKendaraan?.pkb_pokok ? dataKendaraan.pkb_pokok : "-"}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      PKB Denda:
                    </Typography>
                    <Input
                      value={dataKendaraan?.pkb_denda ? dataKendaraan.pkb_denda : "-"}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      PKB Bunga:
                    </Typography>
                    <Input
                      value={dataKendaraan?.pkb_bunga ? dataKendaraan.pkb_bunga : "-"}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full h-full ">
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      SWDKLLJ Pokok:
                    </Typography>
                    <Input
                      value={dataKendaraan?.swdkllj_pokok ? dataKendaraan.swdkllj_pokok : "-"}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      SWDKLLJ Denda:
                    </Typography>
                    <Input
                      value={dataKendaraan?.swdkllj_denda ? dataKendaraan.swdkllj_denda : "-"}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      STNK:
                    </Typography>
                    <Input
                      value={dataKendaraan?.stnk ? dataKendaraan.stnk : "-"}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full h-full ">
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Nomor SKPD:
                    </Typography>
                    <Input
                      value={dataKendaraan?.no_skpd ? dataKendaraan.no_skpd : "-"}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Nomor Kohir:
                    </Typography>
                    <Input
                      value={dataKendaraan?.no_kohir ? dataKendaraan.no_kohir : "-"}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Nomor SKUM:
                    </Typography>
                    <Input
                      value={dataKendaraan?.no_skum ? dataKendaraan.no_skum : "-"}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full h-full ">
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Progresif:
                    </Typography>
                    <Input
                      value={dataKendaraan?.progresif ? dataKendaraan.progresif : "-"}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Tarif Progresif:
                    </Typography>
                    <Input
                      value={dataKendaraan?.progresif_tarif ? dataKendaraan.progresif_tarif : "-"}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      NJKB:
                    </Typography>
                    <Input
                      value={dataKendaraan?.njkb ? dataKendaraan.stnk : "-"}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full h-full ">
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Kode Pembayaran:
                    </Typography>
                    <Input
                      value={dataKendaraan?.kode_pembayaran ? dataKendaraan.kode_pembayaran : "-"}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      DPWKP:
                    </Typography>
                    <Input
                      value={dataKendaraan?.dpwkp ? dataKendaraan.dpwkp : "-"}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Keterangan DPWKP:
                    </Typography>
                    <Input
                      value={dataKendaraan?.ket_dpwkp ? dataKendaraan.ket_dpwkp : "-"}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full h-full ">
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Id Status:
                    </Typography>
                    <Input
                      value={dataKendaraan?.id_status ? dataKendaraan.id_status : "-"}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>

                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Tahun Berlaku:
                    </Typography>
                    <Input
                      value={dataKendaraan?.tahun_berlaku ? dataKendaraan.tahun_berlaku : "-"}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>

                  <div className="flex flex-col gap-1 w-full"></div>
                </div>

                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full h-full ">
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Tanggal Faktur:
                    </Typography>
                    <Input
                      value={dataKendaraan?.tanggal_faktur ? dataKendaraan.tanggal_faktur : "-"}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Tanggal Kwitansi:
                    </Typography>
                    <Input
                      value={dataKendaraan?.tanggal_kwitansi ? dataKendaraan.tanggal_kwitansi : "-"}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Tanggal Akhir STNK:
                    </Typography>
                    <Input
                      value={
                        dataKendaraan?.tanggal_akhir_stnk ? dataKendaraan.tanggal_akhir_stnk : "-"
                      }
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full h-full ">
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Tanggal Akhir STNK Lama:
                    </Typography>
                    <Input
                      value={
                        dataKendaraan?.tanggal_akhir_stnk_lama
                          ? dataKendaraan.tanggal_akhir_stnk_lama
                          : "-"
                      }
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Tanggal Jatuh Tempo:
                    </Typography>
                    <Input
                      value={
                        dataKendaraan?.tanggal_jatuh_tempo ? dataKendaraan.tanggal_jatuh_tempo : "-"
                      }
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Tanggal Jatuh Tempo Lama:
                    </Typography>
                    <Input
                      value={
                        dataKendaraan?.tanggal_jatuh_tempo_lama
                          ? dataKendaraan.tanggal_jatuh_tempo_lama
                          : "-"
                      }
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full h-full ">
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Tanggal Daftar:
                    </Typography>
                    <Input
                      value={dataKendaraan?.tanggal_daftar ? dataKendaraan.tanggal_daftar : "-"}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Tanggal Bayar:
                    </Typography>
                    <Input
                      value={dataKendaraan?.tanggal_bayar ? dataKendaraan.tanggal_bayar : "-"}
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Tanggal Jatuh Tempo DPWKP:
                    </Typography>
                    <Input
                      value={
                        dataKendaraan?.tanggal_jatuh_tempo_dpwkp
                          ? dataKendaraan.tanggal_jatuh_tempo_dpwkp
                          : "-"
                      }
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full h-full ">
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Tanggal Maks Bayar PKB:
                    </Typography>
                    <Input
                      value={
                        dataKendaraan?.tanggal_max_bayar_pkb
                          ? dataKendaraan.tanggal_max_bayar_pkb
                          : "-"
                      }
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Tanggal Maks Bayar SWDKLLJ:
                    </Typography>
                    <Input
                      value={
                        dataKendaraan?.tanggal_max_bayar_swdkllj
                          ? dataKendaraan.tanggal_max_bayar_swdkllj
                          : "-"
                      }
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Tanggal Maks Bayar BBN:
                    </Typography>
                    <Input
                      value={
                        dataKendaraan?.tanggal_max_bayar_bbn
                          ? dataKendaraan.tanggal_max_bayar_bbn
                          : "-"
                      }
                      disabled
                      size="md"
                      placeholder={undefined}
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                </div>
              </form>
            </CardBody>

            <CardFooter placeholder={undefined}>
              <div className="flex justify-end gap-4">
                <Button
                  variant="text"
                  className="min-w-24"
                  color="blue-gray"
                  placeholder={undefined}
                  onClick={() => router.back()}
                >
                  Kembali
                </Button>
                <Button
                  className="!bg-yellow-700 min-w-24"
                  placeholder={undefined}
                  onClick={handleEdit}
                >
                  Edit
                </Button>
                <Button
                  className="!bg-danger-400 min-w-24"
                  onClick={() => setOpenDeleteModal(true)}
                  placeholder={undefined}
                >
                  Delete
                </Button>
              </div>
            </CardFooter>

            <Dialog
              open={openDeleteModal}
              handler={() => setOpenDeleteModal(!openDeleteModal)}
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0.9, y: -100 },
              }}
              placeholder={undefined}
            >
              <DialogBody placeholder={undefined}>
                <Typography
                  variant="paragraph"
                  color="blue-gray"
                  className="font-normal"
                  placeholder={undefined}
                >
                  Apakah kamu yakin akan menghapus data ini?
                </Typography>
              </DialogBody>
              <DialogFooter placeholder={undefined}>
                <Button
                  variant="text"
                  color="blue-gray"
                  className="mr-4"
                  onClick={() => setOpenDeleteModal(false)}
                  placeholder={undefined}
                >
                  Cancel
                </Button>
                <Button
                  variant="gradient"
                  onClick={handleDelete}
                  color="red"
                  placeholder={undefined}
                >
                  Delete
                </Button>
              </DialogFooter>
            </Dialog>
          </Card>
        ) : (
          <p>Loading ...</p>
        )}
      </div>
    </>
  );
};

export default DetailKendaraanPage;
