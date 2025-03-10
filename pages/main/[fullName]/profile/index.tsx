import FollowSection from "@/components/Feed Page/Rightside Bar/FollowSection";
import Sidebar from "@/components/Feed Page/Sidebar/Sidebar";
import { CommentIcon } from "@/components/icons/PostIcons/PostSpecificIcons/CommentIcon";
import { DeletePostIcon } from "@/components/icons/PostIcons/PostSpecificIcons/DeletePostIcon";
import { EditPostIcon } from "@/components/icons/PostIcons/PostSpecificIcons/EditPostIcon";
import { HeartIcon } from "@/components/icons/PostIcons/PostSpecificIcons/HeartIcon";
import SettingsIcon from "@/components/icons/GeneralIcons/SettingsIcon";
import { auth, db } from "@/utils/firebase/Firebase";
import { ProfileInfo } from "@/utils/types/Types";
import {
  addToast,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  useDisclosure,
  User,
} from "@heroui/react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ProfileContent: React.FC = () => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState<boolean>(false);
  const [modifyProfile, setModifyProfile] = useState<boolean>(false);
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
    emailVerified: false,
    uid: "",
    createdAt: "",
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        getDoc(doc(db, "users", user.uid)).then((docSnap) => {
          if (docSnap.exists()) {
            setUserInformation((prevState) => ({
              ...prevState,
              profilePicture: docSnap.data().profilePicture,
              fullName: docSnap.data().fullName,
              email: docSnap.data().email,
              description: docSnap.data().description,
              pronouns: docSnap.data().pronouns,
              followers: docSnap.data().followers,
              following: docSnap.data().following,
              likes: docSnap.data().likes,
              posts: docSnap.data().posts,
              numberOfFollowers: docSnap.data().followers.length,
              numberOfFollowing: docSnap.data().following.length,
              numberOfLikes: docSnap.data().likes.length,
              numberOfPosts: docSnap.data().posts.length,
              uid: docSnap.data().uid,
              sexualIdentity: docSnap.data().sexualIdentity,
              emailVerified: auth.currentUser
                ? auth.currentUser.emailVerified
                : false,
              gender: docSnap.data().gender,
              createdAt: docSnap.data().createdAt,
            }));
          }
        });
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const editProfile = () => {
    setLoading(true);
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      updateDoc(userDocRef, {
        pronouns: userInformation.pronouns,
        gender: userInformation.gender,
        sexualIdentity: userInformation.sexualIdentity,
        description: userInformation.description,
      })
        .then(() => {
          setLoading(false);
          addToast({
            title: "Updated!",
            color: "primary",
            description: "Your profile has been successfully updated!",
            hideIcon: true,
            timeout: 3000,
            shouldShowTimeoutProgress: true,
          });
          setModifyProfile(false);
        })
        .catch((error) => {
          setLoading(false);
          addToast({
            title: "Error!",
            color: "danger",
            description: `Failed to update profile: ${error.message}`,
            hideIcon: true,
            timeout: 3000,
            shouldShowTimeoutProgress: true,
          });
        });
    }
  };
  const deletePost = (postIndex: number) => {
    let user = auth.currentUser;
    let uid = user?.uid;
    if (!user) {
      router.push("/login");
      return;
    }
    if (!uid) {
      router.push("/login");
      return;
    }
    const userDocRef = doc(db, "users", uid);
    getDoc(userDocRef).then((docSnap) => {
      if (docSnap.exists()) {
        const userData = docSnap.data();
        const updatedPosts = userData.posts.filter(
          (_: any, index: number) => index !== postIndex
        );
        updateDoc(userDocRef, { posts: updatedPosts })
          .then(() => {
            setUserInformation((prevState) => ({
              ...prevState,
              posts: updatedPosts,
              numberOfPosts: updatedPosts.length,
            }));
            addToast({
              title: "Deleted!",
              color: "primary",
              description: "Your post has been successfully deleted!",
              hideIcon: true,
              timeout: 3000,
              shouldShowTimeoutProgress: true,
            });
          })
          .catch((error) => {
            addToast({
              title: "Error!",
              color: "danger",
              description: `Failed to delete post: ${error.message}`,
              hideIcon: true,
              timeout: 3000,
              shouldShowTimeoutProgress: true,
            });
          });
      }
    });
  };
  return (
    <>
      <div className="grid grid-cols-5 py-20 px-20">
        <div className="grid col-span-1">
          <Sidebar />
        </div>
        <div className="grid col-span-3">
          <Card className="py-20 px-10">
            <CardHeader>
              <div className="grid grid-cols-2">
                <div className="grid col-span-1">
                  <Tooltip
                    content="Note: You can only change the following in settings: Profile Picture, Full Name :("
                    color="warning"
                    showArrow
                  >
                    <User
                      name={
                        <span className="text-2xl font-bold underline">
                          {userInformation.fullName}
                        </span>
                      }
                      description={
                        <>
                          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                            <ModalContent className="p-5">
                              <ModalHeader>
                                <div className="border-b-1.5">
                                  <h1 className="text-2xl font-bold underline">
                                    Profile information
                                  </h1>
                                  <h5 className="text-md font-extralight">
                                    The content below is your information you
                                    set previously :)
                                  </h5>
                                </div>
                              </ModalHeader>
                              <ModalBody>
                                <div>
                                  {modifyProfile ? (
                                    <div className="">
                                      <Input
                                        onChange={(e) =>
                                          setUserInformation({
                                            ...userInformation,
                                            pronouns: e.target.value,
                                          })
                                        }
                                        placeholder="Pronouns here :3"
                                        size="sm"
                                        variant="bordered"
                                        color="primary"
                                      />
                                      <Input
                                        onChange={(e) =>
                                          setUserInformation({
                                            ...userInformation,
                                            gender: e.target.value,
                                          })
                                        }
                                        placeholder="Gender here :>"
                                        size="sm"
                                        variant="bordered"
                                        color="primary"
                                      />
                                      <Input
                                        onChange={(e) =>
                                          setUserInformation({
                                            ...userInformation,
                                            sexualIdentity: e.target.value,
                                          })
                                        }
                                        placeholder="Sexuality here :>"
                                        size="sm"
                                        variant="bordered"
                                        color="primary"
                                      />
                                      <Button
                                        variant="bordered"
                                        color="primary"
                                        size="sm"
                                        onPress={editProfile}
                                        isLoading={loading}
                                      >
                                        Update
                                      </Button>
                                    </div>
                                  ) : (
                                    <div className="grid grid-cols-1 w-full">
                                      <div className="grid col-span-1">
                                        <span className="font-bold">
                                          Pronouns:
                                        </span>{" "}
                                        {userInformation.pronouns ||
                                          "Click 'Edit Profile' to change it :)"}
                                      </div>
                                      <div className="grid col-span-1">
                                        <span className="font-bold">
                                          Gender:
                                        </span>{" "}
                                        {userInformation.gender ||
                                          "Not specified"}
                                      </div>
                                      <div className="grid col-span-1">
                                        <span className="font-bold">
                                          Sexuality:{" "}
                                        </span>{" "}
                                        {userInformation.sexualIdentity ||
                                          "Not specified"}
                                      </div>
                                      <Tooltip
                                        content="We have this for security reasons :) You can change verify it in settings :)"
                                        placement="bottom"
                                        showArrow
                                      >
                                        <div>
                                          <Tooltip
                                            content="Note: Make sure to restart your browser after verifying email, we know it's not ideal."
                                            color="warning"
                                            placement="bottom"
                                            showArrow
                                          >
                                            <div className="grid col-span-1">
                                              <span className="font-bold">
                                                Email Verified:
                                              </span>{" "}
                                              {auth.currentUser?.emailVerified
                                                ? "True"
                                                : "False"}
                                            </div>
                                          </Tooltip>
                                        </div>
                                      </Tooltip>
                                      <div>
                                        <span className="font-bold">
                                          Created At:
                                        </span>{" "}
                                        {new Date(
                                          userInformation.createdAt
                                        ).toLocaleDateString()}
                                      </div>
                                      <div>
                                        <span className="font-bold">UID:</span>{" "}
                                        {userInformation.uid}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </ModalBody>
                            </ModalContent>
                          </Modal>
                          <Button
                            className="font-extralight"
                            variant="bordered"
                            size="sm"
                            onPress={onOpen}
                            color="primary"
                            isIconOnly
                          >
                            i
                          </Button>
                        </>
                      }
                      avatarProps={{
                        src: userInformation.profilePicture,
                        alt: userInformation.fullName,
                        className: "w-20 h-20",
                      }}
                    />
                  </Tooltip>
                </div>
              </div>
              <div className="grid col-span-1 items-center ml-5">
                <div className="flex flex-row gap-x-4">
                  <Tooltip
                    content={
                      "Total Likes on all posts: " +
                      userInformation.numberOfLikes
                    }
                  >
                    <p className="hover:underline hover:cursor-pointer text-gray-500">
                      {userInformation.numberOfPosts} Posts
                    </p>
                  </Tooltip>
                  <p className="hover:underline hover:cursor-pointer text-gray-500">
                    {userInformation.numberOfFollowing} Following
                  </p>
                  <p className="hover:underline hover:cursor-pointer text-gray-500">
                    {userInformation.numberOfFollowers} Followers
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <div className="flex flex-col mb-5">
                {modifyProfile ? (
                  <div className="grid grid-cols-2 items-center">
                    <div className="grid col-span-1">
                      <Input
                        variant="bordered"
                        labelPlacement="outside"
                        placeholder="I'm pwetty :3"
                        color="primary"
                        value={userInformation.description}
                        onChange={(e) =>
                          setUserInformation({
                            ...userInformation,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid col-span-1">
                      <Button
                        variant="bordered"
                        color="primary"
                        size="sm"
                        onPress={editProfile}
                        isLoading={loading}
                      >
                        Update
                      </Button>
                    </div>
                  </div>
                ) : (
                  userInformation.description
                )}
              </div>
              <div className="grid grid-cols-2">
                <Button
                  onPress={() => setModifyProfile(!modifyProfile)}
                  variant="bordered"
                  color="primary"
                >
                  Edit Profile
                </Button>
                <div className="grid col-span-1">
                  <Tooltip content="Coming soon! :3" showArrow>
                    <Button variant="bordered" color="primary">
                      Share Profile
                    </Button>
                  </Tooltip>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold underline mt-5 text-center">
                  Posts
                </h1>
                <div className="grid grid-cols-3 gap-x-5">
                  {userInformation.posts.map((post, id) => {
                    return (
                      <Tooltip key={id} content="Visit Post?" showArrow>
                        <Link
                          href={
                            "/main/" +
                            userInformation.fullName +
                            "/profile/" +
                            userInformation.uid +
                            "/posts/" +
                            id
                          }
                        >
                          <Card
                            key={id}
                            className="hover:-translate-y-1 flex items-center justify-center h-full"
                          >
                            <CardHeader className="flex items-center justify-center">
                              <img
                                src={post.attachment}
                                alt="Poster for image"
                              />
                            </CardHeader>
                            <Tooltip content="These are your stats... Want to change them? Click the post :)">
                              <CardBody className="flex flex-row gap-x-5 justify-center items-center">
                                <Popover placement="bottom">
                                  <PopoverTrigger>
                                    <Button
                                      variant="light"
                                      onClick={(e: React.MouseEvent) =>
                                        e.preventDefault()
                                      }
                                      isIconOnly
                                    >
                                      <SettingsIcon />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent>
                                    <div className="flex flex-col gap-y-2">
                                      <Button
                                        variant="light"
                                        color="primary"
                                        startContent={<EditPostIcon />}
                                        className="justify-start"
                                      >
                                        Edit Post
                                      </Button>
                                      <Button
                                        isLoading={loading}
                                        startContent={<DeletePostIcon />}
                                        variant="light"
                                        color="danger"
                                        className="justify-start"
                                        onPress={() => deletePost(id)}
                                      >
                                        Delete Post
                                      </Button>
                                    </div>
                                  </PopoverContent>
                                </Popover>
                              </CardBody>
                            </Tooltip>
                          </Card>
                        </Link>
                      </Tooltip>
                    );
                  })}
                </div>
              </div>
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

export default ProfileContent;
