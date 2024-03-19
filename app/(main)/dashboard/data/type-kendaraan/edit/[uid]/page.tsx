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

const EditTypeKendaraanPage = ({ params }: { params: { uid: string } }) => {
  const router = useRouter();
  const [typeKendaraan, setTypeKendaraan] = useState({
    id: "",
    nama_type_kendaraan_eri: "",
    nama_type_kendaraan: "",
    id_jenis_kendaraan: "",
    id_merk_kendaraan: "",
    kode_negara_asal: "",
  });
  const [errors, setErrors] = useState({
    id: "",
    nama_type_kendaraan_eri: "",
    nama_type_kendaraan: "",
    id_jenis_kendaraan: "",
    id_merk_kendaraan: "",
    kode_negara_asal: "",
  });
  const [jenisKendaraanOptions, setJenisKendaraanOptions] = useState([]);
  const [merkKendaraanOptions, setMerkKendaraanOptions] = useState([]);
  const [negaraAsalOptions, setNegaraAsalOptions] = useState([]);

  useEffect(() => {
    const fetchDataTypeKendaraan = async () => {
      try {
        const response = await axios.get(`http://localhost:3344/api/type-kendaraan/${params.uid}`);
        setTypeKendaraan(response.data.data);
      } catch (error) {
        console.error("Error fetching data type kendaraan:", error);
      }
    };

    fetchDataTypeKendaraan();
  }, [params.uid]);

  useEffect(() => {
    // Fetch jenis kendaraan options
    axios
      .get("http://localhost:3344/api/jenis-kendaraan")
      .then((response) => {
        setJenisKendaraanOptions(
          response.data.data.map((jenis: any) => ({
            value: jenis.id,
            label: jenis.nama_jenis_kendaraan,
          }))
        );
      })
      .catch((error) => console.error("Error fetching jenis kendaraan:", error));

    // Fetch merk kendaraan options
    axios
      .get("http://localhost:3344/api/merk-kendaraan")
      .then((response) => {
        setMerkKendaraanOptions(
          response.data.data.map((merk: any) => ({
            value: merk.id,
            label: merk.nama_merk,
          }))
        );
      })
      .catch((error) => console.error("Error fetching merk kendaraan:", error));

    // Fetch negara asal options
    axios
      .get("http://localhost:3344/api/negara-asal")
      .then((response) => {
        setNegaraAsalOptions(
          response.data.data.map((negara: any) => ({
            value: negara.kode_negara,
            label: negara.nama_negara,
          }))
        );
      })
      .catch((error) => console.error("Error fetching negara asal:", error));
  }, [params.uid]);

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
      id_merk_kendaraan: "",
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
    if (!typeKendaraan.id_merk_kendaraan) {
      newErrors.id_merk_kendaraan = "ID merk kendaraan harus diisi!";
      isValid = false;
    } else if (!/^\d{3}$/.test(typeKendaraan.id_merk_kendaraan)) {
      newErrors.id = "ID merk kendaraan harus berupa 3 angka bulat!";
      isValid = false;
    }
    if (!typeKendaraan.kode_negara_asal) {
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
          `http://localhost:3344/api/type-kendaraan/${params.uid}`,
          typeKendaraan
        );

        if (
          response.status === 201 ||
          response.statusText === "Created" ||
          response.status === 200 ||
          response.statusText === "OK"
        ) {
          router.push("/dashboard/data/type-kendaraan");
          toast.success("Type kendaraan berhasil diperbarui!");
        }
      } catch (error) {
        console.error("Error updating type kendaraan:", error);
        toast.error("Gagal memperbarui type kendaraan!");
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
              Halaman Edit Type Kendaraan
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
                    disabled
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
                    value={negaraAsalOptions.find(
                      (option: { value: string; label: string }) =>
                        option.value === typeKendaraan.kode_negara_asal
                    )}
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
                    value={jenisKendaraanOptions.find(
                      (option: { value: string; label: string }) =>
                        option.value === typeKendaraan.id_jenis_kendaraan
                    )}
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
                    ID Merk Kendaraan:
                  </Typography>
                  <Select
                    value={merkKendaraanOptions.find(
                      (option: { value: string; label: string }) =>
                        option.value === typeKendaraan.id_merk_kendaraan
                    )}
                    options={merkKendaraanOptions}
                    onChange={(option) => handleSelectChange(option, "id_merk_kendaraan")}
                    placeholder="Pilih Merk Kendaraan"
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
                  {errors.id_merk_kendaraan && (
                    <Typography
                      className="!text-overline pl-2 text-danger-400"
                      placeholder={undefined}
                    >
                      {errors.id_merk_kendaraan}
                    </Typography>
                  )}
                </div>
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

export default EditTypeKendaraanPage;
