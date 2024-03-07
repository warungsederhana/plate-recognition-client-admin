"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar, Collapse, Typography, IconButton } from "@material-tailwind/react";
import {
  Bars3Icon,
  XMarkIcon,
  EllipsisVerticalIcon,
  UserCircleIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Sidebar from "./Sidebar";

function NavList() {
  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      <div className="flex flex-row gap-2 items-center">
        <IconButton variant="text" size="lg" placeholder={undefined}>
          <UserCircleIcon className="h-7 w-7 hover:cursor-pointer" strokeWidth={1.5} />
        </IconButton>
        <Typography
          as="li"
          variant="paragraph"
          color="blue-gray"
          className="p-1 font-medium block lg:hidden"
          placeholder={undefined}
        >
          Profile
        </Typography>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <IconButton variant="text" size="lg" placeholder={undefined}>
          <ArrowRightStartOnRectangleIcon
            className="h-7 w-7 hover:cursor-pointer"
            strokeWidth={1.5}
          />
        </IconButton>

        <Typography
          as="li"
          variant="paragraph"
          color="blue-gray"
          className="p-1 font-medium block lg:hidden"
          placeholder={undefined}
        >
          Logout
        </Typography>
      </div>
    </ul>
  );
}

function NavigationBar() {
  const [openNav, setOpenNav] = React.useState(false);

  const handleWindowResize = () => window.innerWidth >= 960 && setOpenNav(false);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Navbar
      variant="gradient"
      fullWidth={true}
      className="mx-auto lg:px-16 py-3 z-[1000] h-full sticky top-0"
      placeholder={undefined}
    >
      <div className="flex items-center justify-between text-blue-gray-900">
        <div className="flex flex-row-reverse gap-2 lg:w-auto lg:justify-normal lg:flex-row items-center">
          <Link href="/dashboard">
            <div className="flex flex-row items-center justify-center lg:mr-8">
              <Image src={"/img/app-logo.png"} alt={""} width={50} height={50} />
              <Typography
                variant="h4"
                className="cursor-pointer py-1.5 lg:mr-4"
                placeholder={undefined}
              >
                Plate Recognition
              </Typography>
            </div>
          </Link>

          <Sidebar />
        </div>

        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          variant="text"
          size="lg"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
          placeholder={undefined}
        >
          {openNav ? (
            <XMarkIcon className="h-7 w-7" strokeWidth={1.5} />
          ) : (
            <EllipsisVerticalIcon className="h-7 w-7" strokeWidth={1.5} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}

export default NavigationBar;
