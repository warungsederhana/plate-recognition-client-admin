"use client";
import React, { useState, useEffect, useRef } from "react";
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
import Select from "react-select";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const EditMerkKendaraanPage = ({ params }: { params: { uid: string } }) => {
  const router = useRouter();
  const [merkKendaraan, setMerkKendaraan] = useState({
    id: "",
    nama_merk: "",
    kode_negara_asal: "",
  });
  const [errors, setErrors] = useState({
    id: "",
    nama_merk: "",
    kode_negara_asal: "",
  });
  const [db_kode_negara_asal, setDbKodeNegaraAsal] = useState([]);
  const isFetched = useRef(false);

  useEffect(() => {
    const fetchDataMerkKendaraan = async () => {
      try {
        const response = await axios.get(`http://localhost:3344/api/merk-kendaraan/${params.uid}`);
        setMerkKendaraan(response.data.data);
      } catch (error) {
        console.error("Error fetching data merk kendaraan:", error);
      }
    };

    fetchDataMerkKendaraan();
  }, [params.uid]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3344/api/negara-asal");
        console.log(response);
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
  }, [params.uid]);

  const handleChangeSelect = (selectedOption: any) => {
    setMerkKendaraan({
      ...merkKendaraan,
      kode_negara_asal: selectedOption.value,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue = value;

    // Ubah input menjadi huruf kapital untuk field tertentu
    if (["kode_negara_asal"].includes(name)) newValue = value.toUpperCase();

    setMerkKendaraan({
      ...merkKendaraan,
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
      nama_merk: "",
      kode_negara_asal: "",
    };

    if (!merkKendaraan.id) {
      newErrors.id = "ID harus diisi!";
      isValid = false;
    } else if (!/^\d{3}$/.test(merkKendaraan.id)) {
      newErrors.id = "ID harus berupa 3 angka bulat!";
      isValid = false;
    }
    if (!merkKendaraan.nama_merk) {
      newErrors.nama_merk = "Nama merk kendaraan harus diisi!";
      isValid = false;
    }
    if (!merkKendaraan.kode_negara_asal) {
      newErrors.kode_negara_asal = "Kode negara asal harus diisi!";
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
          `http://localhost:3344/api/merk-kendaraan/${params.uid}`,
          merkKendaraan
        );

        if (
          response.status === 201 ||
          response.statusText === "Created" ||
          response.status === 200 ||
          response.statusText === "OK"
        ) {
          router.push("/dashboard/data/merk-kendaraan");
          toast.success("Merk kendaraan berhasil diperbarui!");
        }
      } catch (error) {
        console.error("Error updating merk kendaraan:", error);
        toast.error("Gagal memperbarui merk kendaraan!");
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
              Halaman Edit Merk Kendaraan
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
                  disabled
                  value={merkKendaraan.id}
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
                  Nama Merk Kendaraan*:
                </Typography>
                <Input
                  value={merkKendaraan.nama_merk}
                  onChange={handleChange}
                  name="nama_merk"
                  size="md"
                  placeholder="Nama Merk Kendaraan"
                  className="w-full !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  crossOrigin={undefined}
                />
                {errors.nama_merk && (
                  <Typography
                    className="!text-overline pl-2 text-danger-400"
                    placeholder={undefined}
                  >
                    {errors.nama_merk}
                  </Typography>
                )}
              </div>

              <div className="w-full flex flex-col gap-1">
                <Typography color="black" variant="paragraph" placeholder={undefined}>
                  Kode Negara Asal*:
                </Typography>
                <Select
                  value={db_kode_negara_asal.find(
                    (option: { value: string; label: string }) =>
                      option.value === merkKendaraan.kode_negara_asal
                  )}
                  options={db_kode_negara_asal}
                  onChange={handleChangeSelect}
                  placeholder="Pilih Kode Negara Asal"
                  isSearchable
                  menuPortalTarget={document.body}
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

export default EditMerkKendaraanPage;
