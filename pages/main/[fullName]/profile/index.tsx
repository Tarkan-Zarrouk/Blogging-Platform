import FollowSection from "@/components/Feed Page/Rightside Bar/FollowSection";
import Sidebar from "@/components/Feed Page/Sidebar/Sidebar";
import { CommentIcon } from "@/components/icons/PostIcons/PostSpecificIcons/CommentIcon";
import { DeletePostIcon } from "@/components/icons/PostIcons/PostSpecificIcons/DeletePostIcon";
import { EditPostIcon } from "@/components/icons/PostIcons/PostSpecificIcons/EditPostIcon";
import { HeartIcon } from "@/components/icons/PostIcons/PostSpecificIcons/HeartIcon";
import SettingsIcon from "@/components/icons/SettingsIcon";
import ThreeDotsMenuIcon from "@/components/icons/ThreeDotsMenuIcon";
import { auth, db } from "@/utils/firebase/Firebase";
import { ProfileInfo } from "@/utils/types/Types";
import {
  addToast,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  User,
} from "@heroui/react";
import { converBase64ToImage } from "convert-base64-to-image";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ProfileContent: React.FC = () => {
  const router = useRouter();
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
    likes: [],
    posts: [],
    numberOfFollowers: 0,
    numberOfFollowing: 0,
    numberOfLikes: 0,
    numberOfPosts: 0,
    gender: "",
    sexualIdentity: "",
    uid: "",
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
            shouldShowTimeoutProgess: true,
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
            shouldShowTimeoutProgess: true,
          });
        });
    }
  };
  // const base64 =

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
                        modifyProfile ? (
                          <>
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
                          </>
                        ) : (
                          <div className="grid grid-cols-1">
                            <div className="grid col-span-1">
                              Pronouns:{" "}
                              {userInformation.pronouns ||
                                "Click 'Edit Profile' to change it :)"}
                            </div>
                            <div className="grid col-span-1">
                              Sexuality:{" "}
                              {userInformation.sexualIdentity ||
                                "Not specified"}
                            </div>
                          </div>
                        )
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
                  <p className="hover:underline hover:cursor-pointer text-gray-500">
                    {userInformation.numberOfPosts} Posts
                  </p>
                  <p className="hover:underline hover:cursor-pointer text-gray-500">
                    {userInformation.numberOfFollowing} following
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
                  <>
                    <Input
                      variant="bordered"
                      color="primary"
                      value={userInformation.description}
                      onChange={(e) =>
                        setUserInformation({
                          ...userInformation,
                          description: e.target.value,
                        })
                      }
                    />
                  </>
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
                  <Button variant="bordered" color="primary">
                    Share Profile
                  </Button>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold underline mt-5 text-center">
                  Posts
                </h1>
                <div className="grid grid-cols-3 gap-x-5">
                  {userInformation.posts.map((post, id) => {
                    console.log(post); // Log the post data to verify its format

                    // Extract the base64 image data from the post string
                    const base64Data = post.split(",").pop();
                    const imageSrc = `data:image/png;base64,${base64Data}`;

                    return (
                      <Tooltip content="Visit Post?" showArrow>
                        <Link
                          href={
                            "/main/" +
                            userInformation.fullName +
                            "/profile/" +
                            id
                          }
                        >
                          <Card
                            key={id}
                            className="hover:-translate-y-1 flex items-center justify-center"
                          >
                            <CardHeader>
                              <img
                                src={imageSrc}
                                alt={`Post ${id}`}
                                className=" hover:cursor-pointer"
                              />
                            </CardHeader>
                            <CardBody className="flex flex-row gap-x-5 justify-center">
                              <Button
                                variant="light"
                                onClick={(e: React.MouseEvent) =>
                                  e.preventDefault()
                                }
                                isIconOnly
                              >
                                <HeartIcon />
                              </Button>
                              <Button
                                variant="light"
                                onClick={(e: React.MouseEvent) =>
                                  e.preventDefault()
                                }
                                isIconOnly
                              >
                                <CommentIcon />
                              </Button>
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
                                      startContent={<DeletePostIcon />}
                                      variant="light"
                                      color="danger"
                                      className="justify-start"
                                    >
                                      Delete Post
                                    </Button>
                                    </div>
                                </PopoverContent>
                              </Popover>
                            </CardBody>
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
