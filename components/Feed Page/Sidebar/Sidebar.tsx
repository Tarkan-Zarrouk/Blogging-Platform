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
            <Button
              className="w-full font-bold text-xl flex justify-between hover:-translate-y-1"
              variant="light"
              startContent={
                <>
                  <HomeIcon />
                </>
              }
            >
              Home
            </Button>
            <Button
              className="w-full font-bold text-xl flex justify-between hover:-translate-y-1"
              variant="light"
              startContent={
                <>
                  <ExploreIcon />
                </>
              }
            >
              Explore
            </Button>
            <Button
              className="w-full font-bold text-xl flex justify-between hover:-translate-y-1"
              variant="light"
              startContent={
                <>
                  <CreatePostIcon />
                </>
              }
            >
              Create Post
            </Button>
            <Button className="w-full font-bold text-xl flex justify-between hover:-translate-y-1" variant="light" startContent={
              <>
              <BookmarksIcon />
              </>
            }>
              Bookmarks
            </Button>
          </div>
        </CardBody>
        <CardFooter className="justify-center">
          <div className="flex justify-center">
            <Popover showArrow placement="right-start">
              <PopoverTrigger>
                <Button className="" variant="light">
                  <User description="Username (Full Name)" name="Jane Doe" className="transition-transform duration-300 hover:-translate-y-1" />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex flex-col">
                  <Button
                    className="gap-x-7 self-center w-full text-end"
                    startContent={<ProfileIcon />}
                    variant="light"
                    style={{ justifyContent: "flex-start" }}
                  >
                    Profile
                  </Button>
                  <Button
                    className="gap-x-5 self-center w-full text-end"
                    startContent={<SettingsIcon />}
                    variant="light"
                    style={{ justifyContent: "flex-start" }}
                  >
                    Settings
                  </Button>
                  <Button
                    className="gap-x-5 self-center w-full text-red-500"
                    startContent={<SignOutIcon />}
                    variant="light"
                    style={{ justifyContent: "flex-start" }}
                    onPress={onOpen}
                  >
                    Logout
                  </Button>
                  <Modal
                    isDismissable
                    isKeyboardDismissDisabled
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                  >
                    <ModalContent>
                      {(onClose) => (
                        <ModalContent>
                          <ModalHeader>
                            <h3 className="text-xl font-extrabold text-red-500">
                              Woah, Hold It Right There Partner! 🛑
                            </h3>
                          </ModalHeader>
                          <ModalBody>
                            You understand that by clicking this you'll have to
                            login once again?
                          </ModalBody>
                          <ModalFooter>
                            <Button
                              onPress={onClose}
                              color="primary"
                              className="font-bold"
                            >
                              Keep Me Here!
                            </Button>
                            <Button
                              onPress={() => {
                                doSignOut();
                                router.push("/");
                              }}
                              color="danger"
                              className="font-bold"
                            >
                              Get Me Outta Here!
                            </Button>
                          </ModalFooter>
                        </ModalContent>
                      )}
                    </ModalContent>
                  </Modal>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default Sidebar;
