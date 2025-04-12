import FollowSection from "@/components/Feed Page/Rightside Bar/FollowSection";
import Sidebar from "@/components/Feed Page/Sidebar/Sidebar";
import { db } from "@/utils/firebase/Firebase";
import { Button, Card, CardBody, CardHeader, Input, User } from "@heroui/react";
import { getDoc, doc } from "firebase/firestore";
import Link from "next/link";
import { useState } from "react";

const SearchUser = () => {
  const [uid, setUid] = useState("");
  const [userInformation, setUserInformation] = useState<any>(null);
  const [error, setError] = useState("");

  const searchUser = async () => {
    setError("");
    setUserInformation(null);
    if (uid.trim() === "") {
      setError("Please enter a UID.");
      return;
    }

    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        setUserInformation(userDoc.data());
      } else {
        setError("User not found.");
      }
    } catch (err) {
      setError("An error occurred while searching for the user.");
    }
  };

  return (
    <>
      <div className="grid grid-cols-5 py-20 px-20">
        <div className="grid col-span-1">
          <Sidebar />
        </div>
        <div className="grid col-span-3">
          <Card>
            <CardHeader>
              <Input
                type="text"
                variant="bordered"
                color="primary"
                label="Enter UID to search!"
                labelPlacement="outside"
                placeholder="5TVjn0RUaAbfntvO0xvGYzw7LOw1"
                value={uid}
                onChange={(e) => setUid(e.target.value)}
                endContent={
                  <>
                    <Button
                      onPress={searchUser}
                      variant="bordered"
                      color="primary"
                      size="sm"
                    >
                      Search
                    </Button>
                  </>
                }
              />
            </CardHeader>
            <CardBody className="text-center">
              {error && <p className="text-red-500">{error}</p>}
              {userInformation ? (
                <div className="p-5 flex flex-col">
                  <User
                    name={
                      <span className="text-2xl font-bold underline">
                        {userInformation.fullName}
                      </span>
                    }
                    description={
                      <>
                        <div className="flex text-start flex-col gap-x-5">
                          <p>Description: {userInformation.description}</p>
                          <p>Followers: {userInformation.followers.length}</p>
                          <p>Following: {userInformation.following.length}</p>
                          <p>Posts: {userInformation.posts.length}</p>
                        </div>
                      </>
                    }
                    avatarProps={{
                      src: userInformation.profilePicture,
                      className: "w-20 h-20",
                    }}
                  />
                  <Link href={"/main/profile/" + userInformation.uid}>
                    <Button color="primary" variant="bordered">
                      Visit Profile?
                    </Button>
                  </Link>
                </div>
              ) : (
                !error && (
                  <p>Make sure to type in the input to look for someone 😊</p>
                )
              )}
            </CardBody>
          </Card>
        </div>
        <div className="grid col-span-1">
          <FollowSection />
        </div>
      </div>
    </>
  );
};

export default SearchUser;
