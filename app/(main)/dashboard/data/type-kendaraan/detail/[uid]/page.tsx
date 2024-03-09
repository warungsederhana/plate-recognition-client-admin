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
} from "@material-tailwind/react";

interface DataTypeKendaraan {
  uid: string;
  id: string;
  nama_type_kendaraan_eri: string;
  nama_type_kendaraan: string;
  id_jenis_kendaraan: string;
  id_merk_kendaraan: string;
  kode_negara_asal: string;
  createdAt: string;
  updatedAt: string;
}

const DetailTypeKendaraan = ({ params }: { params: { uid: string } }) => {
  const [dataTypeKendaraan, setDataTypeKendaraan] = useState<DataTypeKendaraan>();

  useEffect(() => {
    const fetchDataTypeKendaraan = async () => {
      try {
        const response = await axios.get(`http://localhost:3344/api/type-kendaraan/${params.uid}`);
        setDataTypeKendaraan(response.data.data);
      } catch (error) {
        console.error("Error fetching data type kendaraan:", error);
      }
    };

    fetchDataTypeKendaraan();
  }, [params.uid]);
  return (
    <>
      <div className="py-6 px-8 lg:px-16 w-full h-full">
        {dataTypeKendaraan ? (
          <Card className="h-fit w-full" placeholder={undefined}>
            <CardHeader
              floated={false}
              shadow={false}
              className="rounded-none px-4 mb-4"
              placeholder={undefined}
            >
              <Typography color="blue-gray" variant="h5" placeholder={undefined}>
                Halaman Detail Type Kendaraan
              </Typography>
            </CardHeader>

            <CardBody className="overflow-auto px-8 py-0 h-full block" placeholder={undefined}>
              <div className="flex flex-col items-center gap-4 ">
                <div className="w-full flex flex-col lg:flex-row justify-between gap-4">
                  <div className="w-full flex flex-col gap-1">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Id:
                    </Typography>
                    <Input
                      value={dataTypeKendaraan.id}
                      disabled
                      size="md"
                      placeholder="ID"
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>

                  <div className="w-full flex flex-col gap-1">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Kode Negara Asal:
                    </Typography>
                    <Input
                      value={dataTypeKendaraan.kode_negara_asal}
                      disabled
                      size="md"
                      placeholder="ID"
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                </div>

                <div className="w-full flex flex-col lg:flex-row justify-between gap-4">
                  <div className="w-full flex flex-col gap-1">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Nama Type Kendaraan:
                    </Typography>
                    <Input
                      value={dataTypeKendaraan.nama_type_kendaraan}
                      disabled
                      size="md"
                      placeholder="ID"
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>

                  <div className="w-full flex flex-col gap-1">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Nama Type Kendaraan Eri:
                    </Typography>
                    <Input
                      value={dataTypeKendaraan.nama_type_kendaraan_eri}
                      disabled
                      size="md"
                      placeholder="ID"
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                </div>

                <div className="w-full flex flex-col lg:flex-row justify-between gap-4">
                  <div className="w-full flex flex-col gap-1">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Id Jenis Kendaraan:
                    </Typography>
                    <Input
                      value={dataTypeKendaraan.id_jenis_kendaraan}
                      disabled
                      size="md"
                      placeholder="ID"
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>

                  <div className="w-full flex flex-col gap-1">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Id Merk Kendaraan:
                    </Typography>
                    <Input
                      value={dataTypeKendaraan.id_merk_kendaraan}
                      disabled
                      size="md"
                      placeholder="ID"
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>
                </div>
              </div>
            </CardBody>

            <CardFooter placeholder={undefined}>
              <div className="flex justify-end gap-4">
                <Button
                  className="!bg-yellow-700 min-w-24"
                  size="sm"
                  children="Edit"
                  placeholder={undefined}
                />
                <Button
                  className="!bg-danger-400 min-w-24"
                  size="sm"
                  children="Delete"
                  placeholder={undefined}
                />
              </div>
            </CardFooter>
          </Card>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default DetailTypeKendaraan;
