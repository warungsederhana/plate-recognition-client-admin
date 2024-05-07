"use client";
import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const CreateJenisKendaraanPage = () => {
  const router = useRouter();
  const [jenisKendaraan, setJenisKendaraan] = useState({
    id: "",
    nama_jenis_kendaraan: "",
    kode_jenis_kendaraan: "",
    jumlah_sumbu: "",
    id_jenis_mapping: "",
    id_model_kendaraan: "",
    kategori_jenis: "",
  });
  const [errors, setErrors] = useState({
    id: "",
    nama_jenis_kendaraan: "",
    kode_jenis_kendaraan: "",
    jumlah_sumbu: "",
    id_jenis_mapping: "",
    id_model_kendaraan: "",
    kategori_jenis: "",
  });
  const token = localStorage.getItem("access_token");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue = value;

    // Ubah input menjadi huruf kapital untuk field tertentu
    if (
      [
        "id",
        "id_jenis_mapping",
        "id_model_kendaraan",
        "kategori_jenis",
        "kode_jenis_kendaraan",
      ].includes(name)
    ) {
      newValue = value.toUpperCase();
    }

    setJenisKendaraan({
      ...jenisKendaraan,
      [name]: newValue,
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
      nama_jenis_kendaraan: "",
      kode_jenis_kendaraan: "",
      jumlah_sumbu: "",
      id_jenis_mapping: "",
      id_model_kendaraan: "",
      kategori_jenis: "",
    };

    if (!jenisKendaraan.id) {
      newErrors.id = "ID harus diisi!";
      isValid = false;
    } else if (!/^\d{3}$/.test(jenisKendaraan.id)) {
      newErrors.id = "ID harus berupa 3 angka bulat!";
      isValid = false;
    }

    if (!jenisKendaraan.nama_jenis_kendaraan) {
      newErrors.nama_jenis_kendaraan = "Nama jenis kendaraan harus diisi!";
      isValid = false;
    }
    if (!jenisKendaraan.kode_jenis_kendaraan) {
      newErrors.kode_jenis_kendaraan = "Kode jenis kendaraan harus diisi!";
      isValid = false;
    }
    if (!jenisKendaraan.jumlah_sumbu) {
      newErrors.jumlah_sumbu = "Jumlah sumbu harus diisi!";
      isValid = false;
    } else if (!/^\d+$/.test(jenisKendaraan.jumlah_sumbu)) {
      newErrors.jumlah_sumbu = "Jumlah sumbu harus berupa angka!";
      isValid = false;
    }
    if (jenisKendaraan.id_jenis_mapping) {
      if (!/^\d+$/.test(jenisKendaraan.id_jenis_mapping)) {
        newErrors.id_jenis_mapping = "ID Jenis Mapping harus berupa angka bulat!";
        isValid = false;
      } else if (jenisKendaraan.id_jenis_mapping.length < 3) {
        newErrors.id_jenis_mapping = "ID Jenis Mapping minimal 3 digit!";
        isValid = false;
      }
    }
    if (jenisKendaraan.id_model_kendaraan) {
      if (!/^\d+$/.test(jenisKendaraan.id_model_kendaraan)) {
        newErrors.id_model_kendaraan = "ID Model Kendaraan harus berupa angka bulat!";
        isValid = false;
      } else if (jenisKendaraan.id_model_kendaraan.length < 3) {
        newErrors.id_model_kendaraan = "ID Model Kendaraan minimal 3 digit!";
        isValid = false;
      }
    }
    if (jenisKendaraan.kategori_jenis && !/^[a-zA-Z ]+$/.test(jenisKendaraan.kategori_jenis)) {
      newErrors.kategori_jenis = "Kategori Jenis harus berupa huruf dan boleh mengandung spasi!";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validate()) {
      try {
        const response = await axios.post(
          "http://localhost:3344/api/jenis-kendaraan",
          jenisKendaraan,
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
          router.push("/dashboard/data/jenis-kendaraan");
          toast.success("Berhasil menambahkan data jenis kendaraan!");
        }

        console.log(response);
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
          console.error("Error adding data jenis kendaraan:", axiosError);
          toast.error("Terjadi kesalahan saat menambahkan data jenis kendaraan");
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
              Halaman Tambah Jenis Kendaraan
            </Typography>
          </CardHeader>

          <CardBody className="overflow-auto px-8 py-0 h-full block" placeholder={undefined}>
            <div className="flex flex-col items-center gap-4 ">
              <div className="w-full flex flex-col lg:flex-row justify-between gap-4">
                <div className="w-full flex flex-col gap-1">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    Nama Jenis Kendaraan*:
                  </Typography>
                  <Input
                    value={jenisKendaraan.nama_jenis_kendaraan}
                    onChange={handleChange}
                    name="nama_jenis_kendaraan"
                    size="md"
                    placeholder="Nama Jenis Kendaraan"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.nama_jenis_kendaraan && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.nama_jenis_kendaraan}
                    </Typography>
                  )}
                </div>

                <div className="w-full flex flex-col gap-1">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    Jumlah Sumbu*:
                  </Typography>
                  <Input
                    value={jenisKendaraan.jumlah_sumbu}
                    onChange={handleChange}
                    name="jumlah_sumbu"
                    size="md"
                    placeholder="Jumlah sumbu berupa angka bilangan bulat!"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900"
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
              </div>

              <div className="w-full flex flex-col lg:flex-row justify-between gap-4">
                <div className="w-full flex flex-col gap-1">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    Kode Jenis Kendaraan*:
                  </Typography>
                  <Input
                    value={jenisKendaraan.kode_jenis_kendaraan}
                    onChange={handleChange}
                    name="kode_jenis_kendaraan"
                    size="md"
                    placeholder="Kode Jenis Kendaraan"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.kode_jenis_kendaraan && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.kode_jenis_kendaraan}
                    </Typography>
                  )}
                </div>

                <div className="w-full flex flex-col gap-1">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    ID*:
                  </Typography>
                  <Input
                    value={jenisKendaraan.id}
                    onChange={handleChange}
                    name="id"
                    size="md"
                    placeholder="ID terdiri dari 3 digit angka bilangan bulat!"
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
              </div>

              <div className="w-full flex flex-col lg:flex-row justify-between gap-4">
                <div className="w-full flex flex-col gap-1">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    ID Jenis Mapping:
                  </Typography>
                  <Input
                    value={jenisKendaraan.id_jenis_mapping}
                    onChange={handleChange}
                    name="id_jenis_mapping"
                    size="md"
                    placeholder="ID jenis mapping terdiri dari 3 digit angka bilangan bulat!"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.id_jenis_mapping && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.id_jenis_mapping}
                    </Typography>
                  )}
                </div>

                <div className="w-full flex flex-col gap-1">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    ID Model Kendaraan:
                  </Typography>
                  <Input
                    value={jenisKendaraan.id_model_kendaraan}
                    onChange={handleChange}
                    name="id_model_kendaraan"
                    size="md"
                    placeholder="ID model kendaraan terdiri dari 3 digit angka bilangan bulat!"
                    className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900"
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
              </div>

              <div className="w-full flex flex-col gap-1">
                <Typography color="black" variant="paragraph" placeholder={undefined}>
                  Kategori Jenis:
                </Typography>
                <Input
                  value={jenisKendaraan.kategori_jenis}
                  onChange={handleChange}
                  name="kategori_jenis"
                  size="md"
                  placeholder="Kategori Jenis"
                  className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  crossOrigin={undefined}
                />
                {errors.kategori_jenis && (
                  <Typography
                    className="!text-overline pl-2 text-danger-400"
                    placeholder={undefined}
                  >
                    {errors.kategori_jenis}
                  </Typography>
                )}
              </div>
            </div>
          </CardBody>

          <CardFooter placeholder={undefined}>
            <div className="flex justify-end gap-4">
              <Button
                className="bg-gradient-to-tr from-primary-500 to-primary-400"
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

export default CreateJenisKendaraanPage;
