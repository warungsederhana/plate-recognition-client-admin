"use client";
import React from "react";
import {
  PencilIcon,
  UserPlusIcon,
  TrashIcon,
  MagnifyingGlassIcon,
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
} from "@material-tailwind/react";

interface DataTableProps {
  title: string;
  data: any[];
  handleSearch: (nama_negara: string) => void;
  handleDetail: (uid: string) => void;
}

const DataTable = (props: DataTableProps) => {
  const [search, setSearch] = React.useState<string>("");
  const keys =
    props.data.length > 0
      ? Object.keys(props.data[0]).filter((key) => key !== "uid")
      : ["TIDAK ADA DATA"];
  const TABLE_HEAD = [...keys.map((key) => key.replace(/_/g, " ").toUpperCase()), "ACTIONS"];
  const TABLE_ROWS = props.data;

  const handleSearchChange = () => {
    props.handleSearch(search);
  };

  const searchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchChange();
    }
  };

  const handleDetail = (uid: string) => {
    props.handleDetail(uid);
  };

  return (
    <Card className="h-fit w-full" placeholder={undefined}>
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
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={searchKeyDown}
            />
          </div>
          <Button className="flex items-center gap-3" size="sm" placeholder={undefined}>
            <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add {props.title.toLowerCase()}
          </Button>
        </div>
      </CardHeader>
      <CardBody className="overflow-auto px-0 py-0 h-full max-h-96 block" placeholder={undefined}>
        <table className="w-full max-h-screen min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => {
                const isLast = index === TABLE_HEAD.length - 1;
                const classes = isLast
                  ? "py-4 px-8 bg-primary-500 border-b border-solid border-neutrals-300"
                  : "py-4 px-8 bg-primary-500 border-r border-b border-solid border-neutrals-300";
                return (
                  <th key={head} className={`sticky top-0 z-50 ${classes}`}>
                    <Typography
                      variant="small"
                      color="white"
                      className="font-normal leading-none opacity-100 pt-[-1px]"
                      placeholder={undefined}
                    >
                      {head}
                    </Typography>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.length > 0 ? (
              TABLE_ROWS.map((row, index) => {
                const classes = "py-4 px-8 border-r border-solid border-neutrals-300";

                return (
                  <tr key={index}>
                    {keys.map((key) => (
                      <td key={key} className={`${classes}`}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                          placeholder={undefined}
                        >
                          {row[key] ? row[key].toString() : "-"}
                        </Typography>
                      </td>
                    ))}
                    <td className={`py-4 px-8 flex flex-row gap-2`}>
                      <Tooltip content={`Detail ${props.title.toLocaleLowerCase()}`}>
                        <IconButton
                          onClick={(e) => handleDetail(row["uid"])}
                          variant="text"
                          placeholder={undefined}
                        >
                          <MagnifyingGlassIcon className="h-5 w-5 text-info-500" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip content={`Edit ${props.title.toLocaleLowerCase()}`}>
                        <IconButton variant="text" placeholder={undefined}>
                          <PencilIcon className="h-5 w-5 text-yellow-700" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip content={`Delete ${props.title.toLocaleLowerCase()}`}>
                        <IconButton variant="text" placeholder={undefined}>
                          <TrashIcon className="h-5 w-5 text-danger-400" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={TABLE_HEAD.length} className="p-4 text-center">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                    placeholder={undefined}
                  >
                    Tidak ada data
                  </Typography>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter
        className="flex items-center justify-between border-t border-blue-gray-50 p-4"
        placeholder={undefined}
      >
        <div className="flex p-2"></div>
      </CardFooter>
    </Card>
  );
};

export default DataTable;
