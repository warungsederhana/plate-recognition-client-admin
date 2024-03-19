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
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface DataNegara {
  uid: string;
  id: string;
  nama_negara: string;
  kode_negara: string;
  createdAt: string;
  updatedAt: string;
}

const DetailNegaraPage = ({ params }: { params: { uid: string } }) => {
  const router = useRouter();
  const [dataNegara, setDataNegara] = useState<DataNegara>();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    const fetchDataNegara = async () => {
      try {
        const response = await axios.get(`http://localhost:3344/api/negara-asal/${params.uid}`);
        setDataNegara(response.data.data);
      } catch (error) {
        console.error("Error fetching data negara:", error);
      }
    };

    fetchDataNegara();
  }, [params.uid]);

  const handleEdit = () => {
    router.push(`/dashboard/data/negara/edit/${params.uid}`);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3344/api/negara-asal/${dataNegara?.uid}`
      );
      if (
        response.status === 201 ||
        response.statusText === "Created" ||
        response.status === 200 ||
        response.statusText === "OK"
      ) {
        toast.success("Data berhasil dihapus");
        setOpenDeleteModal(false);
        router.push("/dashboard/data/negara");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      toast.error("Gagal menghapus data");
    }
  };

  return (
    <>
      <div className="py-6 px-16 w-full h-full">
        {dataNegara ? (
          <Card className="h-fit w-full" placeholder={undefined}>
            <CardHeader
              floated={false}
              shadow={false}
              className="rounded-none px-4 mb-4"
              placeholder={undefined}
            >
              <Typography color="blue-gray" variant="h5" placeholder={undefined}>
                Halaman Detail Negara
              </Typography>
            </CardHeader>

            <CardBody className="overflow-auto px-8 py-0 h-full block" placeholder={undefined}>
              <form className="flex flex-col lg:flex-row items-center gap-4">
                <div className="flex flex-col gap-1">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    Id:
                  </Typography>
                  <Input
                    value={dataNegara.id}
                    disabled
                    size="md"
                    placeholder="ID"
                    className="w-full lg:w-96"
                    crossOrigin={undefined}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Typography color="black" variant="paragraph" placeholder={undefined}>
                    Nama Negara:
                  </Typography>
                  <Input
                    value={dataNegara.nama_negara}
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
                    value={dataNegara.kode_negara}
                    disabled
                    size="md"
                    placeholder="ID"
                    className="w-full lg:w-96"
                    crossOrigin={undefined}
                  />
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
                  Kembali
                </Button>
                <Button
                  className="!bg-yellow-700 min-w-24"
                  children="Edit"
                  placeholder={undefined}
                  onClick={handleEdit}
                />
                <Button
                  className="!bg-danger-400 min-w-24"
                  children="Delete"
                  onClick={() => setOpenDeleteModal(true)}
                  placeholder={undefined}
                />
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

export default DetailNegaraPage;
