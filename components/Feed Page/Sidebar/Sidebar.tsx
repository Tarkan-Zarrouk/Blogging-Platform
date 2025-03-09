import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  useDisclosure,
} from "@heroui/react";
import { useRouter } from "next/router";
import { UserComponent } from "./ChildComponents/UserComponent";
import { SidebarMenuItemsComponent } from "./ChildComponents/SidebarMenuItemsComponent";

const Sidebar = () => {
  return (
    <>
      <Card className="mx-5 h-52 fixed w-72">
        <CardHeader>
          <Button
            variant="light"
            className="flex justify-center hover:-translate-y-1 w-full"
          >
            <p className="font-bold capitalize text-lg bg-gradient-to-r from-gray-800 to-gray-100 bg-clip-text text-transparent">
              NEXUS
            </p>
          </Button>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <SidebarMenuItemsComponent />
          </div>
        </CardBody>
        <CardFooter className="justify-center">
          <UserComponent />
        </CardFooter>
      </Card>
    </>
  );
};

export default Sidebar;
