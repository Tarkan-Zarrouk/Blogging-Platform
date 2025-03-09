import FollowSection from "@/components/Feed Page/Rightside Bar/FollowSection";
import Sidebar from "@/components/Feed Page/Sidebar/Sidebar";
import { Card, CardBody, CardHeader, User } from "@heroui/react";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/utils/firebase/Firebase";

const Explore = () => {
  const [postInfo, setPostInfo] = useState<
    { id: string; [key: string]: any }[]
  >([]);
  const [user, setUser] = useState();
  useEffect(() => {
    const unsubscribe = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const posts: { id: string; [key: string]: any }[] = [];
      querySnapshot.forEach((doc) => {
        posts.push({ id: doc.id, ...doc.data() });
      });
      setPostInfo(posts);
    };
    unsubscribe();
  }, []);
  console.log(postInfo);
  return (
    <>
      <div className="grid grid-cols-5 py-20 px-20">
        <div className="grid col-span-1">
          <Sidebar />
        </div>
        <div className="grid col-span-3">
          <Card className="p-5">
            <CardHeader className="flex flex-col items-start">
              <h1 className="text-2xl font-bold underline underline-offset-2">
                Explore
              </h1>
              <p className="text-lg font-light">
                Explore all the posts that are available to you :)
              </p>
            </CardHeader>
            <CardBody>
              {postInfo.map((post: any, index: number) => (
                <div className="mt-5">
                  <Card key={index}>
                    <CardHeader>
                        {/* <User avatarProps={{ src: post.user.profilePicture }} /> */}
                    </CardHeader>
                    <CardBody>
                    {post.text}
                    </CardBody>
                  </Card>
                </div>
              ))}
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

export default Explore;
