"use client";
import React, { useState, useEffect } from "react";
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

const EditNegaraPage = ({ params }: { params: { uid: string } }) => {
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
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchDataNegara = async () => {
      try {
        const response = await axios.get(`http://localhost:3344/api/negara-asal/${params.uid}`, {
          headers: {
            Authorization: token,
          },
        });
        setNegara(response.data.data);
      } catch (error) {
        console.error("Error fetching data negara:", error);
      }
    };
    fetchDataNegara();
  }, [params.uid]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.put(
          `http://localhost:3344/api/negara-asal/${params.uid}`,
          negara,
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
          router.push("/dashboard/data/negara");
          toast.success("Data negara asal berhasil diperbarui!");
        }
      } catch (error) {
        console.error("Error updating negara asal:", error);
        toast.error("Gagal memperbarui negara asal!");
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
              Halaman Edit Negara
            </Typography>
          </CardHeader>

          <CardBody className="overflow-auto px-8 py-0 h-full block" placeholder={undefined}>
            <form className="flex flex-col lg:flex-row items-center gap-4">
              <div className="flex flex-col gap-1">
                <Typography color="black" variant="paragraph" placeholder={undefined}>
                  ID*:
                </Typography>
                <Input
                  disabled
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

export default EditNegaraPage;
