import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth, db } from "@/utils/firebase/Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ProfileInfo } from "@/utils/types/Types";
import {
  Card,
  CardHeader,
  CardBody,
  User,
  Tooltip,
  CardFooter,
  Button,
  useDisclosure,
  Modal,
  ModalContent,
} from "@heroui/react";
import Sidebar from "@/components/Feed Page/Sidebar/Sidebar";
import FollowSection from "@/components/Feed Page/Rightside Bar/FollowSection";
import Link from "next/link";

const ExternalUserProfile = () => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { nonUserProfileUUID } = router.query;
  const [followState, setFollowState] = useState<boolean>(false);
  const [userInformation, setUserInformation] = useState<ProfileInfo>({
    email: "",
    fullName: "",
    profilePicture: "",
    description: "",
    pronouns: "",
    followers: [],
    following: [],
    posts: [],
    numberOfFollowers: 0,
    numberOfFollowing: 0,
    numberOfLikes: 0,
    numberOfPosts: 0,
    gender: "",
    sexualIdentity: "",
    uid: "",
    createdAt: "",
    emailVerified: false,
  });

  useEffect(() => {
    const fetchUserInformation = async () => {
      if (nonUserProfileUUID) {
        const userDoc = await getDoc(
          doc(db, "users", nonUserProfileUUID as string)
        );
        if (userDoc.exists()) {
          setUserInformation(userDoc.data() as ProfileInfo);
        }
      }
    };

    fetchUserInformation();
  }, [nonUserProfileUUID]);

  const followUser = () => {
    setUserInformation((prevInfo) => ({
      ...prevInfo,
      followers: [...prevInfo.followers, auth.currentUser?.uid].filter(
        (uid): uid is string => uid !== undefined
      ),
    }));
    updateDoc(doc(db, "users", nonUserProfileUUID as string), {
      followers: [...userInformation.followers, auth.currentUser?.uid].filter(
        (uid): uid is string => uid !== undefined
      ),
    });
    updateDoc(doc(db, "users", auth.currentUser?.uid as string), {
      following: [...userInformation.following, nonUserProfileUUID].filter(
        (uid): uid is string => uid !== undefined
      ),
    });
    setFollowState(true);
  };
  const unfollowUser = () => {
    setUserInformation((prevInfo) => ({
      ...prevInfo,
      followers: prevInfo.followers.filter(
        (uid) => uid !== auth.currentUser?.uid
      ),
    }));
    updateDoc(doc(db, "users", nonUserProfileUUID as string), {
      followers: userInformation.followers.filter(
        (uid) => uid !== auth.currentUser?.uid
      ),
    });
    updateDoc(doc(db, "users", auth.currentUser?.uid as string), {
      following: userInformation.following.filter(
        (uid) => uid !== nonUserProfileUUID
      ),
    });
    setFollowState(!followState);
  };

  console.log(userInformation);

  return (
    <div className="grid grid-cols-5 py-20 px-20">
      <div className="grid col-span-1">
        <Sidebar />
      </div>
      <div className="grid col-span-3 p-4">
        <Card className="p-4">
          <CardHeader className="flex justify-between items-center">
            <div className="flex items-center">
              <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                  {(onClose) => (
                    <div className="p-5">
                      <div className="border-b-1.5">
                        <h1 className="text-2xl font-bold underline">
                          Profile information
                        </h1>
                        <p className="font-extralight">
                          The content below is your information you set
                          previously :)
                        </p>
                      </div>
                      <div className="flex flex-col">
                        <p>
                          <span className="font-bold">Pronouns:</span>{" "}
                          {userInformation.pronouns}
                        </p>
                        <p>
                          <span className="font-bold">Gender:</span>{" "}
                          {userInformation.gender}
                        </p>
                        <p>
                          <span className="font-bold">Sexuality:</span>{" "}
                          {userInformation.sexualIdentity}
                        </p>
                        <p>
                          <span className="font-bold">Email Verified:</span>{" "}
                          {userInformation.emailVerified || "True"}
                        </p>
                        <p>
                          <span className="font-bold">Created At:</span>{" "}
                          {new Date(
                            userInformation.createdAt
                          ).toLocaleDateString()}
                        </p>
                        <p>
                          <span className="font-bold">UUID:</span>{" "}
                          {userInformation.uid}
                        </p>
                      </div>
                    </div>
                  )}
                </ModalContent>
              </Modal>
              <User
                name={
                  <span className="text-2xl font-bold underline">
                    {userInformation.fullName}
                  </span>
                }
                description={
                  <Button
                    onPress={onOpen}
                    variant="bordered"
                    color="primary"
                    className="font-extralight"
                    isIconOnly
                  >
                    i
                  </Button>
                }
                avatarProps={{
                  src: userInformation.profilePicture,
                  className: "w-20 h-20",
                }}
              />
            </div>
            <div className="grid col-span-1">
              <div className="grid grid-cols-3 gap-x-5">
                <div className="grid col-span-1">
                  <p>{userInformation.posts.length} Posts</p>
                </div>
                <Tooltip
                  content="Click to view who's their followers!"
                  showArrow
                >
                  <div className="grid col-span-1 transition-transform delay-75 hover:underline hover:-translate-y-1">
                    <p>{userInformation.followers.length} Followers</p>
                  </div>
                </Tooltip>
                <Tooltip
                  content="Click to view who's their following!"
                  showArrow
                >
                  <div className="grid col-span-1 transition-transform delay-75 hover:underline hover:-translate-y-1">
                    <p>{userInformation.following.length} Following</p>
                  </div>
                </Tooltip>
              </div>
            </div>
          </CardHeader>
          {followState ? (
            <Button onPress={unfollowUser} variant="bordered" color="danger">
              Unfollow User
            </Button>
          ) : (
            <>
              {auth.currentUser?.uid &&
              userInformation.followers.includes(auth.currentUser.uid) ? (
                <Button
                  onPress={unfollowUser}
                  variant="bordered"
                  color="danger"
                >
                  Unfollow User
                </Button>
              ) : (
                <Button onPress={followUser} variant="bordered" color="primary">
                  Follow
                </Button>
              )}
            </>
          )}
          <CardBody>
            <h1 className="text-2xl font-bold underline text-center">Posts</h1>
            <div>
              {userInformation.posts.map((post, index) => (
                <div className="grid grid-cols-3">
                  <Link href={"/main/profile/" + nonUserProfileUUID + "/post/"}>
                    <Tooltip content="Click to view their post!" showArrow>
                      <Card className="mx-auto w-full">
                        <img
                          src={post.attachment}
                          className="w-full mx-auto"
                          alt="post photo"
                        />
                      </Card>
                    </Tooltip>
                  </Link>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="grid col-span-1">
        <FollowSection />
      </div>
    </div>
  );
};

export default ExternalUserProfile;
