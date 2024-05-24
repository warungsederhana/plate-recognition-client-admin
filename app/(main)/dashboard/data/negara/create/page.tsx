"use client";
import React, { useState } from "react";
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
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const CreateNegaraPage = () => {
  const router = useRouter();
  const [negara, setNegara] = useState({
    id: "",
    nama_negara: "",
    kode_negara: "",
  });
  const [errors, setErrors] = useState({
    id: "",
    nama_negara: "",
    kode_negara: "",
  });
  const cookies = parseCookies();
  const token = `Bearer ${cookies.access_token}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue = value;

    // Ubah input menjadi huruf kapital untuk field tertentu
    if (["kode_negara"].includes(name)) newValue = value.toUpperCase();

    setNegara({
      ...negara,
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
      nama_negara: "",
      kode_negara: "",
    };

    if (!negara.id) {
      newErrors.id = "ID harus diisi!";
      isValid = false;
    } else if (!/^\d+$/.test(negara.id)) {
      newErrors.id = "ID harus berupa angka bulat!";
      isValid = false;
    }

    if (!negara.nama_negara) {
      newErrors.nama_negara = "Nama negara harus diisi!";
      isValid = false;
    }
    if (!negara.kode_negara) {
      newErrors.kode_negara = "Kode negara harus diisi!";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validate()) {
      try {
        const response = await axios.post("http://localhost:3344/api/negara-asal", negara, {
          headers: {
            Authorization: token,
          },
        });

        if (
          response.status === 201 ||
          response.statusText === "Created" ||
          response.status === 200 ||
          response.statusText === "OK"
        ) {
          router.push("/dashboard/data/negara");
          toast.success("Berhasil menambahkan data negara!");
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
          console.error("Error adding data negara:", axiosError);
          toast.error("Terjadi kesalahan saat menambahkan data negara");
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
              Halaman Tambah Negara
            </Typography>
          </CardHeader>

          <CardBody className="overflow-auto px-8 py-0 h-full block" placeholder={undefined}>
            <form className="flex flex-col lg:flex-row items-center gap-4">
              <div className="flex flex-col gap-1">
                <Typography color="black" variant="paragraph" placeholder={undefined}>
                  ID*:
                </Typography>
                <Input
                  value={negara.id}
                  onChange={handleChange}
                  name="id"
                  size="md"
                  placeholder="ID"
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

              <div className="flex flex-col gap-1">
                <Typography color="black" variant="paragraph" placeholder={undefined}>
                  Nama Negara*:
                </Typography>
                <Input
                  value={negara.nama_negara}
                  onChange={handleChange}
                  name="nama_negara"
                  size="md"
                  placeholder="Nama Negara"
                  className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  crossOrigin={undefined}
                />
                {errors.nama_negara && (
                  <Typography
                    className="!text-overline pl-2 text-danger-400"
                    placeholder={undefined}
                  >
                    {errors.nama_negara}
                  </Typography>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <Typography color="black" variant="paragraph" placeholder={undefined}>
                  Kode Negara*:
                </Typography>
                <Input
                  value={negara.kode_negara}
                  onChange={handleChange}
                  name="kode_negara"
                  size="md"
                  placeholder="Kode Negara"
                  className="w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  crossOrigin={undefined}
                />
                {errors.kode_negara && (
                  <Typography
                    className="!text-overline pl-2 text-danger-400"
                    placeholder={undefined}
                  >
                    {errors.kode_negara}
                  </Typography>
                )}
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

export default CreateNegaraPage;
