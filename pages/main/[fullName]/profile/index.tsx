import FollowSection from "@/components/Feed Page/Rightside Bar/FollowSection";
import Sidebar from "@/components/Feed Page/Sidebar/Sidebar";
import { auth, db } from "@/utils/firebase/Firebase";
import { ProfileInfo } from "@/utils/types/Types";
import {
  addToast,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Tooltip,
  User,
} from "@heroui/react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ProfileContent: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [changeDescription, setChangeDescription] = useState<boolean>(false);
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
    auth.onAuthStateChanged((user) => {
      if (user) {
        getDoc(doc(db, "users", user.uid)).then((docSnap) => {
          if (docSnap.exists()) {
            // console.log(docSnap.data().fullName);
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
            }));
          }
        });
      } else {
        router.push("/login");
      }
    });
  }, []);
  const setNewDescription = async () => {
    setLoading(true)
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      console.log(userInformation.description);
      await updateDoc(userDocRef, { description: userInformation.description });
      setLoading(false)
      addToast({
        title: "Posted!",
        color: "primary",
        description: "You have successfully posted on Nexus!",
        hideIcon: true,
        timeout: 3000,
        shouldShowTimeoutProgess: true,
      });
      setChangeDescription(false);
    }
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
                    content="Note: You can change your information in settings :)"
                    color="primary"
                    showArrow
                  >
                    <User
                      name={
                        <span className="text-2xl font-bold underline">
                          {userInformation.fullName}
                        </span>
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
                {changeDescription ? (
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
                    <Button
                      onPress={setNewDescription}
                      variant="bordered"
                      size="sm"
                      color="primary"
                    >
                      Change Description
                    </Button>
                  </>
                ) : (
                  userInformation.description
                )}
              </div>
              <div className="grid grid-cols-2">
                <Button
                  onPress={() => setChangeDescription(!changeDescription)}
                  variant="bordered"
                  color="primary"
                >
                  Edit Description
                </Button>
                <div className="grid col-span-1">
                  <Button variant="bordered" color="primary">
                    Share Profile
                  </Button>
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
