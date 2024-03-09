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

interface DataMerkKendaraan {
  uid: string;
  id: string;
  kode_negara_asal: string;
  nama_merk: string;
  createdAt: string;
  updatedAt: string;
}

const DetailMerkKendaraanPage = ({ params }: { params: { uid: string } }) => {
  const [dataMerkKendaraan, setDataMerkKendaraan] = useState<DataMerkKendaraan>();

  useEffect(() => {
    const fetchDataMerkKendaraan = async () => {
      try {
        const response = await axios.get(`http://localhost:3344/api/merk-kendaraan/${params.uid}`);
        setDataMerkKendaraan(response.data.data);
      } catch (error) {
        console.error("Error fetching data merk kendaraan:", error);
      }
    };

    fetchDataMerkKendaraan();
  }, [params.uid]);

  return (
    <>
      <div className="py-6 px-16 w-full h-full">
        {dataMerkKendaraan ? (
          <Card className="h-fit w-full" placeholder={undefined}>
            <CardHeader
              floated={false}
              shadow={false}
              className="rounded-none px-4 mb-4"
              placeholder={undefined}
            >
              <Typography color="blue-gray" variant="h5" placeholder={undefined}>
                Halaman Detail Merk Kendaraan
              </Typography>
            </CardHeader>

            <CardBody className="overflow-auto px-8 py-0 h-full block" placeholder={undefined}>
              <div className="flex flex-col lg:flex-row items-center gap-4">
                <div className="flex flex-col gap-1">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    Id:
                  </Typography>
                  <Input
                    value={dataMerkKendaraan.id}
                    disabled
                    size="md"
                    placeholder="ID"
                    className="w-full lg:w-96"
                    crossOrigin={undefined}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    Nama Merk Kendaraan:
                  </Typography>
                  <Input
                    value={dataMerkKendaraan.nama_merk}
                    disabled
                    size="md"
                    placeholder="ID"
                    className="w-full lg:w-96"
                    crossOrigin={undefined}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    Kode Negara:
                  </Typography>
                  <Input
                    value={dataMerkKendaraan.kode_negara_asal}
                    disabled
                    size="md"
                    placeholder="ID"
                    className="w-full lg:w-96"
                    crossOrigin={undefined}
                  />
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

export default DetailMerkKendaraanPage;
