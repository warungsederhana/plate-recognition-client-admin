"use client";
import React from "react";
import { Card, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";

interface DashboardCardProps {
  size: number;
  title: string;
}

const DashboardCard = (props: DashboardCardProps) => {
  return (
    // bg-gradient-to-tr from-primary-500 to-primary-400
    <Card
      className="mt-6 w-96 bg-gradient-to-tr from-primary-500 to-primary-400"
      variant="gradient"
      placeholder={undefined}
    >
      <CardBody placeholder={undefined}>
        <Typography variant="h3" color="white" className="mb-2" placeholder={undefined}>
          {props.size}
        </Typography>
        <Typography color="white" placeholder={undefined}>
          {props.title}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0" placeholder={undefined}>
        {undefined}
      </CardFooter>
    </Card>
  );
};

export default DashboardCard;
