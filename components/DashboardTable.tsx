import React from "react";
import { Card, Typography, CardHeader, CardBody, CardFooter } from "@material-tailwind/react";

interface DashboardTableProps {
  title: string;
  data: any[];
}

const DashboardTable = (props: DashboardTableProps) => {
  const keys = Object.keys(props.data[0]);
  const TABLE_HEAD = Object.keys(props.data[0]).map((key) => key.replace(/_/g, " ").toUpperCase());
  const TABLE_ROWS = props.data;

  return (
    <Card className="h-full w-full mt-6" placeholder={undefined}>
      <CardHeader floated={false} shadow={false} className="rounded-none" placeholder={undefined}>
        <Typography variant="h6" color="blue-gray" className="font-bold" placeholder={undefined}>
          TABEL {props.title}
        </Typography>
      </CardHeader>

      <CardBody placeholder={undefined} className="px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-b border-white bg-primary-500 p-4">
                  <Typography
                    variant="small"
                    color="white"
                    className="font-normal leading-none opacity-70"
                    placeholder={undefined}
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map((row, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={index}>
                  {keys.map((key) => (
                    <td key={key} className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        placeholder={undefined}
                      >
                        {row[key]}
                      </Typography>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
};

export default DashboardTable;
