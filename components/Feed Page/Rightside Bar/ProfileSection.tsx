import SettingsIcon from "@/components/icons/SettingsIcon";
import SignOutIcon from "@/components/icons/SignOutIcon";
import ProfileIcon from "@/components/icons/UserIcon";
import { doSignOut } from "@/utils/ConfigFunctions";
import {
  Button,
  Card,
  CardBody,
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
import { useState } from "react";

const ProfileSection: React.FC = () => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  let [userInformation, setUserInformation] = useState({
    username: "", // fullName
    avatar: "", // if there is no avatar we render default profile photo
  });
  return (
    <>
      <div className="px-5">
        <Card>
          <CardHeader className="border-b-1.5">
            <h4 className="text-lg font-bold">People to Follow:</h4>
          </CardHeader>
          <CardBody>
            *INSERT USER PROFILES HERE* (Will extend with maximum 20 users,
            refresh randomizes it)
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default ProfileSection;
