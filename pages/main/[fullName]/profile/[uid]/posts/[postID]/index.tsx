import FollowSection from "@/components/Feed Page/Rightside Bar/FollowSection";
import Sidebar from "@/components/Feed Page/Sidebar/Sidebar";
import { Card, CardBody } from "@heroui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Post = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState<string | null>(null);
  const [uid, setUid] = useState<string | null>(null);
  const [postID, setPostID] = useState<string | null>(null);

  useEffect(() => {
    if (router.isReady) {
      const { fullName, uid, postID } = router.query;
      setFullName(decodeURIComponent(fullName as string));
      setUid(uid as string);
      setPostID(postID as string);
    }
  }, [router.isReady, router.query]);

  return (
    <div className="grid grid-cols-5 py-20 px-20">
      <div className="grid col-span-1">
        <Sidebar />
      </div>
      <div className="grid col-span-3">
        <Card>
          <CardBody></CardBody>
        </Card>
      </div>
      <div className="grid col-span-1">
        <FollowSection />
      </div>
    </div>
  );
};
export default Post;
