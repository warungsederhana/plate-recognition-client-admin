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

interface DataJenisKendaraan {
  uid: string;
  id: string;
  nama_jenis_kendaraan: string;
  kode_jenis_kendaraan: string;
  jumlah_sumbu: string;
  createdAt: string;
  updatedAt: string;
}

const DetailJenisKendaraanPage = ({ params }: { params: { uid: string } }) => {
  const [dataJenisKendaraan, setDataJenisKendaraan] = useState<DataJenisKendaraan>();

  useEffect(() => {
    const fetchDataJenisKendaraan = async () => {
      try {
        const response = await axios.get(`http://localhost:3344/api/jenis-kendaraan/${params.uid}`);
        setDataJenisKendaraan(response.data.data);
      } catch (error) {
        console.error("Error fetching data jenis kendaraan:", error);
      }
    };

    fetchDataJenisKendaraan();
  }, [params.uid]);

  return (
    <>
      <div className="py-6 px-16 w-full h-full">
        {dataJenisKendaraan ? (
          <Card className="h-fit w-full" placeholder={undefined}>
            <CardHeader
              floated={false}
              shadow={false}
              className="rounded-none px-4 mb-4"
              placeholder={undefined}
            >
              <Typography color="blue-gray" variant="h5" placeholder={undefined}>
                Halaman Detail Jenis Kendaraan
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
                      value={dataJenisKendaraan.id}
                      disabled
                      size="md"
                      placeholder="ID"
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>

                  <div className="w-full flex flex-col gap-1">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Jumlah Sumbu:
                    </Typography>
                    <Input
                      value={
                        dataJenisKendaraan.jumlah_sumbu ? dataJenisKendaraan.jumlah_sumbu : "-"
                      }
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
                      Nama Jenis Kendaraan:
                    </Typography>
                    <Input
                      value={dataJenisKendaraan.nama_jenis_kendaraan}
                      disabled
                      size="md"
                      placeholder="ID"
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>

                  <div className="w-full flex flex-col gap-1">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      Kode Jenis Kendaraan:
                    </Typography>
                    <Input
                      value={dataJenisKendaraan.kode_jenis_kendaraan}
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

export default DetailJenisKendaraanPage;
