import SettingsIcon from "@/components/icons/SettingsIcon";
import { BookmarksIcon } from "@/components/icons/SidebarIcons/BookmarksIcon";
import { CreatePostIcon } from "@/components/icons/SidebarIcons/CreatePostIcon";
import { ExploreIcon } from "@/components/icons/SidebarIcons/ExploreIcon";
import { HomeIcon } from "@/components/icons/SidebarIcons/HomeIcon";
import SignOutIcon from "@/components/icons/SignOutIcon";
import ProfileIcon from "@/components/icons/UserIcon";
import { doSignOut } from "@/utils/firebase/ConfigFunctions";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
  User,
} from "@heroui/react";
import { useRouter } from "next/router";
import { UserComponent } from "./ChildComponents/UserComponent";
import { SidebarMenuItemsComponent } from "./ChildComponents/SidebarMenuItemsComponent";

const Sidebar = () => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Card className="mx-5">
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
