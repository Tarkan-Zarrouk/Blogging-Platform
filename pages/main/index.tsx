import ContentFeed from "@/components/Feed Page/Content/ContentFeed";
import ProfileSection from "@/components/Feed Page/Rightside Bar/ProfileSection";
import Sidebar from "@/components/Feed Page/Sidebar/Sidebar";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useEffect, useState } from "react";

const Home = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <div className="py-20 px-20">
        <div className="grid grid-cols-5">
          <div className="grid col-span-1">
            <Sidebar />
          </div>
          <div className="grid col-span-3">
            <Input
              variant="faded"
              color="primary"
              placeholder="What's on your mind today?"
              endContent={
                isClient && (
                  <Button color="primary" size="sm" variant="bordered">
                    Post
                  </Button>
                )
              }
            />
            <ContentFeed />
          </div>
          <div className="grid col-span-1">
            <ProfileSection />
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
