"use client";
import React, { useState } from "react";
import {
  PencilIcon,
  FolderPlusIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
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

interface DataTableProps {
  title: string;
  data: any[];
  keys: string[];
  handleSearch: (nama_negara: string) => void;
  handleDetail: (uid: string) => void;
  handleDelete: (uid: string) => void;
  handleCreate: () => void;
}

const DataTable = (props: DataTableProps) => {
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(4); // Jumlah data per halaman
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // State untuk mengatur modal delete
  const [deleteUid, setDeleteUid] = useState<string | null>(null); // State untuk menyimpan uid data yang akan dihapus

  const keys = props.keys;
  const TABLE_HEAD = [...keys.map((key) => key.replace(/_/g, " ").toUpperCase()), "ACTIONS"];

  // Filter data berdasarkan pencarian
  const filteredData = props.data.filter((item) =>
    keys.some((key) => {
      const value = item[key];
      return value ? value.toString().toLowerCase().includes(search.toLowerCase()) : false;
    })
  );

  // Logic untuk mengambil data per halaman dari data yang sudah difilter
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = filteredData.slice(indexOfFirstData, indexOfLastData);

  // Ganti halaman
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSearchChange = () => {
    const newTotalPages = Math.ceil(filteredData.length / dataPerPage);
    if (currentPage > newTotalPages) {
      setCurrentPage(1);
    }
  };

  const searchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchChange();
    }
  };

  const handleDetail = (uid: string) => {
    props.handleDetail(uid);
  };

  const handleCreate = () => {
    props.handleCreate();
  };

  const handleDeleteConfirmation = (uid: string) => {
    setDeleteUid(uid); // Simpan uid dari item yang akan dihapus
    setOpenDeleteModal(true); // Buka modal konfirmasi penghapusan
  };

  const handleDelete = () => {
    if (deleteUid) {
      props.handleDelete(deleteUid); // Panggil fungsi handleDelete dari props dengan uid yang akan dihapus
    }
    setOpenDeleteModal(false); // Tutup modal konfirmasi penghapusan
    setDeleteUid(null); // Bersihkan uid yang disimpan
  };

  return (
    <Card className="h-fit w-full border border-solid border-neutrals-200" placeholder={undefined}>
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none px-4 mb-4"
        placeholder={undefined}
      >
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray" placeholder={undefined}>
              Table {props.title}
            </Typography>
            <Typography color="gray" className="mt-1 font-normal" placeholder={undefined}>
              Daftar informasi dari {props.title.toLowerCase()}
            </Typography>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="w-full md:w-72 lg:w-96">
            <Input
              placeholder={undefined}
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              crossOrigin={undefined}
              onChange={(e) => {
                setSearch(e.target.value);
                handleSearchChange();
              }}
              onKeyDown={searchKeyDown}
            />
          </div>
          <Button
            className="flex items-center gap-2 bg-primary-400"
            size="sm"
            placeholder={undefined}
            onClick={handleCreate}
          >
            <FolderPlusIcon strokeWidth={2} className="h-4 w-4" />
            <Typography variant="small" placeholder={undefined}>
              Add {props.title.toLowerCase()}
            </Typography>
          </Button>
        </div>
      </CardHeader>
      <CardBody
        className="overflow-auto px-0 py-0 h-full max-h-96 block border-t border-solid border-neutrals-300"
        placeholder={undefined}
      >
        <table className="w-full min-w-max text-left table-fixed">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => {
                // Memberikan lebar yang sama untuk semua kolom kecuali kolom 'ACTIONS'
                const widthClass = head === "ACTIONS" ? "w-1/6" : "w-1/4"; // Sesuaikan ini berdasarkan jumlah kolom yang Anda miliki
                const classes = `py-4 px-8 bg-gradient-to-tr from-primary-500 to-primary-400 border-b border-solid border-neutrals-300 ${widthClass}`;
                return (
                  <th key={head} className={classes}>
                    <Typography
                      variant="paragraph"
                      color="white"
                      className="font-normal leading-none opacity-100"
                      placeholder={undefined}
                    >
                      {head}
                    </Typography>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="align-middle">
            {/* Render rows with data */}
            {currentData.map((row, index) => (
              <tr key={index}>
                {keys.map((key, keyIndex) => (
                  <td key={key} className={`py-4 px-8 border-r border-solid border-neutrals-300`}>
                    <Typography
                      variant="paragraph"
                      color="blue-gray"
                      className="font-normal"
                      placeholder={undefined}
                    >
                      {row[key] ? row[key].toString() : "-"}
                    </Typography>
                  </td>
                ))}
                {/* Actions column */}
                <td className="py-4 px-8 ">
                  <div className="flex items-center justify-center gap-4">
                    <Tooltip content={`Detail ${props.title.toLocaleLowerCase()}`}>
                      <IconButton
                        onClick={() => handleDetail(row["uid"])}
                        variant="text"
                        placeholder={undefined}
                      >
                        <MagnifyingGlassIcon className="h-6 w-6 text-info-500" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content={`Edit ${props.title.toLocaleLowerCase()}`}>
                      <IconButton variant="text" placeholder={undefined}>
                        <PencilIcon className="h-6 w-6 text-yellow-600" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content={`Delete ${props.title.toLocaleLowerCase()}`}>
                      <IconButton
                        variant="text"
                        onClick={() => handleDeleteConfirmation(row["uid"])}
                        placeholder={undefined}
                      >
                        <TrashIcon className="h-6 w-6 text-red-500" />
                      </IconButton>
                    </Tooltip>
                  </div>
                </td>
              </tr>
            ))}
            {/* Empty rows to keep consistent height */}
            {Array.from({ length: dataPerPage - currentData.length }, (_, index) => (
              <tr key={`empty-${index}`}>
                {keys.map((key, cellIndex) => (
                  <td
                    key={`empty-cell-${cellIndex}`}
                    className={`py-4 px-8 border-r border-solid border-neutrals-300`}
                  >
                    &nbsp;
                  </td>
                ))}
                <td className="px-4 py-3">&nbsp;</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
      <CardFooter
        className="flex items-center justify-between p-4 border-t border-solid border-neutrals-300"
        placeholder={undefined}
      >
        <div className="flex items-center justify-end gap-4 w-full ">
          {/* Tombol Previous */}
          <IconButton
            variant="text"
            placeholder={undefined}
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
          >
            <ChevronLeftIcon className="h-5 w-5 text-danger-400" />
          </IconButton>

          {/* Teks Halaman ... dari ... */}
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="font-normal"
            placeholder={undefined}
          >
            Halaman {currentPage} dari {Math.ceil(filteredData.length / dataPerPage)}
          </Typography>

          {/* Tombol Next */}
          <IconButton
            variant="text"
            placeholder={undefined}
            disabled={currentPage === Math.ceil(filteredData.length / dataPerPage)}
            onClick={() => paginate(currentPage + 1)}
          >
            <ChevronRightIcon className="h-5 w-5 text-danger-400" />
          </IconButton>
        </div>
      </CardFooter>
      {/* Modal for delete confirmation */}
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
          <Button variant="gradient" onClick={handleDelete} color="red" placeholder={undefined}>
            Delete
          </Button>
        </DialogFooter>
      </Dialog>
    </Card>
  );
};

export default DataTable;
