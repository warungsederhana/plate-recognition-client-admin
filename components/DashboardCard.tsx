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
      <CardFooter className="pt-0" placeholder={undefined}>
        <a href="#" className="inline-block">
          <Button
            size="sm"
            variant="text"
            className="flex items-center gap-2"
            placeholder={undefined}
          >
            Learn More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
};

export default DashboardCard;
