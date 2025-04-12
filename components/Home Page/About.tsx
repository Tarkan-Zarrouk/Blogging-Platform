import { Button } from "@heroui/button";
import React from "react";

import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Avatar } from "@heroui/avatar";
import Image from "next/image";
import { useRouter } from "next/router";

const About: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <div id="about">
        <div className="px-4 lg:px-20 py-10 lg:py-0">
          <div className="lg:grid lg:grid-cols-2 gap-10">
            <div className="col-span-1 text-center lg:text-left">
              <h1 className="text-4xl font-semibold">
                Connecting You To The{" "}
                <span className="text-blue-500 font-extrabold underline">
                  World
                </span>
                .
              </h1>
              <p className="text-xl font-light mt-4">
                At Nexus, we believe that social media should be more than just
                a feed of updates—it should be a hub for genuine interactions
                and community-driven engagement.
              </p>
              <div className="my-10">
                <Button
                  variant="shadow"
                  size="lg"
                  color="primary"
                  className="mx-auto lg:mx-0 animate-pulse"
                  onPress={() => router.push("/register")}
                >
                  Get Started
                </Button>
              </div>
            </div>
            <div className="col-span-1 flex flex-col items-center lg:items-start">
              <Card className="max-w-[340px] rotate-6 my-10">
                <CardHeader className="justify-between">
                  <div className="flex gap-5">
                    <Avatar
                      isBordered
                      radius="full"
                      size="md"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTkiJynFzTafJO5pFg-TiwarkenthQKlbFCQ&s"
                    />
                    <div className="flex flex-col gap-1 items-start justify-center">
                      <h4 className="text-small font-semibold leading-none text-default-600">
                        Zoey Lang
                      </h4>
                      <h5 className="text-small tracking-tight text-default-400">
                        @zoeylang
                      </h5>
                    </div>
                  </div>
                  <Button
                    color="primary"
                    radius="full"
                    size="sm"
                    variant="shadow"
                  >
                    Follow
                  </Button>
                </CardHeader>
                <CardBody className="px-3 py-0 text-small text-default-400">
                  <p>
                    Frontend developer and UI/UX enthusiast. Join me on this
                    coding adventure!
                  </p>
                </CardBody>
                <CardFooter className="gap-3">
                  <div className="flex gap-1">
                    <p className="font-semibold text-default-400 text-small">
                      4
                    </p>
                    <p className=" text-default-400 text-small">Following</p>
                  </div>
                  <div className="flex gap-1">
                    <p className="font-semibold text-default-400 text-small">
                      97.1K
                    </p>
                    <p className="text-default-400 text-small">Followers</p>
                  </div>
                </CardFooter>
              </Card>
              <Card className="max-w-[340px] -rotate-6">
                <CardHeader className="justify-between">
                  <div className="flex gap-5">
                    <Avatar
                      isBordered
                      radius="full"
                      size="md"
                      src="https://naccnaca-biographies.s3.amazonaws.com/18103/zoey-roy.jpg"
                    />
                    <div className="flex flex-col gap-1 items-start justify-center">
                      <h4 className="text-small font-semibold leading-none text-default-600">
                        Molly Jones
                      </h4>
                      <h5 className="text-small tracking-tight text-default-400">
                        @mllyjnsxx
                      </h5>
                    </div>
                  </div>
                  <Button
                    color="warning"
                    radius="full"
                    size="sm"
                    variant="bordered"
                  >
                    Unfollow
                  </Button>
                </CardHeader>
                <CardBody className="px-3 py-0 text-small text-default-400">
                  <p>Passionate Designer and Farmlife Enjoyer!</p>
                </CardBody>
                <CardFooter className="gap-3">
                  <div className="flex gap-1">
                    <p className="font-semibold text-default-400 text-small">
                      1.5k
                    </p>
                    <p className=" text-default-400 text-small">Following</p>
                  </div>
                  <div className="flex gap-1">
                    <p className="font-semibold text-default-400 text-small">
                      487.2K
                    </p>
                    <p className="text-default-400 text-small">Followers</p>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 my-20">
            <div className="col-span-1 -rotate-3">
              <Image
                width={700}
                height={700}
                src="https://help.kajabi.com/hc/article_attachments/20445720719515"
                alt=""
              />
            </div>
            <div className="col-span-1 text-center lg:text-left">
              <h1 className="text-4xl font-semibold">
                Your Social Hub,{" "}
                <span className="text-blue-500 font-extrabold underline">
                  Enhanced <span className="underline">Daily</span>
                </span>
                .
              </h1>
              <h4 className="text-2xl font-light mt-4">
                Seamless connections, smarter tools, and a better way to
                engage—every day, Nexus evolves with you.
              </h4>
              <div className="my-10">
                <Button
                  variant="shadow"
                  size="lg"
                  color="primary"
                  onPress={() => router.push("/register")}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
          <div className="px-4 lg:px-20 my-20">
            <div className="mb-5">
              <h1 className="text-4xl font-semibold text-center">
                What We Offer 🚀
              </h1>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="col-span-1">
                <Card className="hover:-translate-y-3">
                  <CardHeader className="justify-center border-b-2">
                    <h3 className="font-bold text-2xl text-gray-800">
                      Customizable Feeds
                    </h3>
                  </CardHeader>
                  <CardBody>
                    <p className="font-light text-center">
                      Personalize your experience by curating content based on
                      your interests.
                    </p>
                  </CardBody>
                  <CardFooter className="justify-center">
                    <Button
                      variant="shadow"
                      color="primary"
                      onPress={() => router.push("/register")}
                    >
                      Get Started
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              <div className="col-span-1">
                <Card className="hover:-translate-y-3">
                  <CardHeader className="justify-center border-b-2">
                    <h3 className="font-bold text-2xl text-gray-800">
                      Community-Centric Spaces
                    </h3>
                  </CardHeader>
                  <CardBody>
                    <p className="font-light text-center">
                      Join or create groups around shared passions and ideas.
                    </p>
                  </CardBody>
                  <CardFooter className="justify-center">
                    <Button
                      variant="shadow"
                      color="secondary"
                      onPress={() => router.push("/register")}
                    >
                      Get Started
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              <div className="col-span-1">
                <Card className="hover:-translate-y-3">
                  <CardHeader className="justify-center border-b-2">
                    <h3 className="font-bold text-2xl text-gray-800">
                      Seamless Media Sharing
                    </h3>
                  </CardHeader>
                  <CardBody>
                    <p className="font-light text-center">
                      Effortlessly upload and share photos, videos, and live
                      streams with your audience.
                    </p>
                  </CardBody>
                  <CardFooter className="justify-center">
                    <Button
                      variant="shadow"
                      color="default"
                      onPress={() => router.push("/register")}
                    >
                      Get Started
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
          <div className="px-4 lg:px-20 my-20">
            <div className="mb-5">
              <h1 className="text-4xl font-semibold text-center">
                What We Can Guarantee ✅
              </h1>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="col-span-1">
                <Card className="hover:-translate-y-3">
                  <CardHeader className="justify-center border-b-2">
                    <h3 className="font-bold text-2xl text-gray-800">
                      End to End Messaging
                    </h3>
                  </CardHeader>
                  <CardBody>
                    <p className="font-light text-center">
                      Stay connected with friends and colleagues through private
                      and group chats.
                    </p>
                  </CardBody>
                  <CardFooter className="justify-center">
                    <Button
                      variant="shadow"
                      color="primary"
                      onPress={() => router.push("/register")}
                    >
                      Get Started
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              <div className="col-span-1">
                <Card className="hover:-translate-y-3">
                  <CardHeader className="justify-center border-b-2">
                    <h3 className="font-bold text-2xl text-gray-800">
                      Community-Centric Spaces
                    </h3>
                  </CardHeader>
                  <CardBody>
                    <p className="font-light text-center">
                      Stay connected with friends and colleagues through private
                      and group chats.
                    </p>
                  </CardBody>
                  <CardFooter className="justify-center">
                    <Button
                      variant="shadow"
                      color="secondary"
                      onPress={() => router.push("/register")}
                    >
                      Get Started
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              <div className="col-span-1">
                <Card className="hover:-translate-y-3">
                  <CardHeader className="justify-center border-b-2">
                    <h3 className="font-bold text-2xl text-gray-800">
                      No Data Selling Policy
                    </h3>
                  </CardHeader>
                  <CardBody>
                    <p className="font-light text-center">
                      Your information belongs to you—we do not sell user data
                      to advertisers.
                    </p>
                  </CardBody>
                  <CardFooter className="justify-center">
                    <Button
                      variant="shadow"
                      color="default"
                      onPress={() => router.push("/register")}
                    >
                      Get Started
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
