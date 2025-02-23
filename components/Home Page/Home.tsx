import { useState, useEffect } from "react";
import HomeIconCellPhone from "../icons/HomeIconCellPhone";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { User } from "@heroui/user";
import { Skeleton } from "@heroui/skeleton";
import { Button } from "@heroui/button";
import DownArrowIcon from "../icons/DownArrowIcon";
import ThreeDotsMenuIcon from "../icons/ThreeDotsMenuIcon";

const Home: React.FC = () => {
  const [buttonSize, setButtonSize] = useState<"sm" | "lg" | "md" | undefined>(
    typeof window !== "undefined" && window.innerWidth < 1024 ? "sm" : "lg"
  );

  useEffect(() => {
    const handleResize = () => {
      setButtonSize(window.innerWidth < 1024 ? "sm" : "lg");
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);
  return (
    <>
      <div className="grid text-center mt-32 w-full sm:mt-52 grid-cols-1 xl:grid-cols-2 justify-center px-24">
        <div>
          <h1 className="xl:text-[65px] text-[35px] font-bold text-gray-800">
            Connect with the world.{" "}
            <span className="text-blue-500">
              Let your ideas{" "}
              <span className="underline animate-pulse">grow</span>.
            </span>
          </h1>
          <div className="p-5">
            <p className="text-md xl:text-lg text-gray-800 font-semibold">
              Where Connections Thrive and Innovation Flourishes.
            </p>
          </div>
          <div className="flex gap-10 justify-center">
            <Button
              size={buttonSize}
              variant="shadow"
              color="primary"
              className="flex justify-center font-extrabold text-gray-100 text-md animate-pulse hover:-translate-y-1"
            >
              Sign Up
            </Button>
            <Button
              size={buttonSize}
              variant="faded"
              color="secondary"
              className="flex justify-center font-extrabold text-gray-800 text-md animate-pulse hover:-translate-y-1"
            >
              Login
            </Button>
          </div>
        </div>
        <div className="sm:w-[500px] animate-pulse hidden xl:block">
          <Card className="rotate-[35deg] position-relative left-36 top-15">
            <CardHeader>
              <div className="grid grid-cols-2 w-full">
                <div className="grid col-span-1 justify-between">
                  <User
                    avatarProps={{
                      src: "https://img.freepik.com/premium-photo/face-young-handsome-bearded-man_251136-35800.jpg",
                    }}
                    name="John Machoviski"
                    description="Software Engineer"
                  />
                </div>
                <div className="grid col-span-1 justify-end">
                  <Button variant="light" isIconOnly>
                    <ThreeDotsMenuIcon />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                <Skeleton className="w-3/5 rounded-lg">
                  <div className="h-3 rounded-lg bg-default-200" />
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg">
                  <div className="h-3 w-4/5 rounded-lg bg-default-200" />
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">
                  <div className="h-3 w-2/5 rounded-lg bg-default-300" />
                </Skeleton>
              </div>
            </CardBody>
            <CardFooter>
              <div className="w-full">
                <Skeleton className="w-full rounded-lg">
                  <div className="h-3 w-2/5 rounded-lg bg-default-300" />
                </Skeleton>
              </div>
            </CardFooter>
          </Card>
          <HomeIconCellPhone />
        </div>
        <Button
          isIconOnly
          className="fixed bottom-10 right-1/2 transform translate-x-1/2 translate-y-1/2 animate-bounce transition-opacity duration-500"
          onClick={() => {
            const homeSection = document.getElementById("about");
            if (homeSection) {
              homeSection.scrollIntoView({ behavior: "smooth" });
              const button = document.querySelector(".fixed.bottom-10");
              if (button) {
                button.classList.add("hidden");
              }
            }
          }}
        >
          <DownArrowIcon />
        </Button>
      </div>
    </>
  );
};
export default Home;
