import FollowSection from "@/components/Feed Page/Rightside Bar/FollowSection";
import Sidebar from "@/components/Feed Page/Sidebar/Sidebar";
import { EmptyIcon } from "@/components/icons/GeneralIcons/Empty";
import { auth, db } from "@/utils/firebase/Firebase";
import { Card, CardBody, CardHeader, Spinner, Tooltip } from "@heroui/react";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";

const Bookmarks = () => {
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const uid = user.uid;
        try {
          const docSnapshot = await getDoc(doc(db, "users", uid));
          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            if (data.bookmarkedPosts) {
              setBookmarkedPosts(data.bookmarkedPosts);
            }
          }
        } catch (error) {
          console.error("Error fetching bookmarked posts:", error);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="py-20 px-20 grid grid-cols-5">
      <div className="grid col-span-1">
        <Sidebar />
      </div>
      <div className="grid col-span-3">
        <Card className="p-5">
          <CardHeader className="flex flex-col items-start">
            <h1 className="text-2xl font-bold underline">Bookmarked Posts</h1>
            <p className="text-light">
              Here's the post you wanted to bookmark on!
            </p>
          </CardHeader>
          <CardBody>
            {loading ? (
              <Spinner />
            ) : (
              <div className="grid grid-cols-3 gap-x-5 items-center justify-center">
                {bookmarkedPosts.length > 0 ? (
                  bookmarkedPosts.map((post, index) => (
                    <div
                      className="grid col-span-1 justify-self-center"
                      key={index}
                    >
                      <Link
                        href={"/main/bookmarks/" + post.ownerUID + "/" + index}
                      >
                        <Tooltip content="Click to view post!" showArrow>
                          <Card>
                            {post.attachment && (
                              <img alt="post" src={post.attachment} />
                            )}
                          </Card>
                        </Tooltip>
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="mx-auto text-center">
                    <EmptyIcon className="w-[533.33px] mx-auto" />
                    <h1>
                      Looks pretty empty here...{" "}
                      <Link
                        className="text-blue-500 animate-pulse hover:underline"
                        href="/main/"
                      >
                        Click here
                      </Link>{" "}
                      to go back to your feed.
                    </h1>
                  </div>
                )}
              </div>
            )}
          </CardBody>
        </Card>
      </div>
      <div className="grid col-span-1">
        <FollowSection />
      </div>
    </div>
  );
};

export default Bookmarks;
