import { BookmarksIcon } from "@/components/icons/SidebarIcons/BookmarksIcon";
import { CreatePostIcon } from "@/components/icons/SidebarIcons/CreatePostIcon";
import { ExploreIcon } from "@/components/icons/SidebarIcons/ExploreIcon";
import { HomeIcon } from "@/components/icons/SidebarIcons/HomeIcon";
import { Button } from "@heroui/react";
import Link from "next/link";

export const SidebarMenuItemsComponent = () => {
  return (
    <>
      <Link href="/main">
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
      </Link>
      <Link href="/main/explore/">
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
      </Link>
      <Link href="/main/bookmarks/">
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
      </Link>
    </>
  );
};
