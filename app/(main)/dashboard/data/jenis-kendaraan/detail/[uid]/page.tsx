"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
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
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface DataJenisKendaraan {
  uid: string;
  id: string;
  nama_jenis_kendaraan: string;
  kode_jenis_kendaraan: string;
  jumlah_sumbu: string;
  id_jenis_mapping: string;
  id_model_kendaraan: string;
  kategori_jenis: string;
  createdAt: string;
  updatedAt: string;
}

const DetailJenisKendaraanPage = ({ params }: { params: { uid: string } }) => {
  const router = useRouter();
  const [dataJenisKendaraan, setDataJenisKendaraan] = useState<DataJenisKendaraan>();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const cookies = parseCookies();
  const token = `Bearer ${cookies.access_token}`;

  useEffect(() => {
    const fetchDataJenisKendaraan = async () => {
      try {
        const response = await axios.get(
          `https://plate-recognition-be-oop-dzgubwy2uq-et.a.run.app/api/jenis-kendaraan/${params.uid}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setDataJenisKendaraan(response.data.data);
      } catch (error) {
        console.error("Error fetching data jenis kendaraan:", error);
      }
    };

    fetchDataJenisKendaraan();
  }, [params.uid, token]);

  const handleEdit = () => {
    router.push(`/dashboard/data/jenis-kendaraan/edit/${params.uid}`);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://plate-recognition-be-oop-dzgubwy2uq-et.a.run.app/api/jenis-kendaraan/${dataJenisKendaraan?.uid}`,
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
        toast.success("Data berhasil dihapus");
        setOpenDeleteModal(false);
        router.push("/dashboard/data/jenis-kendaraan");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      toast.error("Gagal menghapus data");
    }
  };

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
                      Nama Jenis Kendaraan:
                    </Typography>
                    <Input
                      value={
                        dataJenisKendaraan?.nama_jenis_kendaraan
                          ? dataJenisKendaraan.nama_jenis_kendaraan
                          : "-"
                      }
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
                      Kode Jenis Kendaraan:
                    </Typography>
                    <Input
                      value={
                        dataJenisKendaraan?.kode_jenis_kendaraan
                          ? dataJenisKendaraan.kode_jenis_kendaraan
                          : "-"
                      }
                      disabled
                      size="md"
                      placeholder="ID"
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>

                  <div className="w-full flex flex-col gap-1">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      ID:
                    </Typography>
                    <Input
                      value={dataJenisKendaraan?.id ? dataJenisKendaraan.id : "-"}
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
                      ID Jenis Mapping:
                    </Typography>
                    <Input
                      value={
                        dataJenisKendaraan?.id_jenis_mapping
                          ? dataJenisKendaraan.id_jenis_mapping
                          : "-"
                      }
                      disabled
                      size="md"
                      placeholder="ID"
                      className="w-full lg:w-96"
                      crossOrigin={undefined}
                    />
                  </div>

                  <div className="w-full flex flex-col gap-1">
                    <Typography color="black" variant="paragraph" placeholder={undefined}>
                      ID Model Kendaraan:
                    </Typography>
                    <Input
                      value={
                        dataJenisKendaraan?.id_model_kendaraan
                          ? dataJenisKendaraan.id_model_kendaraan
                          : "-"
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
                      Kategori Jenis:
                    </Typography>
                    <Input
                      value={
                        dataJenisKendaraan?.kategori_jenis ? dataJenisKendaraan.kategori_jenis : "-"
                      }
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
                  variant="text"
                  className="min-w-24"
                  color="blue-gray"
                  placeholder={undefined}
                  onClick={() => router.back()}
                >
                  Kembali
                </Button>
                <Button
                  className="!bg-yellow-700 min-w-24"
                  onClick={handleEdit}
                  placeholder={undefined}
                >
                  Edit
                </Button>
                <Button
                  className="!bg-danger-400 min-w-24"
                  onClick={() => setOpenDeleteModal(true)}
                  placeholder={undefined}
                >
                  Delete
                </Button>
              </div>
            </CardFooter>

            <Dialog
              open={openDeleteModal}
              handler={() => setOpenDeleteModal(!openDeleteModal)}
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0.9, y: -100 },
              }}
              placeholder={undefined}
            >
              <DialogBody placeholder={undefined}>
                <Typography
                  variant="paragraph"
                  color="blue-gray"
                  className="font-normal"
                  placeholder={undefined}
                >
                  Apakah kamu yakin akan menghapus data ini?
                </Typography>
              </DialogBody>
              <DialogFooter placeholder={undefined}>
                <Button
                  variant="text"
                  color="blue-gray"
                  className="mr-4"
                  onClick={() => setOpenDeleteModal(false)}
                  placeholder={undefined}
                >
                  Cancel
                </Button>
                <Button
                  variant="gradient"
                  onClick={handleDelete}
                  color="red"
                  placeholder={undefined}
                >
                  Delete
                </Button>
              </DialogFooter>
            </Dialog>
          </Card>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default DetailJenisKendaraanPage;
