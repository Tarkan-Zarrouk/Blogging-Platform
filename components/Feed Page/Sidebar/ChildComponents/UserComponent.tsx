import SettingsIcon from "@/components/icons/SettingsIcon";
import SignOutIcon from "@/components/icons/SignOutIcon";
import ProfileIcon from "@/components/icons/UserIcon";
import { doSignOut } from "@/utils/firebase/ConfigFunctions";
import { auth, db, firebaseConfig } from "@/utils/firebase/Firebase";
import { GeneralUserInfo } from "@/utils/types/Types";
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
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const UserComponent: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [userInformation, setUserInformation] = useState<GeneralUserInfo>({
    fullName: "",
    profilePicture: "",
    uid: "",
  });
  const router = useRouter();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUserInformation({
              fullName: userData.fullName,
              /**
               * @IMPORTANT: When going to import pfp, convert to base64 then attatch "data:image/jpeg;base64,/" :)) thank me later
               */
              profilePicture: userData.profilePicture || "",
              uid: user.uid,
            });
          }
        });
      } else {
        router.push("/");
      }
    });
  }, []);
  return (
    <>
      <div className="flex justify-center">
        <Popover showArrow placement="right-start">
          <PopoverTrigger>
            <Button className="" variant="light">
              <User
                description={userInformation.fullName}
                name={userInformation.fullName}
                avatarProps={{
                  src: userInformation.profilePicture,
                }}
                className="transition-transform duration-300 hover:-translate-y-1"
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col">
              <Link href={`/main/${userInformation.fullName}/profile`}>
                <Button
                  className="gap-x-7 self-center w-full text-end"
                  startContent={<ProfileIcon />}
                  variant="light"
                  style={{ justifyContent: "flex-start" }}
                >
                  Profile
                </Button>
              </Link>
              <Button
                className="gap-x-5 self-center w-full text-end"
                startContent={<SettingsIcon />}
                variant="light"
                onPress={() => router.push("/settings")}
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
