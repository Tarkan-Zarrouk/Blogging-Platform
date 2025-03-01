import Sidebar from "@/components/Feed Page/Sidebar/Sidebar";
import { auth, db } from "@/utils/firebase/Firebase";
import {
  addToast,
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
} from "@heroui/react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Settings = () => {
  const router = useRouter();
  const [userInformation, setUserInformation] = useState({
    fullName: "",
    profilePicture: "",
    uid: "",
    password: "",
    email: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUserInformation((prevState) => ({
              ...prevState,
              fullName: userData.fullName,
              /**
               * @IMPORTANT: When going to import pfp, convert to base64 then attatch "data:image/jpeg;base64,/" :)) thank me later
               */
              profilePicture: userData.profilePicture || "",
              uid: user.uid,
            }));
          }
        });
      } else {
        router.push("/");
      }
    });
  }, []);

  const handlePhotoChange = (e: any) => {
    // let us first check if it is a png or not
    const file = e.target.files?.[0];
    if (file && file.type !== "image/png") {
      addToast({
        title: "Invalid File Type",
        description: "Please upload a PNG file!",
        hideIcon: true,
        timeout: 3000,
        shouldShowTimeoutProgess: true,
      });
      // flush input
      e.target.value = "";
    } else if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result;
        setUserInformation((prevState) => ({
          ...prevState,
          profilePicture: base64 as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  const changeProfilePicture = () => {
    if (!userInformation.uid) {
      addToast({
        title: "Error",
        description: "User ID is missing!",
        hideIcon: true,
        timeout: 3000,
        shouldShowTimeoutProgess: true,
      });
      return;
    }

    getDoc(doc(db, "users", userInformation.uid)).then((docSnap) => {
      if (docSnap.exists()) {
        updateDoc(docSnap.ref, {
          profilePicture: userInformation.profilePicture,
        })
          .then(() => {
            addToast({
              title: "Success",
              description: "Profile picture updated successfully!",
              hideIcon: true,
              timeout: 3000,
              shouldShowTimeoutProgess: true,
            });
          })
          .catch((error) => {
            addToast({
              title: "Error",
              description: `Failed to update profile picture: ${error.message}`,
              hideIcon: true,
              timeout: 3000,
              shouldShowTimeoutProgess: true,
            });
          });
      }
    });
  };
  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInformation((prevState) => ({
      ...prevState,
      fullName: e.target.value,
    }));
  }
  const updateFullName = () => {
    if (!userInformation.uid) {
      addToast({
        title: "Error",
        description: "User ID is missing!",
        hideIcon: true,
        timeout: 3000,
        shouldShowTimeoutProgess: true,
      });
      return;
    }

    getDoc(doc(db, "users", userInformation.uid)).then((docSnap) => {
      if (docSnap.exists()) {
        updateDoc(docSnap.ref, {
          fullName: userInformation.fullName,
        })
          .then(() => {
            addToast({
              title: "Success",
              description: "Full Name updated successfully!",
              hideIcon: true,
              timeout: 3000,
              shouldShowTimeoutProgess: true,
            });
          })
          .catch((error) => {
            addToast({
              title: "Error",
              description: `Failed to update full name: ${error.message}`,
              hideIcon: true,
              timeout: 3000,
              shouldShowTimeoutProgess: true,
            });
          });
      }
    });
  }

  return (
    <>
      <div className="grid grid-cols-5 py-20 px-20">
        <div className="grid col-span-1">
          <Sidebar />
        </div>
        <div className="grid col-span-4">
          <Card className="pt-20 px-10">
            <CardHeader className="border-b-2">
              <div>
                <h1 className="text-5xl font-bold underline text-gray-800 mb-5">
                  Welcome to the Settings!
                </h1>
                <h4 className="text-xl">Personalize is here! 😊</h4>
              </div>
            </CardHeader>
            <CardBody className="pt-5">
              <div>
                <div className="flex flex-col">
                  <div className="grid grid-cols-2 items-center">
                    <div className="grid col-span-1">
                      <label htmlFor="avatar">
                        <h1 className="text-2xl font-bold">Profile Picture</h1>
                      </label>
                      <Avatar
                        id="avatar"
                        src={userInformation.profilePicture}
                        className="h-24 w-24"
                      />
                    </div>
                    <div className="grid col-span-1">
                      <div className="grid grid-cols-2 items-center gap-4">
                        <div className="grid col-span-1">
                          <Input
                            type="file"
                            color="primary"
                            variant="bordered"
                            label="Note: It must be a PNG!"
                            labelPlacement="outside"
                            className="transition-transform duration-300 hover:-translate-y-1"
                            onChange={handlePhotoChange}
                          />
                        </div>
                        <div className="grid col-span-1 w-40">
                          <Button
                            color="primary"
                            variant="bordered"
                            className="mt-[1.45rem] hover:-translate-y-1 "
                            onPress={changeProfilePicture}
                          >
                            Upload Profile Picture
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                    <div className="grid grid-cols-2 items-center mt-10">
                      <h1 className="text-2xl font-semibold text-gray-800">Change Your Full Name:</h1>
                      <div className="grid grid-cols-2 gap-4 items-center">
                        <div className="col-span-1">
                          <Input
                            variant="underlined"
                            label="Full Name"
                            color="primary"
                            value={userInformation.fullName}
                            onChange={handleFullNameChange}
                          />
                        </div>
                        <div className="col-span-1 mt-5">
                          <Button
                            variant="bordered"
                            color="primary"
                            onPress={updateFullName}
                          >
                            Update Full Name
                          </Button>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};
export default Settings;
