"use client";
import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";
import Select from "react-select";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Checkbox,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
dayjs.locale("id");

const EditKendaraanPage = ({ params }: { params: { uid: string } }) => {
  const router = useRouter();
  const [kendaraan, setKendaraan] = useState({
    id: "",
    no_daftar: "",
    no_daftar_eri: "",
    id_kepemilikan: "",
    no_kk: "",
    no_polisi: "",
    no_polisi_lama: "",
    nama_pemilik: "",
    nama_pemilik_lama: "",
    alamat1: "",
    alamat2: "",
    id_kelurahan: "",
    no_telp: "",
    id_jenis_kendaraan: "",
    id_merek_kendaraan: "",
    id_type_kendaraan: "",
    id_model_kendaraan: "",
    id_jenis_map: "",
    tahun_buat: "",
    tahun_rakit: "",
    tahun_ub: "",
    cylinder: "",
    id_golongan_kendaraan: "",
    id_warna_tnkb: "",
    warna_kendaraan: "",
    id_lokasi: "",
    dati2_induk: "",
    id_fungsi_kendaraan: "",
    id_bahan_bakar: "",
    no_rangka: "",
    no_mesin: "",
    no_bpkb: "",
    jumlah_sumbu: "",
    kode_jenis: "",
    status_blokir: false,
    progresif: "",
    progresif_tarif: "",
    id_pendaftaran: "",
    id_lokasi_proses: "",
    dati2_proses: "",
    tujuan_mutasi: "",
    tanggal_faktur: "",
    tanggal_kwitansi: "",
    tanggal_akhir_stnk: "",
    tanggal_akhir_stnk_lama: "",
    tanggal_jatuh_tempo: "",
    tanggal_jatuh_tempo_lama: "",
    id_status: "",
    bbn1_pokok: 0,
    bbn1_denda: 0,
    pkb_pokok: 0,
    pkb_denda: 0,
    pkb_bunga: 0,
    swdkllj_pokok: 0,
    swdkllj_denda: 0,
    stnk: 0,
    no_skpd: "",
    no_kohir: "",
    no_skum: "",
    tanggal_daftar: "",
    tanggal_bayar: "",
    tahun_berlaku: "",
    tanggal_max_bayar_bbn: "",
    tanggal_max_bayar_pkb: "",
    tanggal_max_bayar_swdkllj: "",
    kode_pembayaran: "",
    dpwkp: "",
    ket_dpwkp: "",
    tanggal_jatuh_tempo_dpwkp: "",
    subsidi: false,
    njkb: "",
  });
  const [errors, setErrors] = useState({
    id: "",
    no_daftar: "",
    no_daftar_eri: "",
    id_kepemilikan: "",
    no_kk: "",
    no_polisi: "",
    no_polisi_lama: "",
    nama_pemilik: "",
    nama_pemilik_lama: "",
    alamat1: "",
    alamat2: "",
    id_kelurahan: "",
    no_telp: "",
    id_jenis_kendaraan: "",
    id_merek_kendaraan: "",
    id_type_kendaraan: "",
    id_model_kendaraan: "",
    id_jenis_map: "",
    tahun_buat: "",
    tahun_rakit: "",
    tahun_ub: "",
    cylinder: "",
    id_golongan_kendaraan: "",
    id_warna_tnkb: "",
    warna_kendaraan: "",
    id_lokasi: "",
    dati2_induk: "",
    id_fungsi_kendaraan: "",
    id_bahan_bakar: "",
    no_rangka: "",
    no_mesin: "",
    no_bpkb: "",
    jumlah_sumbu: "",
    kode_jenis: "",
    status_blokir: "",
    progresif: "",
    progresif_tarif: "",
    id_pendaftaran: "",
    id_lokasi_proses: "",
    dati2_proses: "",
    tujuan_mutasi: "",
    tanggal_faktur: "",
    tanggal_kwitansi: "",
    tanggal_akhir_stnk: "",
    tanggal_akhir_stnk_lama: "",
    tanggal_jatuh_tempo: "",
    tanggal_jatuh_tempo_lama: "",
    id_status: "",
    bbn1_pokok: "",
    bbn1_denda: "",
    pkb_pokok: "",
    pkb_denda: "",
    pkb_bunga: "",
    swdkllj_pokok: "",
    swdkllj_denda: "",
    stnk: "",
    no_skpd: "",
    no_kohir: "",
    no_skum: "",
    tanggal_daftar: "",
    tanggal_bayar: "",
    tahun_berlaku: "",
    tanggal_max_bayar_bbn: "",
    tanggal_max_bayar_pkb: "",
    tanggal_max_bayar_swdkllj: "",
    kode_pembayaran: "",
    dpwkp: "",
    ket_dpwkp: "",
    tanggal_jatuh_tempo_dpwkp: "",
    subsidi: "",
    njkb: "",
  });
  const [jenisKendaraanOptions, setJenisKendaraanOptions] = useState([]);
  const [merekKendaraanOptions, setMerekKendaraanOptions] = useState([]);
  const [typeKendaraanOptions, setTypeKendaraanOptions] = useState([]);
  const cookies = parseCookies();
  const token = `Bearer ${cookies.access_token}`;

  useEffect(() => {
    const fetchDataKendaraan = async () => {
      try {
        const response = await axios.get(`http://localhost:3344/api/kendaraan/${params.uid}`, {
          headers: {
            Authorization: token,
          },
        });
        setKendaraan(response.data.data);
      } catch (error) {
        console.error("Error fetching data kendaraan:", error);
      }
    };

    fetchDataKendaraan();
  }, [params.uid, token]);

  useEffect(() => {
    // fetch jenis kendaraan options
    axios
      .get("http://localhost:3344/api/jenis-kendaraan", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setJenisKendaraanOptions(
          response.data.data.map((jenis: any) => ({
            value: jenis.id,
            label: jenis.nama_jenis_kendaraan,
          }))
        );
      })
      .catch((error) => console.error("Error fetching jenis kendaraan:", error));

    // fetch merek kendaraan options
    axios
      .get("http://localhost:3344/api/merek-kendaraan", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setMerekKendaraanOptions(
          response.data.data.map((merek: any) => ({
            value: merek.id,
            label: merek.nama_merek,
          }))
        );
      })
      .catch((error) => console.error("Error fetching merek kendaraan:", error));

    // fetch type kendaraan options
    axios
      .get("http://localhost:3344/api/type-kendaraan", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setTypeKendaraanOptions(
          response.data.data.map((merek: any) => ({
            value: merek.id,
            label: merek.nama_type_kendaraan,
          }))
        );
      })
      .catch((error) => console.error("Error fetching type kendaraan:", error));
  }, [params.uid, token]);

  useEffect(() => {
    setKendaraan((prevKendaraan) => ({
      ...prevKendaraan,
      id_model_kendaraan: `${prevKendaraan.id_jenis_kendaraan}${prevKendaraan.id_merek_kendaraan}${prevKendaraan.id_type_kendaraan}`,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      id_model_kendaraan: "",
    }));
  }, [kendaraan.id_jenis_kendaraan, kendaraan.id_merek_kendaraan, kendaraan.id_type_kendaraan]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue: string | number = value;

    // Daftar nama properti yang diharapkan bertipe number
    const numberFields = [
      "id_fungsi_kendaraan",
      "id_warna_tnkb",
      "tahun_buat",
      "tahun_rakit",
      "tahun_ub",
      "cylinder",
      "bbn1_pokok",
      "bbn1_denda",
      "pkb_pokok",
      "pkb_denda",
      "pkb_bunga",
      "swdkllj_pokok",
      "swdkllj_denda",
      "stnk",
      "njkb",
      "id_bahan_bakar",
      "jumlah_sumbu",
      "progresif",
      "progresif_tarif",
      "dpwkp",
      "tahun_berlaku",
    ];

    // Konversi value ke number jika nama properti termasuk dalam daftar numberFields
    if (numberFields.includes(name)) {
      formattedValue = parseInt(value) || 0; // Gunakan parseFloat() untuk desimal
    }

    setKendaraan({
      ...kendaraan,
      [name]: formattedValue,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSelectChange = (selectedOption: any, name: any) => {
    setKendaraan({
      ...kendaraan,
      [name]: selectedOption.value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleDateChange = (date: any, name: any) => {
    console.log("handle date change");
    setKendaraan({
      ...kendaraan,
      [name]: date.format("DD/MM/YYYY"),
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setKendaraan({
      ...kendaraan,
      [name]: checked,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validate = () => {
    let isValid = true;
    let newErrors = {
      id: "",
      no_daftar: "",
      no_daftar_eri: "",
      id_kepemilikan: "",
      no_kk: "",
      no_polisi: "",
      no_polisi_lama: "",
      nama_pemilik: "",
      nama_pemilik_lama: "",
      alamat1: "",
      alamat2: "",
      id_kelurahan: "",
      no_telp: "",
      id_jenis_kendaraan: "",
      id_merek_kendaraan: "",
      id_type_kendaraan: "",
      id_model_kendaraan: "",
      id_jenis_map: "",
      tahun_buat: "",
      tahun_rakit: "",
      tahun_ub: "",
      cylinder: "",
      id_golongan_kendaraan: "",
      id_warna_tnkb: "",
      warna_kendaraan: "",
      id_lokasi: "",
      dati2_induk: "",
      id_fungsi_kendaraan: "",
      id_bahan_bakar: "",
      no_rangka: "",
      no_mesin: "",
      no_bpkb: "",
      jumlah_sumbu: "",
      kode_jenis: "",
      status_blokir: "",
      progresif: "",
      progresif_tarif: "",
      id_pendaftaran: "",
      id_lokasi_proses: "",
      dati2_proses: "",
      tujuan_mutasi: "",
      tanggal_faktur: "",
      tanggal_kwitansi: "",
      tanggal_akhir_stnk: "",
      tanggal_akhir_stnk_lama: "",
      tanggal_jatuh_tempo: "",
      tanggal_jatuh_tempo_lama: "",
      id_status: "",
      bbn1_pokok: "",
      bbn1_denda: "",
      pkb_pokok: "",
      pkb_denda: "",
      pkb_bunga: "",
      swdkllj_pokok: "",
      swdkllj_denda: "",
      stnk: "",
      no_skpd: "",
      no_kohir: "",
      no_skum: "",
      tanggal_daftar: "",
      tanggal_bayar: "",
      tahun_berlaku: "",
      tanggal_max_bayar_bbn: "",
      tanggal_max_bayar_pkb: "",
      tanggal_max_bayar_swdkllj: "",
      kode_pembayaran: "",
      dpwkp: "",
      ket_dpwkp: "",
      tanggal_jatuh_tempo_dpwkp: "",
      subsidi: "",
      njkb: "",
    };

    // Validasi untuk setiap field yang diperlukan
    if (!kendaraan.id) {
      newErrors.id = "ID harus diisi!";
      isValid = false;
    }
    if (!kendaraan.no_daftar) {
      newErrors.no_daftar = "Nomor daftar harus diisi!";
      isValid = false;
    }
    if (!kendaraan.no_daftar_eri) {
      newErrors.no_daftar_eri = "Nomor daftar ERI harus diisi!";
      isValid = false;
    }
    if (!kendaraan.id_kepemilikan) {
      newErrors.id_kepemilikan = "ID kepemilikan harus diisi!";
      isValid = false;
    }
    if (!kendaraan.no_kk) {
      newErrors.no_kk = "Nomor KK harus diisi!";
      isValid = false;
    }
    if (!kendaraan.no_polisi) {
      newErrors.no_polisi = "Nomor polisi harus diisi!";
      isValid = false;
    }
    if (!kendaraan.nama_pemilik) {
      newErrors.nama_pemilik = "Nama pemilik harus diisi!";
      isValid = false;
    }
    if (!kendaraan.alamat1) {
      newErrors.alamat1 = "Alamat 1 harus diisi!";
      isValid = false;
    }
    if (!kendaraan.id_kelurahan) {
      newErrors.id_kelurahan = "ID kelurahan harus diisi!";
      isValid = false;
    }
    if (!kendaraan.no_telp) {
      newErrors.no_telp = "Nomor telepon harus diisi!";
      isValid = false;
    }
    if (!kendaraan.id_jenis_kendaraan) {
      newErrors.id_jenis_kendaraan = "ID jenis kendaraan harus diisi!";
      isValid = false;
    }
    if (!kendaraan.id_merek_kendaraan) {
      newErrors.id_merek_kendaraan = "ID merek kendaraan harus diisi!";
      isValid = false;
    }
    if (!kendaraan.id_type_kendaraan) {
      newErrors.id_type_kendaraan = "ID tipe kendaraan harus diisi!";
      isValid = false;
    }
    if (!kendaraan.id_model_kendaraan) {
      newErrors.id_model_kendaraan = "ID model kendaraan harus diisi!";
      isValid = false;
    }
    if (!kendaraan.id_jenis_map) {
      newErrors.id_jenis_map = "ID jenis MAP harus diisi!";
      isValid = false;
    }
    if (!kendaraan.tahun_buat) {
      newErrors.tahun_buat = "Tahun pembuatan harus diisi!";
      isValid = false;
    }
    if (!kendaraan.tahun_rakit) {
      newErrors.tahun_rakit = "Tahun perakitan harus diisi!";
      isValid = false;
    }
    if (!kendaraan.tahun_ub) {
      newErrors.tahun_ub = "Tahun UB harus diisi!";
      isValid = false;
    }
    if (!kendaraan.cylinder) {
      newErrors.cylinder = "Cylinder harus diisi!";
      isValid = false;
    }
    if (!kendaraan.id_golongan_kendaraan) {
      newErrors.id_golongan_kendaraan = "ID golongan kendaraan harus diisi!";
      isValid = false;
    }
    if (!kendaraan.id_warna_tnkb) {
      newErrors.id_warna_tnkb = "ID warna TNKB harus diisi!";
      isValid = false;
    }
    if (!kendaraan.warna_kendaraan) {
      newErrors.warna_kendaraan = "Warna kendaraan harus diisi!";
      isValid = false;
    }
    if (!kendaraan.id_lokasi) {
      newErrors.id_lokasi = "ID lokasi harus diisi!";
      isValid = false;
    }
    if (!kendaraan.id_fungsi_kendaraan) {
      newErrors.id_fungsi_kendaraan = "ID fungsi kendaraan harus diisi!";
      isValid = false;
    }
    if (!kendaraan.id_bahan_bakar) {
      newErrors.id_bahan_bakar = "ID bahan bakar harus diisi!";
      isValid = false;
    }
    if (!kendaraan.no_rangka) {
      newErrors.no_rangka = "Nomor rangka harus diisi!";
      isValid = false;
    }
    if (!kendaraan.no_mesin) {
      newErrors.no_mesin = "Nomor mesin harus diisi!";
      isValid = false;
    }
    if (!kendaraan.no_bpkb) {
      newErrors.no_bpkb = "Nomor BPKB harus diisi!";
      isValid = false;
    }
    if (!kendaraan.jumlah_sumbu) {
      newErrors.jumlah_sumbu = "Jumlah sumbu harus diisi!";
      isValid = false;
    }
    if (!kendaraan.kode_jenis) {
      newErrors.kode_jenis = "Kode jenis harus diisi!";
      isValid = false;
    }
    if (!kendaraan.progresif) {
      newErrors.progresif = "Progresif harus diisi!";
      isValid = false;
    }
    if (!kendaraan.progresif_tarif) {
      newErrors.progresif_tarif = "Tarif progresif harus diisi!";
      isValid = false;
    }
    if (!kendaraan.id_pendaftaran) {
      newErrors.id_pendaftaran = "ID pendaftaran harus diisi!";
      isValid = false;
    }
    if (!kendaraan.id_lokasi_proses) {
      newErrors.id_lokasi_proses = "ID lokasi proses harus diisi!";
      isValid = false;
    }
    if (!kendaraan.dati2_induk) {
      newErrors.dati2_induk = "Dati2 induk harus diisi!";
      isValid = false;
    }
    if (!kendaraan.dati2_proses) {
      newErrors.dati2_proses = "Dati2 proses harus diisi!";
      isValid = false;
    }
    if (!kendaraan.tanggal_faktur) {
      newErrors.tanggal_faktur = "Tanggal faktur harus diisi!";
      isValid = false;
    }
    if (!kendaraan.tanggal_kwitansi) {
      newErrors.tanggal_kwitansi = "Tanggal kwitansi harus diisi!";
      isValid = false;
    }
    if (!kendaraan.tanggal_akhir_stnk) {
      newErrors.tanggal_akhir_stnk = "Tanggal akhir STNK harus diisi!";
      isValid = false;
    }
    if (!kendaraan.tanggal_akhir_stnk_lama) {
      newErrors.tanggal_akhir_stnk_lama = "Tanggal akhir STNK lama harus diisi!";
      isValid = false;
    }
    if (!kendaraan.tanggal_jatuh_tempo) {
      newErrors.tanggal_jatuh_tempo = "Tanggal jatuh tempo harus diisi!";
      isValid = false;
    }
    if (!kendaraan.tanggal_jatuh_tempo_lama) {
      newErrors.tanggal_jatuh_tempo_lama = "Tanggal jatuh tempo lama harus diisi!";
      isValid = false;
    }
    if (!kendaraan.id_status) {
      newErrors.id_status = "ID status harus diisi!";
      isValid = false;
    }
    if (!kendaraan.bbn1_pokok) {
      newErrors.bbn1_pokok = "BBN1 pokok harus diisi!";
      isValid = false;
    }
    if (!kendaraan.pkb_pokok) {
      newErrors.pkb_pokok = "PKB pokok harus diisi!";
      isValid = false;
    }
    if (!kendaraan.swdkllj_pokok) {
      newErrors.swdkllj_pokok = "SWDKLLJ pokok harus diisi!";
      isValid = false;
    }
    if (!kendaraan.stnk) {
      newErrors.stnk = "STNK harus diisi!";
      isValid = false;
    }
    if (!kendaraan.no_skpd) {
      newErrors.no_skpd = "Nomor SKPD harus diisi!";
      isValid = false;
    }
    if (!kendaraan.no_kohir) {
      newErrors.no_kohir = "Nomor Kohir harus diisi!";
      isValid = false;
    }
    if (!kendaraan.no_skum) {
      newErrors.no_skum = "Nomor SKUM harus diisi!";
      isValid = false;
    }
    if (!kendaraan.tanggal_daftar) {
      newErrors.tanggal_daftar = "Tanggal daftar harus diisi!";
      isValid = false;
    }
    if (!kendaraan.tanggal_bayar) {
      newErrors.tanggal_bayar = "Tanggal bayar harus diisi!";
      isValid = false;
    }
    if (!kendaraan.tahun_berlaku) {
      newErrors.tahun_berlaku = "Tahun berlaku harus diisi!";
      isValid = false;
    }
    if (!kendaraan.tanggal_max_bayar_bbn) {
      newErrors.tanggal_max_bayar_bbn = "Tanggal maksimal bayar BBN harus diisi!";
      isValid = false;
    }
    if (!kendaraan.tanggal_max_bayar_pkb) {
      newErrors.tanggal_max_bayar_pkb = "Tanggal maksimal bayar PKB harus diisi!";
      isValid = false;
    }
    if (!kendaraan.tanggal_max_bayar_swdkllj) {
      newErrors.tanggal_max_bayar_swdkllj = "Tanggal maksimal bayar SWDKLLJ harus diisi!";
      isValid = false;
    }
    if (!kendaraan.kode_pembayaran) {
      newErrors.kode_pembayaran = "Kode pembayaran harus diisi!";
      isValid = false;
    }
    if (!kendaraan.dpwkp) {
      newErrors.dpwkp = "DPWKP harus diisi!";
      isValid = false;
    }
    if (!kendaraan.ket_dpwkp) {
      newErrors.ket_dpwkp = "Keterangan DPWKP harus diisi!";
      isValid = false;
    }
    if (!kendaraan.tanggal_jatuh_tempo_dpwkp) {
      newErrors.tanggal_jatuh_tempo_dpwkp = "Tanggal jatuh tempo DPWKP harus diisi!";
      isValid = false;
    }
    if (!kendaraan.njkb) {
      newErrors.njkb = "NJKB harus diisi!";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    console.log(kendaraan);
    console.log(validate());
    if (validate()) {
      try {
        const response = await axios.put(
          `http://localhost:3344/api/kendaraan/${params.uid}`,
          kendaraan,
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
          router.push("/dashboard/data/kendaraan");
          toast.success("Data kendaraan berhasil diperbarui!");
        }
      } catch (error) {
        const axiosError = error as AxiosError<any>; // Type assertion
        if (axiosError.response && axiosError.response.data && axiosError.response.data?.message) {
          if (Array.isArray(axiosError.response.data?.message)) {
            axiosError.response.data?.message.forEach((message: string) => {
              toast.error(message);
            });
          }
          console.log(axiosError.response.data?.message);
          toast.error(axiosError.response.data?.message);
        } else {
          console.error("Error updating data kendaraan:", axiosError);
          toast.error("Gagal memperbarui data kendaraan!");
        }
      }
    }
  };

  return (
    <>
      <div className="py-6 px-16 w-full h-full">
        <Card className="h-fit w-full" placeholder={undefined}>
          <CardHeader
            floated={false}
            shadow={false}
            className="rounded-none px-4 mb-4"
            placeholder={undefined}
          >
            <Typography color="blue-gray" variant="h5" placeholder={undefined}>
              Halaman Edit Kendaraan
            </Typography>
          </CardHeader>

          <CardBody className=" px-8 py-0 h-full block overflow-auto" placeholder={undefined}>
            <form className="flex flex-col w-full items-center justify-between gap-4 ">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full h-full ">
                {/* ID */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    ID*:
                  </Typography>
                  <Input
                    disabled
                    value={kendaraan.id}
                    onChange={handleChange}
                    name="id"
                    size="md"
                    placeholder="ID teridiri dari gabungan angka dan huruf"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.id && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.id}
                    </Typography>
                  )}
                </div>

                {/* Id Kepemilikan */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    ID Kepemilikan*:
                  </Typography>
                  <Input
                    value={kendaraan.id_kepemilikan}
                    onChange={handleChange}
                    name="id_kepemilikan"
                    size="md"
                    placeholder="Id Kepemilikan"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.id_kepemilikan && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.id_kepemilikan}
                    </Typography>
                  )}
                </div>

                {/* Id Pendaftaran */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    ID Pendaftaran*:
                  </Typography>
                  <Input
                    value={kendaraan.id_pendaftaran}
                    onChange={handleChange}
                    name="id_pendaftaran"
                    size="md"
                    placeholder="Id Pendaftaran"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.id_pendaftaran && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.id_pendaftaran}
                    </Typography>
                  )}
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full h-full ">
                {/* No Daftar */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    No Daftar*:
                  </Typography>
                  <Input
                    value={kendaraan.no_daftar}
                    onChange={handleChange}
                    name="no_daftar"
                    size="md"
                    placeholder="No Daftar"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.no_daftar && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.no_daftar}
                    </Typography>
                  )}
                </div>

                {/* No Daftar ERI */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    No Daftar ERI*:
                  </Typography>
                  <Input
                    value={kendaraan.no_daftar_eri}
                    onChange={handleChange}
                    name="no_daftar_eri"
                    size="md"
                    placeholder="No Daftar ERI"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.no_daftar_eri && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.no_daftar_eri}
                    </Typography>
                  )}
                </div>

                {/* No KK */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    No KK*:
                  </Typography>
                  <Input
                    value={kendaraan.no_kk}
                    onChange={handleChange}
                    name="no_kk"
                    size="md"
                    placeholder="No KK"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.no_kk && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.no_kk}
                    </Typography>
                  )}
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full h-full ">
                {/* No Polisi */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    No Polisi*:
                  </Typography>
                  <Input
                    value={kendaraan.no_polisi}
                    onChange={handleChange}
                    name="no_polisi"
                    size="md"
                    placeholder="No Polisi"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.no_polisi && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.no_polisi}
                    </Typography>
                  )}
                </div>

                {/* No Polisi Lama */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    No Polisi Lama:
                  </Typography>
                  <Input
                    value={kendaraan.no_polisi_lama}
                    onChange={handleChange}
                    name="no_polisi_lama"
                    size="md"
                    placeholder="No Polisi Lama"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.no_polisi_lama && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.no_polisi_lama}
                    </Typography>
                  )}
                </div>

                {/* No BPKB */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    No BPKB*:
                  </Typography>
                  <Input
                    value={kendaraan.no_bpkb}
                    onChange={handleChange}
                    name="no_bpkb"
                    size="md"
                    placeholder="No BPKB"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.no_bpkb && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.no_bpkb}
                    </Typography>
                  )}
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full h-full ">
                {/* No Rangka */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    No Rangka*:
                  </Typography>
                  <Input
                    value={kendaraan.no_rangka}
                    onChange={handleChange}
                    name="no_rangka"
                    size="md"
                    placeholder="No Rangka"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.no_rangka && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.no_rangka}
                    </Typography>
                  )}
                </div>

                {/* No Mesin */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    No Mesin*:
                  </Typography>
                  <Input
                    value={kendaraan.no_mesin}
                    onChange={handleChange}
                    name="no_mesin"
                    size="md"
                    placeholder="No Mesin"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.no_mesin && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.no_mesin}
                    </Typography>
                  )}
                </div>

                {/* Kode Jenis */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    Kode Jenis*:
                  </Typography>
                  <Input
                    value={kendaraan.kode_jenis}
                    onChange={handleChange}
                    name="kode_jenis"
                    size="md"
                    placeholder="Kode Jenis"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.kode_jenis && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.kode_jenis}
                    </Typography>
                  )}
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full h-full ">
                {/* Nama Pemilik */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    Nama Pemilik*:
                  </Typography>
                  <Input
                    value={kendaraan.nama_pemilik}
                    onChange={handleChange}
                    name="nama_pemilik"
                    size="md"
                    placeholder="Nama Pemilik"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.nama_pemilik && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.nama_pemilik}
                    </Typography>
                  )}
                </div>

                {/* Nama Pemilik Lama */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    Nama Pemilik Lama:
                  </Typography>
                  <Input
                    value={kendaraan.nama_pemilik_lama}
                    onChange={handleChange}
                    name="nama_pemilik_lama"
                    size="md"
                    placeholder="Nama Pemilik Lama"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.nama_pemilik_lama && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.nama_pemilik_lama}
                    </Typography>
                  )}
                </div>

                {/* No Telp */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    No Telp*:
                  </Typography>
                  <Input
                    value={kendaraan.no_telp}
                    onChange={handleChange}
                    name="no_telp"
                    size="md"
                    placeholder="No Telp"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.no_telp && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.no_telp}
                    </Typography>
                  )}
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full h-full ">
                {/* Alamat1 */}
                <div className="flex flex-col gap-1 w-full ">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    Alamat1*:
                  </Typography>
                  <Input
                    value={kendaraan.alamat1}
                    onChange={handleChange}
                    name="alamat1"
                    size="md"
                    placeholder="Alamat1"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900 "
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.alamat1 && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.alamat1}
                    </Typography>
                  )}
                </div>

                {/* Alamat2 */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    Alamat2:
                  </Typography>
                  <Input
                    value={kendaraan.alamat2}
                    onChange={handleChange}
                    name="alamat2"
                    size="md"
                    placeholder="Alamat2"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.alamat2 && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.alamat2}
                    </Typography>
                  )}
                </div>

                {/* Id Kelurahan */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    ID Kelurahan:
                  </Typography>
                  <Input
                    value={kendaraan.id_kelurahan}
                    onChange={handleChange}
                    name="id_kelurahan"
                    size="md"
                    placeholder="Id Kelurahan"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.id_kelurahan && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.id_kelurahan}
                    </Typography>
                  )}
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full h-full ">
                {/* Id Jenis Kendaraan */}
                <div className="flex flex-col gap-1 w-full ">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    ID Jenis Kendaraan*:
                  </Typography>
                  <Select
                    value={jenisKendaraanOptions.find(
                      (option: { value: string; label: string }) =>
                        option.value === kendaraan.id_jenis_kendaraan
                    )}
                    options={jenisKendaraanOptions}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, "id_jenis_kendaraan")
                    }
                    placeholder="Pilih Jenis Kendaraan"
                    isSearchable
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900 "
                    styles={{
                      control: (base, state) => {
                        const borderColor = state.isFocused ? "#1f2937" : base.borderColor;
                        return {
                          ...base,
                          borderColor: borderColor,
                          boxShadow: state.isFocused ? "0 0 0 1px #1f2937" : base.boxShadow,
                          "&:hover": {
                            borderColor: borderColor,
                          },
                        };
                      },
                      menuPortal: (base) => ({ ...base, zIndex: 100 }),
                    }}
                  />
                  {errors.id_jenis_kendaraan && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.id_jenis_kendaraan}
                    </Typography>
                  )}
                </div>

                {/* Id Merek Kendaraan */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    ID Merek Kendaraan*:
                  </Typography>
                  <Select
                    value={merekKendaraanOptions.find(
                      (option: { value: string; label: string }) =>
                        option.value === kendaraan.id_merek_kendaraan
                    )}
                    options={merekKendaraanOptions}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, "id_merek_kendaraan")
                    }
                    placeholder="Pilih Merek Kendaraan"
                    isSearchable
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900"
                    styles={{
                      control: (base, state) => {
                        const borderColor = state.isFocused ? "#1f2937" : base.borderColor;
                        return {
                          ...base,
                          borderColor: borderColor,
                          boxShadow: state.isFocused ? "0 0 0 1px #1f2937" : base.boxShadow,
                          "&:hover": {
                            borderColor: borderColor,
                          },
                        };
                      },
                      menuPortal: (base) => ({ ...base, zIndex: 100 }),
                    }}
                  />
                  {errors.id_merek_kendaraan && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.id_merek_kendaraan}
                    </Typography>
                  )}
                </div>

                {/* Id Type Kendaraan */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    ID Type Kendaraan*:
                  </Typography>
                  <Select
                    value={typeKendaraanOptions.find(
                      (option: { value: string; label: string }) =>
                        option.value === kendaraan.id_type_kendaraan
                    )}
                    options={typeKendaraanOptions}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, "id_type_kendaraan")
                    }
                    placeholder="Pilih Type Kendaraan"
                    isSearchable
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900"
                    styles={{
                      control: (base, state) => {
                        const borderColor = state.isFocused ? "#1f2937" : base.borderColor;
                        return {
                          ...base,
                          borderColor: borderColor,
                          boxShadow: state.isFocused ? "0 0 0 1px #1f2937" : base.boxShadow,
                          "&:hover": {
                            borderColor: borderColor,
                          },
                        };
                      },
                      menuPortal: (base) => ({ ...base, zIndex: 100 }),
                    }}
                  />
                  {errors.id_type_kendaraan && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.id_type_kendaraan}
                    </Typography>
                  )}
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full h-full ">
                {/* Id Model Kendaraan */}
                <div className="flex flex-col gap-1 w-full ">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    ID Model Kendaraan*:
                  </Typography>
                  <Input
                    value={kendaraan.id_model_kendaraan}
                    onChange={handleChange}
                    name="id_model_kendaraan"
                    size="md"
                    placeholder="Id Model Kendaraan"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900 "
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.id_model_kendaraan && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.id_model_kendaraan}
                    </Typography>
                  )}
                </div>

                {/* Tahun Buat */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    Tahun Pembuatan*:
                  </Typography>
                  <Input
                    value={kendaraan.tahun_buat}
                    onChange={handleChange}
                    name="tahun_buat"
                    size="md"
                    placeholder="Tahun Buat"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900 "
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.tahun_buat && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.tahun_buat}
                    </Typography>
                  )}
                </div>

                {/* Tahun Rakit */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    Tahun Perakitan*:
                  </Typography>
                  <Input
                    value={kendaraan.tahun_rakit}
                    onChange={handleChange}
                    name="tahun_rakit"
                    size="md"
                    placeholder="Tahun Rakit"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900 "
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.tahun_rakit && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.tahun_rakit}
                    </Typography>
                  )}
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full h-full ">
                {/* Tahun UB */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    Tahun UB*:
                  </Typography>
                  <Input
                    value={kendaraan.tahun_ub}
                    onChange={handleChange}
                    name="tahun_ub"
                    size="md"
                    placeholder="Tahun UB"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900 "
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.tahun_ub && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.tahun_ub}
                    </Typography>
                  )}
                </div>

                {/* Cylinder */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    Cylinder*:
                  </Typography>
                  <Input
                    value={kendaraan.cylinder}
                    onChange={handleChange}
                    name="cylinder"
                    size="md"
                    placeholder="Cylinder"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900 "
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.cylinder && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.cylinder}
                    </Typography>
                  )}
                </div>

                {/* Warna Kendaraan */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    Warna Kendaraan*:
                  </Typography>
                  <Input
                    value={kendaraan.warna_kendaraan}
                    onChange={handleChange}
                    name="warna_kendaraan"
                    size="md"
                    placeholder="Warna Kendaraan"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900 "
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.warna_kendaraan && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.warna_kendaraan}
                    </Typography>
                  )}
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full h-full ">
                {/* Jumlah Sumbu */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    Jumlah Sumbu*:
                  </Typography>
                  <Input
                    value={kendaraan.jumlah_sumbu}
                    onChange={handleChange}
                    name="jumlah_sumbu"
                    size="md"
                    placeholder="Jumlah Sumbu"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900 "
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.jumlah_sumbu && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.jumlah_sumbu}
                    </Typography>
                  )}
                </div>

                {/* Id Golongan Kendaraan */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    ID Golongan Kendaraan*:
                  </Typography>
                  <Input
                    value={kendaraan.id_golongan_kendaraan}
                    onChange={handleChange}
                    name="id_golongan_kendaraan"
                    size="md"
                    placeholder="Id Golongan Kendaraan"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.id_golongan_kendaraan && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.id_golongan_kendaraan}
                    </Typography>
                  )}
                </div>

                {/* Id Warna TNKB */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    ID Warna TNKB*:
                  </Typography>
                  <Input
                    value={kendaraan.id_warna_tnkb}
                    onChange={handleChange}
                    name="id_warna_tnkb"
                    size="md"
                    placeholder="Id Warna TNKB"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.id_warna_tnkb && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.id_warna_tnkb}
                    </Typography>
                  )}
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full h-full ">
                {/* Id Fungsi Kendaraan */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    ID Fungsi Kendaraan*:
                  </Typography>
                  <Input
                    value={kendaraan.id_fungsi_kendaraan}
                    onChange={handleChange}
                    name="id_fungsi_kendaraan"
                    size="md"
                    placeholder="Id Fungsi Kendaraan"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.id_fungsi_kendaraan && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.id_fungsi_kendaraan}
                    </Typography>
                  )}
                </div>

                {/* Id Bahan Bakar */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    ID Bahan Bakar*:
                  </Typography>
                  <Input
                    value={kendaraan.id_bahan_bakar}
                    onChange={handleChange}
                    name="id_bahan_bakar"
                    size="md"
                    placeholder="Id Bahan Bakar"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.id_bahan_bakar && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.id_bahan_bakar}
                    </Typography>
                  )}
                </div>

                {/* Status Blokir */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    Status Blokir:
                  </Typography>
                  <Checkbox
                    checked={kendaraan.status_blokir}
                    onChange={handleCheckboxChange}
                    name="status_blokir"
                    color="green"
                    label="Terblokir"
                    crossOrigin={undefined}
                  />
                  {errors.status_blokir && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.status_blokir}
                    </Typography>
                  )}
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full h-full ">
                {/* Id Lokasi */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    ID Lokasi*:
                  </Typography>
                  <Input
                    value={kendaraan.id_lokasi}
                    onChange={handleChange}
                    name="id_lokasi"
                    size="md"
                    placeholder="Id Lokasi"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.id_lokasi && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.id_lokasi}
                    </Typography>
                  )}
                </div>

                {/* Dati2 Induk */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    Dati2 Induk*:
                  </Typography>
                  <Input
                    value={kendaraan.dati2_induk}
                    onChange={handleChange}
                    name="dati2_induk"
                    size="md"
                    placeholder="Dati2 Induk"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.dati2_induk && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.dati2_induk}
                    </Typography>
                  )}
                </div>

                {/* Subsidi */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    Subsidi:
                  </Typography>
                  <Checkbox
                    checked={kendaraan.subsidi}
                    onChange={handleCheckboxChange}
                    name="subsidi"
                    color="green"
                    label="Mendapat Subsidi"
                    crossOrigin={undefined}
                  />
                  {errors.subsidi && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.subsidi}
                    </Typography>
                  )}
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full h-full ">
                {/* Id Jenis Map */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    ID Jenis Map*:
                  </Typography>
                  <Input
                    value={kendaraan.id_jenis_map}
                    onChange={handleChange}
                    name="id_jenis_map"
                    size="md"
                    placeholder="Id Jenis Map"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900 "
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.id_jenis_map && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.id_jenis_map}
                    </Typography>
                  )}
                </div>

                {/* Id Lokasi Proses */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    ID Lokasi Proses*:
                  </Typography>
                  <Input
                    value={kendaraan.id_lokasi_proses}
                    onChange={handleChange}
                    name="id_lokasi_proses"
                    size="md"
                    placeholder="Id Lokasi Proses"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.id_lokasi_proses && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.id_lokasi_proses}
                    </Typography>
                  )}
                </div>

                {/* Dati2 Proses */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    Dati2 Proses*:
                  </Typography>
                  <Input
                    value={kendaraan.dati2_proses}
                    onChange={handleChange}
                    name="dati2_proses"
                    size="md"
                    placeholder="Dati2 Proses"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.dati2_proses && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.dati2_proses}
                    </Typography>
                  )}
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full h-full ">
                {/* Tujuan Mutasi */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    Tujuan Mutasi:
                  </Typography>
                  <Input
                    value={kendaraan.tujuan_mutasi}
                    onChange={handleChange}
                    name="tujuan_mutasi"
                    size="md"
                    placeholder="Tujuan Mutasi"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900 "
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.tujuan_mutasi && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.tujuan_mutasi}
                    </Typography>
                  )}
                </div>

                {/* BBN 1 POKOK */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    BBN 1 Pokok*:
                  </Typography>
                  <Input
                    value={kendaraan.bbn1_pokok}
                    onChange={handleChange}
                    name="bbn1_pokok"
                    size="md"
                    placeholder="BBN 1 Pokok"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.bbn1_pokok && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.bbn1_pokok}
                    </Typography>
                  )}
                </div>

                {/* BBN 1 Denda */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    BBN 1 Denda:
                  </Typography>
                  <Input
                    value={kendaraan.bbn1_denda}
                    onChange={handleChange}
                    name="bbn1_denda"
                    size="md"
                    placeholder="BBN 1 Denda"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.bbn1_denda && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.bbn1_denda}
                    </Typography>
                  )}
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full h-full ">
                {/* PKB Pokok */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    PKB Pokok*:
                  </Typography>
                  <Input
                    value={kendaraan.pkb_pokok}
                    onChange={handleChange}
                    name="pkb_pokok"
                    size="md"
                    placeholder="PKB Pokok"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900 "
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.pkb_pokok && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.pkb_pokok}
                    </Typography>
                  )}
                </div>

                {/* PKB Denda */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    PKB Denda:
                  </Typography>
                  <Input
                    value={kendaraan.pkb_denda}
                    onChange={handleChange}
                    name="pkb_denda"
                    size="md"
                    placeholder="PKB Denda"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.pkb_denda && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.pkb_denda}
                    </Typography>
                  )}
                </div>

                {/* PKB Bunga */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    PKB Bunga:
                  </Typography>
                  <Input
                    value={kendaraan.pkb_bunga}
                    onChange={handleChange}
                    name="pkb_bunga"
                    size="md"
                    placeholder="PKB Bunga"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.pkb_bunga && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.pkb_bunga}
                    </Typography>
                  )}
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full h-full ">
                {/* SWDKLLJ Pokok */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    SWDKLLJ Pokok*:
                  </Typography>
                  <Input
                    value={kendaraan.swdkllj_pokok}
                    onChange={handleChange}
                    name="swdkllj_pokok"
                    size="md"
                    placeholder="SWDKLLJ Pokok"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900 "
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.swdkllj_pokok && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.swdkllj_pokok}
                    </Typography>
                  )}
                </div>

                {/* SWDKLLJ Denda */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    SWDKLLJ Denda:
                  </Typography>
                  <Input
                    value={kendaraan.swdkllj_denda}
                    onChange={handleChange}
                    name="swdkllj_denda"
                    size="md"
                    placeholder="SWDKLLJ Denda"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.swdkllj_denda && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.swdkllj_denda}
                    </Typography>
                  )}
                </div>

                {/* STNK */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    STNK*:
                  </Typography>
                  <Input
                    value={kendaraan.stnk}
                    onChange={handleChange}
                    name="stnk"
                    size="md"
                    placeholder="STNK"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.stnk && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.stnk}
                    </Typography>
                  )}
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full h-full ">
                {/* Nomor SKPD */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    Nomor SKPD*:
                  </Typography>
                  <Input
                    value={kendaraan.no_skpd}
                    onChange={handleChange}
                    name="no_skpd"
                    size="md"
                    placeholder="Nomor SKPD"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900 "
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.no_skpd && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.no_skpd}
                    </Typography>
                  )}
                </div>

                {/* Nomor Kohir */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    Nomor Kohir*:
                  </Typography>
                  <Input
                    value={kendaraan.no_kohir}
                    onChange={handleChange}
                    name="no_kohir"
                    size="md"
                    placeholder="Nomor Kohir"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.no_kohir && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.no_kohir}
                    </Typography>
                  )}
                </div>

                {/* Nomor SKUM */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    Nomor SKUM*:
                  </Typography>
                  <Input
                    value={kendaraan.no_skum}
                    onChange={handleChange}
                    name="no_skum"
                    size="md"
                    placeholder="Nomor SKUM"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.no_skum && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.no_skum}
                    </Typography>
                  )}
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full h-full ">
                {/* Progresif */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    Progresif:
                  </Typography>
                  <Input
                    value={kendaraan.progresif}
                    onChange={handleChange}
                    name="progresif"
                    size="md"
                    placeholder="Progresif"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900 "
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.progresif && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.progresif}
                    </Typography>
                  )}
                </div>

                {/* Tarif Progresif */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    Tarif Progresif:
                  </Typography>
                  <Input
                    value={kendaraan.progresif_tarif}
                    onChange={handleChange}
                    name="progresif_tarif"
                    size="md"
                    placeholder="Tarif Progresif"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.progresif_tarif && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.progresif_tarif}
                    </Typography>
                  )}
                </div>

                {/* NJKB */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    NJKB*:
                  </Typography>
                  <Input
                    value={kendaraan.njkb}
                    onChange={handleChange}
                    name="njkb"
                    size="md"
                    placeholder="NJKB"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.njkb && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.njkb}
                    </Typography>
                  )}
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full h-full ">
                {/* Kode Pembayaran */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    Kode Pembayaran*:
                  </Typography>
                  <Input
                    value={kendaraan.kode_pembayaran}
                    onChange={handleChange}
                    name="kode_pembayaran"
                    size="md"
                    placeholder="Kode Pembayaran"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900 "
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.kode_pembayaran && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.kode_pembayaran}
                    </Typography>
                  )}
                </div>

                {/* DPWKP */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    DPWKP:
                  </Typography>
                  <Input
                    value={kendaraan.dpwkp}
                    onChange={handleChange}
                    name="dpwkp"
                    size="md"
                    placeholder="DPWKP"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.dpwkp && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.dpwkp}
                    </Typography>
                  )}
                </div>

                {/* Keterangan DPWKP */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    Keterangan DPWKP:
                  </Typography>
                  <Input
                    value={kendaraan.ket_dpwkp}
                    onChange={handleChange}
                    name="ket_dpwkp"
                    size="md"
                    placeholder="Keterangan DPWKP"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.ket_dpwkp && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.ket_dpwkp}
                    </Typography>
                  )}
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full h-full ">
                {/* Id Status */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    ID Status*:
                  </Typography>
                  <Input
                    value={kendaraan.id_status}
                    onChange={handleChange}
                    name="id_status"
                    size="md"
                    placeholder="Id Status"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.id_status && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.id_status}
                    </Typography>
                  )}
                </div>

                {/* Tahun Berlaku */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    Tahun Berlaku*:
                  </Typography>
                  <Input
                    value={kendaraan.tahun_berlaku}
                    onChange={handleChange}
                    name="tahun_berlaku"
                    size="md"
                    placeholder="Tahun Berlaku"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900 "
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.tahun_berlaku && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.tahun_berlaku}
                    </Typography>
                  )}
                </div>

                <div className="flex flex-col gap-1 w-full"></div>
              </div>

              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full h-full ">
                {/* Tanggal Faktur */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    Tanggal Faktur*:
                  </Typography>
                  <DatePicker
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900 "
                    value={dayjs(kendaraan.tanggal_faktur, "DD/MM/YYYY")}
                    onChange={(newValue) => handleDateChange(newValue, "tanggal_faktur")}
                  />
                  {errors.tanggal_faktur && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.tanggal_faktur}
                    </Typography>
                  )}
                </div>

                {/* Tanggal Kwitansi */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    Tanggal Kwitansi*:
                  </Typography>
                  <DatePicker
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900 "
                    value={dayjs(kendaraan.tanggal_kwitansi, "DD/MM/YYYY")}
                    onChange={(newValue) => handleDateChange(newValue, "tanggal_kwitansi")}
                  />
                  {errors.tanggal_kwitansi && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.tanggal_kwitansi}
                    </Typography>
                  )}
                </div>

                {/* Tanggal Akhir STNK */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    Tanggal Akhir STNK*:
                  </Typography>
                  <DatePicker
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900 "
                    value={dayjs(kendaraan.tanggal_akhir_stnk, "DD/MM/YYYY")}
                    onChange={(newValue) => handleDateChange(newValue, "tanggal_akhir_stnk")}
                  />
                  {errors.tanggal_akhir_stnk && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.tanggal_akhir_stnk}
                    </Typography>
                  )}
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full h-full ">
                {/* Tanggal Akhir STNK Lama */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    Tanggal Akhir STNK Lama*:
                  </Typography>
                  <DatePicker
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900 "
                    value={dayjs(kendaraan.tanggal_akhir_stnk_lama, "DD/MM/YYYY")}
                    onChange={(newValue) => handleDateChange(newValue, "tanggal_akhir_stnk_lama")}
                  />
                  {errors.tanggal_akhir_stnk_lama && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.tanggal_akhir_stnk_lama}
                    </Typography>
                  )}
                </div>

                {/* Tanggal Jatuh Tempo */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    Tanggal Jatuh Tempo*:
                  </Typography>
                  <DatePicker
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900 "
                    value={dayjs(kendaraan.tanggal_jatuh_tempo, "DD/MM/YYYY")}
                    onChange={(newValue) => handleDateChange(newValue, "tanggal_jatuh_tempo")}
                  />
                  {errors.tanggal_jatuh_tempo && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.tanggal_jatuh_tempo}
                    </Typography>
                  )}
                </div>

                {/* Tanggal Jatuh Tempo Lama */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    Tanggal Jatuh Tempo Lama*:
                  </Typography>
                  <DatePicker
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900 "
                    value={dayjs(kendaraan.tanggal_jatuh_tempo_lama, "DD/MM/YYYY")}
                    onChange={(newValue) => handleDateChange(newValue, "tanggal_jatuh_tempo_lama")}
                  />
                  {errors.tanggal_jatuh_tempo_lama && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.tanggal_jatuh_tempo_lama}
                    </Typography>
                  )}
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full h-full ">
                {/* Tanggal Daftar */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    Tanggal Daftar*:
                  </Typography>
                  <DatePicker
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900 "
                    value={dayjs(kendaraan.tanggal_daftar, "DD/MM/YYYY")}
                    onChange={(newValue) => handleDateChange(newValue, "tanggal_daftar")}
                  />
                  {errors.tanggal_daftar && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.tanggal_daftar}
                    </Typography>
                  )}
                </div>

                {/* Tanggal Bayar */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    Tanggal Bayar*:
                  </Typography>
                  <DatePicker
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900 "
                    value={dayjs(kendaraan.tanggal_bayar, "DD/MM/YYYY")}
                    onChange={(newValue) => handleDateChange(newValue, "tanggal_bayar")}
                  />
                  {errors.tanggal_bayar && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.tanggal_bayar}
                    </Typography>
                  )}
                </div>

                {/* Tanggal Jatuh Tempo DPWKP */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    Tanggal Jatuh Tempo DPWKP:
                  </Typography>
                  <DatePicker
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900 "
                    value={dayjs(kendaraan.tanggal_jatuh_tempo_dpwkp, "DD/MM/YYYY")}
                    onChange={(newValue) => handleDateChange(newValue, "tanggal_jatuh_tempo_dpwkp")}
                  />
                  {errors.tanggal_jatuh_tempo_dpwkp && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.tanggal_jatuh_tempo_dpwkp}
                    </Typography>
                  )}
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full h-full ">
                {/* Tanggal Maks Bayar PKB */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    Tanggal Maks Bayar PKB*:
                  </Typography>
                  <DatePicker
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900 "
                    value={dayjs(kendaraan.tanggal_max_bayar_pkb, "DD/MM/YYYY")}
                    onChange={(newValue) => handleDateChange(newValue, "tanggal_max_bayar_pkb")}
                  />
                  {errors.tanggal_max_bayar_pkb && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.tanggal_max_bayar_pkb}
                    </Typography>
                  )}
                </div>

                {/* Tanggal Maks Bayar SWDKLLJ */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    Tanggal Maks Bayar SWDKLLJ*:
                  </Typography>
                  <DatePicker
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900 "
                    value={dayjs(kendaraan.tanggal_max_bayar_swdkllj, "DD/MM/YYYY")}
                    onChange={(newValue) => handleDateChange(newValue, "tanggal_max_bayar_swdkllj")}
                  />
                  {errors.tanggal_max_bayar_swdkllj && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.tanggal_max_bayar_swdkllj}
                    </Typography>
                  )}
                </div>

                {/* Tanggal Maks Bayar BBN */}
                <div className="flex flex-col gap-1 w-full">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    Tanggal Maks Bayar BBN*:
                  </Typography>
                  <DatePicker
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900 "
                    value={dayjs(kendaraan.tanggal_max_bayar_bbn, "DD/MM/YYYY")}
                    onChange={(newValue) => handleDateChange(newValue, "tanggal_max_bayar_bbn")}
                  />
                  {errors.tanggal_max_bayar_bbn && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.tanggal_max_bayar_bbn}
                    </Typography>
                  )}
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
                Batal
              </Button>
              <Button
                className="!bg-primary-500 min-w-24"
                onClick={handleSubmit}
                placeholder={undefined}
              >
                Simpan
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default EditKendaraanPage;
