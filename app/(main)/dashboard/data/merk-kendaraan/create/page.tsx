"use client";
import React, { useState, useEffect, useRef } from "react";
import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import Select from "react-select";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const CreateMerkKendaraanPage = () => {
  const router = useRouter();
  const [merekKendaraan, setMerekKendaraan] = useState({
    id: "",
    nama_merek: "",
    kode_negara_asal: "",
  });
  const [errors, setErrors] = useState({
    id: "",
    nama_merek: "",
    kode_negara_asal: "",
  });
  const [db_kode_negara_asal, setDbKodeNegaraAsal] = useState([]);
  const isFetched = useRef(false);
  const cookies = parseCookies();
  const token = `Bearer ${cookies.access_token}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3344/api/negara-asal", {
          headers: {
            Authorization: token,
          },
        });
        setDbKodeNegaraAsal(
          response.data.data.map((negara: any) => ({
            value: negara.kode_negara,
            label: negara.nama_negara,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Terjadi kesalahan saat memuat data kode negara asal");
      }
    };

    if (!isFetched.current) {
      fetchData();
      isFetched.current = true;
    }
  }, [token]);

  const handleChangeSelect = (selectedOption: any) => {
    setMerekKendaraan({
      ...merekKendaraan,
      kode_negara_asal: selectedOption.value,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue = value;

    // Ubah input menjadi huruf kapital untuk field tertentu
    if (["kode_negara_asal"].includes(name)) newValue = value.toUpperCase();

    setMerekKendaraan({
      ...merekKendaraan,
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
      nama_merek: "",
      kode_negara_asal: "",
    };

    if (!merekKendaraan.id) {
      newErrors.id = "ID harus diisi!";
      isValid = false;
    } else if (!/^\d{3}$/.test(merekKendaraan.id)) {
      newErrors.id = "ID harus berupa 3 angka bulat!";
      isValid = false;
    }
    if (!merekKendaraan.nama_merek) {
      newErrors.nama_merek = "Nama merek kendaraan harus diisi!";
      isValid = false;
    }
    if (!merekKendaraan.kode_negara_asal) {
      newErrors.kode_negara_asal = "Kode negara asal harus diisi!";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validate()) {
      console.log(merekKendaraan.kode_negara_asal);
      try {
        const response = await axios.post(
          "http://localhost:3344/api/merek-kendaraan",
          merekKendaraan,
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
          router.push("/dashboard/data/merk-kendaraan");
          toast.success(`Berhasil menambahkan data merek kendaraan ${merekKendaraan.nama_merek}!`);
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
          console.error("Error adding data merek kendaraan:", axiosError);
          toast.error("Terjadi kesalahan saat menambahkan data merek kendaraan");
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
              Halaman Tambah Merek Kendaraan
            </Typography>
          </CardHeader>

          <CardBody
            className="overflow-auto px-8 py-0 h-full block relative"
            placeholder={undefined}
          >
            <div className="flex flex-row items-center gap-4 justify-between">
              <div className="w-full flex flex-col gap-1">
                <Typography color="black" variant="paragraph" placeholder={undefined}>
                  ID*:
                </Typography>
                <Input
                  value={merekKendaraan.id}
                  onChange={handleChange}
                  name="id"
                  size="md"
                  placeholder="ID terdiri dari 3 angka"
                  className="w-full !border-t-blue-gray-200 focus:!border-t-gray-900"
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

              <div className="w-full flex flex-col gap-1">
                <Typography color="black" variant="paragraph" placeholder={undefined}>
                  Nama Merek Kendaraan*:
                </Typography>
                <Input
                  value={merekKendaraan.nama_merek}
                  onChange={handleChange}
                  name="nama_merek"
                  size="md"
                  placeholder="Nama Merek Kendaraan"
                  className="w-full !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  crossOrigin={undefined}
                />
                {errors.nama_merek && (
                  <Typography
                    className="!text-overline pl-2 text-danger-400"
                    placeholder={undefined}
                  >
                    {errors.nama_merek}
                  </Typography>
                )}
              </div>

              <div className="w-full flex flex-col gap-1">
                <Typography color="black" variant="paragraph" placeholder={undefined}>
                  Kode Negara Asal*:
                </Typography>
                <Select
                  options={db_kode_negara_asal}
                  onChange={handleChangeSelect}
                  placeholder="Pilih Kode Negara Asal"
                  isSearchable
                  menuPortalTarget={typeof document !== "undefined" ? document.body : null}
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 100 }),
                  }}
                />
                {errors.kode_negara_asal && (
                  <Typography
                    className="!text-overline pl-2 text-danger-400"
                    placeholder={undefined}
                  >
                    {errors.kode_negara_asal}
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

export default CreateMerkKendaraanPage;
