import SettingsIcon from "@/components/icons/SettingsIcon";
import SignOutIcon from "@/components/icons/SignOutIcon";
import ProfileIcon from "@/components/icons/UserIcon";
import { doSignOut } from "@/utils/firebase/ConfigFunctions";
import {
  Button,
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
import router from "next/router";

export const UserComponent: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <div className="flex justify-center">
        <Popover showArrow placement="right-start">
          <PopoverTrigger>
            <Button className="" variant="light">
              <User
                description="Username (Full Name)"
                name="Jane Doe"
                className="transition-transform duration-300 hover:-translate-y-1"
              />
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
    </>
  );
};
