import ContentFeed from "@/components/Feed Page/Content/ContentFeed";
import FollowSection from "@/components/Feed Page/Rightside Bar/FollowSection";
import Sidebar from "@/components/Feed Page/Sidebar/Sidebar";

const Home = () => {
  return (
    <>
      <div className="py-20 px-20">
        <div className="grid grid-cols-5">
          <div className="grid col-span-1">
            <Sidebar />
          </div>
          <div className="grid col-span-3">
            <ContentFeed />
          </div>
          <div className="grid col-span-1">
            <FollowSection />
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
