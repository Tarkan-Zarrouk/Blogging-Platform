import { BookmarksIcon } from "@/components/icons/SidebarIcons/BookmarksIcon";
import { CreatePostIcon } from "@/components/icons/SidebarIcons/CreatePostIcon";
import { ExploreIcon } from "@/components/icons/SidebarIcons/ExploreIcon";
import { HomeIcon } from "@/components/icons/SidebarIcons/HomeIcon";
import { Button } from "@heroui/react";

export const SidebarMenuItemsComponent = () => {
  return (
    <>
      <Button
        className="w-full font-bold text-xl flex justify-between hover:-translate-y-1"
        variant="light"
        startContent={
          <>
            <HomeIcon />
          </>
        }
      >
        Home
      </Button>
      <Button
        className="w-full font-bold text-xl flex justify-between hover:-translate-y-1"
        variant="light"
        startContent={
          <>
            <ExploreIcon />
          </>
        }
      >
        Explore
      </Button>
      <Button
        className="w-full font-bold text-xl flex justify-between hover:-translate-y-1"
        variant="light"
        startContent={
          <>
            <CreatePostIcon />
          </>
        }
      >
        Create Post
      </Button>
      <Button
        className="w-full font-bold text-xl flex justify-between hover:-translate-y-1"
        variant="light"
        startContent={
          <>
            <BookmarksIcon />
          </>
        }
      >
        Bookmarks
      </Button>
    </>
  );
};
