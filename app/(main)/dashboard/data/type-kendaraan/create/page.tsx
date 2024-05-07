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

const CreateTypeKendaraanPage = () => {
  const router = useRouter();
  const [typeKendaraan, setTypeKendaraan] = useState({
    id: "",
    nama_type_kendaraan_eri: "",
    nama_type_kendaraan: "",
    id_jenis_kendaraan: "",
    id_merek_kendaraan: "",
    kode_negara_asal: "",
  });
  const [errors, setErrors] = useState({
    id: "",
    nama_type_kendaraan_eri: "",
    nama_type_kendaraan: "",
    id_jenis_kendaraan: "",
    id_merek_kendaraan: "",
    kode_negara_asal: "",
  });
  const [jenisKendaraanOptions, setJenisKendaraanOptions] = useState([]);
  const [merekKendaraanOptions, setMerekKendaraanOptions] = useState([]);
  const [negaraAsalOptions, setNegaraAsalOptions] = useState([]);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    // Fetch jenis kendaraan options
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

    // Fetch merek kendaraan options
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

    // Fetch negara asal options
    axios
      .get("http://localhost:3344/api/negara-asal", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setNegaraAsalOptions(
          response.data.data.map((negara: any) => ({
            value: negara.kode_negara,
            label: negara.nama_negara,
          }))
        );
      })
      .catch((error) => console.error("Error fetching negara asal:", error));
  }, []);

  const handleSelectChange = (selectedOption: any, field: any) => {
    setTypeKendaraan({
      ...typeKendaraan,
      [field]: selectedOption.value,
    });
    setErrors({
      ...errors,
      [field]: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue = value;

    // Ubah input menjadi huruf kapital untuk field tertentu
    if (["nama_type_kendaraan_eri", "kode_negara_asal"].includes(name)) {
      newValue = value.toUpperCase();
    }

    setTypeKendaraan({
      ...typeKendaraan,
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
      nama_type_kendaraan_eri: "",
      nama_type_kendaraan: "",
      id_jenis_kendaraan: "",
      id_merek_kendaraan: "",
      kode_negara_asal: "",
    };

    if (!typeKendaraan.id) {
      newErrors.id = "ID harus diisi!";
      isValid = false;
    } else if (!/^\d{3}$/.test(typeKendaraan.id)) {
      newErrors.id = "ID harus berupa 3 angka bulat!";
      isValid = false;
    }

    if (!typeKendaraan.nama_type_kendaraan) {
      newErrors.nama_type_kendaraan = "Nama type kendaraan harus diisi!";
      isValid = false;
    }
    if (!typeKendaraan.nama_type_kendaraan_eri) {
      newErrors.nama_type_kendaraan_eri = "Nama type kendaraan ERI harus diisi!";
      isValid = false;
    }
    if (!typeKendaraan.id_jenis_kendaraan) {
      newErrors.id_jenis_kendaraan = "ID jenis kendaraan harus diisi!";
      isValid = false;
    } else if (!/^\d{3}$/.test(typeKendaraan.id_jenis_kendaraan)) {
      newErrors.id = "ID jenis kendaraan harus berupa 3 angka bulat!";
      isValid = false;
    }
    if (!typeKendaraan.id_merek_kendaraan) {
      newErrors.id_merek_kendaraan = "ID merek kendaraan harus diisi!";
      isValid = false;
    } else if (!/^\d{3}$/.test(typeKendaraan.id_merek_kendaraan)) {
      newErrors.id = "ID merek kendaraan harus berupa 3 angka bulat!";
      isValid = false;
    }
    if (!typeKendaraan.kode_negara_asal) {
      newErrors.kode_negara_asal = "Kode negara asal harus diisi!";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validate()) {
      try {
        const response = await axios.post(
          "http://localhost:3344/api/type-kendaraan",
          typeKendaraan,
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
          router.push("/dashboard/data/type-kendaraan");
          toast.success("Berhasil menambahkan data type kendaraan!");
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
          console.error("Error adding data type kendaraan:", axiosError);
          toast.error("Terjadi kesalahan saat menambahkan data type kendaraan");
        }
      }
    }
  };

  const inputClass = "w-full lg:w-96 !border-t-blue-gray-200 focus:!border-t-gray-900";

  return (
    <>
      <div className="py-6 px-8 lg:px-16 w-full h-full">
        <Card className="h-fit w-full" placeholder={undefined}>
          <CardHeader
            floated={false}
            shadow={false}
            className="rounded-none px-4 mb-4"
            placeholder={undefined}
          >
            <Typography color="blue-gray" variant="h5" placeholder={undefined}>
              Halaman Tambah Type Kendaraan
            </Typography>
          </CardHeader>

          <CardBody className="overflow-auto px-8 py-2 h-full block" placeholder={undefined}>
            <div className="flex flex-col items-center gap-4 ">
              <div className="w-full flex flex-col lg:flex-row justify-between gap-4">
                <div className="w-full flex flex-col gap-1">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    ID:
                  </Typography>
                  <Input
                    value={typeKendaraan.id}
                    onChange={handleChange}
                    name="id"
                    size="md"
                    placeholder="ID terdiri dari 3 angka bulat!"
                    className={`${inputClass}`}
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
                    Kode Negara Asal:
                  </Typography>
                  <Select
                    options={negaraAsalOptions}
                    onChange={(option) => handleSelectChange(option, "kode_negara_asal")}
                    placeholder="Pilih Kode Negara Asal"
                    isSearchable
                    className={`${inputClass}`}
                    menuPortalTarget={document.body}
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        borderColor: state.isFocused ? "#1f2937" : base.borderColor,
                        boxShadow: state.isFocused ? "0 0 0 1px #1f2937" : base.boxShadow,
                        "&:hover": {
                          borderColor: state.isFocused ? "#1f2937" : base["&:hover"]?.borderColor,
                        },
                      }),
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

              <div className="w-full flex flex-col lg:flex-row justify-between gap-4">
                <div className="w-full flex flex-col gap-1">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    Nama Type Kendaraan:
                  </Typography>
                  <Input
                    value={typeKendaraan.nama_type_kendaraan}
                    onChange={handleChange}
                    name="nama_type_kendaraan"
                    size="md"
                    placeholder="Nama Type Kendaraan"
                    className={`${inputClass}`}
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.nama_type_kendaraan && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.nama_type_kendaraan}
                    </Typography>
                  )}
                </div>

                <div className="w-full flex flex-col gap-1">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    Nama Type Kendaraan ERI:
                  </Typography>
                  <Input
                    value={typeKendaraan.nama_type_kendaraan_eri}
                    onChange={handleChange}
                    name="nama_type_kendaraan_eri"
                    size="md"
                    placeholder="Nama Type Kendaraan ERI"
                    className={`${inputClass}`}
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    crossOrigin={undefined}
                  />
                  {errors.nama_type_kendaraan_eri && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.nama_type_kendaraan_eri}
                    </Typography>
                  )}
                </div>
              </div>

              <div className="w-full flex flex-col lg:flex-row justify-between gap-4">
                <div className="w-full flex flex-col gap-1">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    ID Jenis Kendaraan:
                  </Typography>
                  <Select
                    options={jenisKendaraanOptions}
                    onChange={(option) => handleSelectChange(option, "id_jenis_kendaraan")}
                    placeholder="Pilih Jenis Kendaraan"
                    isSearchable
                    className={`${inputClass}`}
                    menuPortalTarget={document.body}
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        borderColor: state.isFocused ? "#1f2937" : base.borderColor,
                        boxShadow: state.isFocused ? "0 0 0 1px #1f2937" : base.boxShadow,
                        "&:hover": {
                          borderColor: state.isFocused ? "#1f2937" : base["&:hover"]?.borderColor,
                        },
                      }),
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

                <div className="w-full flex flex-col gap-1">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    ID Merek Kendaraan:
                  </Typography>
                  <Select
                    options={merekKendaraanOptions}
                    onChange={(option) => handleSelectChange(option, "id_merek_kendaraan")}
                    placeholder="Pilih Merek Kendaraan"
                    isSearchable
                    className={`${inputClass}`}
                    menuPortalTarget={document.body}
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        borderColor: state.isFocused ? "#1f2937" : base.borderColor,
                        boxShadow: state.isFocused ? "0 0 0 1px #1f2937" : base.boxShadow,
                        "&:hover": {
                          borderColor: state.isFocused ? "#1f2937" : base["&:hover"]?.borderColor,
                        },
                      }),
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

export default CreateTypeKendaraanPage;
