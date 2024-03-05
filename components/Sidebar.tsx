"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Button,
  Chip,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Typography,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  FlagIcon,
  WrenchIcon,
  Cog6ToothIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/outline";
import CIcon from "@coreui/icons-react";
import { cilCarAlt } from "@coreui/icons";

const Sidebar = () => {
  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const router = useRouter();

  return (
    <React.Fragment>
      <IconButton variant="text" size="lg" onClick={openDrawer} placeholder={undefined}>
        {isDrawerOpen ? (
          <XMarkIcon className="h-7 w-7 hover:cursor-pointer" strokeWidth={1.5} />
        ) : (
          <Bars3Icon className="h-7 w-7 hover:cursor-pointer" strokeWidth={1.5} />
        )}
      </IconButton>

      <Drawer
        placement="left"
        overlay={false}
        placeholder={undefined}
        open={isDrawerOpen}
        onClose={closeDrawer}
        className="min-h-screen"
        size={300}
      >
        <Typography className="px-4 pt-4" variant="h6" color="blue-gray" placeholder={undefined}>
          Home
        </Typography>
        <List placeholder={undefined}>
          <Link href={"/dashboard"}>
            <ListItem placeholder={undefined}>
              <ListItemPrefix placeholder={undefined}>
                <HomeIcon className="h-5 w-5" strokeWidth={1.5} />
              </ListItemPrefix>
              Dashboard
            </ListItem>
          </Link>
        </List>

        <Typography className="px-4 pt-4" variant="h6" color="blue-gray" placeholder={undefined}>
          Data
        </Typography>
        <List placeholder={undefined}>
          <Link href={"/dashboard/data/negara"}>
            <ListItem placeholder={undefined}>
              <ListItemPrefix placeholder={undefined}>
                <FlagIcon className="h-5 w-5" strokeWidth={1.5} />
              </ListItemPrefix>
              Negara
            </ListItem>
          </Link>
          <ListItem placeholder={undefined}>
            <ListItemPrefix placeholder={undefined}>
              <CIcon icon={cilCarAlt} className="h-5 w-5" />
            </ListItemPrefix>
            Kendaraan
          </ListItem>
          <ListItem placeholder={undefined}>
            <ListItemPrefix placeholder={undefined}>
              <WrenchIcon className="h-5 w-5" strokeWidth={1.5} />
            </ListItemPrefix>
            Merk Kendaraan
          </ListItem>
          <ListItem placeholder={undefined}>
            <ListItemPrefix placeholder={undefined}>
              <Cog6ToothIcon className="h-5 w-5" strokeWidth={1.5} />
            </ListItemPrefix>
            Type Kendaraan
          </ListItem>
          <ListItem placeholder={undefined}>
            <ListItemPrefix placeholder={undefined}>
              <Cog8ToothIcon className="h-5 w-5" strokeWidth={1.5} />
            </ListItemPrefix>
            Jenis Kendaraan
          </ListItem>
        </List>
      </Drawer>
    </React.Fragment>
  );
};

export default Sidebar;
