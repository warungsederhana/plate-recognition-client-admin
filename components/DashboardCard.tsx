"use client";
import React from "react";
import { Card, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";

interface DashboardCardProps {
  size: number;
  title: string;
}

const DashboardCard = (props: DashboardCardProps) => {
  return (
    <Card className="mt-6 w-96" placeholder={undefined}>
      <CardBody placeholder={undefined}>
        <Typography variant="h3" color="blue-gray" className="mb-2" placeholder={undefined}>
          {props.size}
        </Typography>
        <Typography placeholder={undefined}>{props.title}</Typography>
      </CardBody>
      <CardFooter className="pt-0" placeholder={undefined} children={undefined}></CardFooter>
    </Card>
  );
};

export default DashboardCard;
