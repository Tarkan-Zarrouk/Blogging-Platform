import { BookmarksIcon } from "@/components/icons/SidebarIcons/BookmarksIcon";
import { HomeIcon } from "@/components/icons/SidebarIcons/HomeIcon";
import { SearchIcon } from "@/components/icons/SidebarIcons/SearchIcon";
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
      <Link href="/main/search">
        <Button
          className="w-full font-bold text-xl flex justify-between hover:-translate-y-1"
          variant="light"
          startContent={
            <>
            <SearchIcon />
            </>
          }
        >
          Search
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
