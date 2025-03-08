import { Attachment } from "@/components/icons/PostIcons/Attachment";
import { auth, db } from "@/utils/firebase/Firebase";
import {
  Input,
  Button,
  addToast,
  Card,
  CardHeader,
  CardBody,
  User,
  Pagination,
} from "@heroui/react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";

const ContentFeed: React.FC = () => {
  const [content, setContent] = useState<{
    uid: string;
    text: string;
    attachment: string;
    userAccounts: any[];
  }>({
    uid: "",
    text: "",
    attachment: "",
    userAccounts: [],
  });
  const [isClient, setIsClient] = useState(false);
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userQuery: any = query(collection(db, "users"));
        let snapshot = await getDocs(userQuery);
        let allUserAccounts: any[] = [];
        snapshot.docs.forEach((doc) => {
          allUserAccounts.push(doc.data());
        });
        setContent((prevContent) => ({
          ...prevContent,
          uid: user.uid,
          userAccounts: allUserAccounts,
        }));
      }
    });
    return () => {
      unsubscribe();
      setIsClient(true);
    };
  }, []);

  const handlePostAttachment = (e: any) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setContent((prevContent) => ({
          ...prevContent,
          attachment: base64String,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = () => {
    if (content.text === "" && content.attachment === "") {
      addToast({
        title: "Error",
        description: "You cannot post an empty post.",
        color: "danger",
      });
      return;
    } else if (content.text.length > 500) {
      addToast({
        title: "Error",
        description: "Your post cannot exceed 500 characters.",
        color: "danger",
      });
      return;
    }

    const userRef = doc(db, "users", content.uid);
    const postRef = collection(userRef, "posts");
    const newPost = {
      uid: content.uid,
      text: content.text,
      attachment: content.attachment,
      date: new Date().toISOString(),
      likes: [],
      comments: [],
    };
    addDoc(postRef, newPost)
      .then(() => {
        getDoc(userRef)
          .then((userDoc) => {
            if (userDoc.exists()) {
              const userData = userDoc.data();
              const updatedPosts = [newPost];
              if (userData.posts) {
                updatedPosts.push(...userData.posts);
              }
              updateDoc(userRef, {
                posts: updatedPosts,
              });
            }
          })
          .catch((e) => {
            addToast({
              title: "Error",
              description: "Oops, an error as occured: " + e,
              color: "danger",
              shouldShowTimeoutProgress: true,
              timeout: 3000,
            });
          });
        addToast({
          title: "Post created",
          description: "Your post has been created successfully.",
          color: "primary",
        });
      })
      .catch((error) => {
        addToast({
          title: "Error",
          description:
            "An error occurred while creating your post. Error: " + error,
          color: "danger",
        });
      });
  };

  return (
    <div className="flex flex-col items-start justify-start p-4">
      <Input
        variant="faded"
        color="primary"
        placeholder="What's on your mind today?"
        value={content.text}
        onChange={(e) => {
          setContent((prev) => ({ ...prev, text: e.target.value }));
        }}
        endContent={
          isClient && (
            <div className="flex flex-row items-center gap-x-5">
              <label htmlFor="file-upload" className="cursor-pointer">
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handlePostAttachment}
                />
                <Button as="span" color="primary" variant="light" isIconOnly>
                  <Attachment />
                </Button>
              </label>
              <Button
                onPress={handlePost}
                color="primary"
                size="sm"
                variant="bordered"
              >
                Post
              </Button>
            </div>
          )
        }
      />
      <h1 className="text-md font-light underline">
        Here's where your content will be displayed:
      </h1>
      <div className="mx-auto w-full">
        {(() => {
          const paginatedPosts = content.userAccounts
            .flatMap(
              (account: any) =>
                account.posts?.map((post: any) => ({
                  ...post,
                  user: account,
                })) || []
            )
            .sort(() => Math.random() - 0.5)
            .slice(
              (currentPage - 1) * ITEMS_PER_PAGE,
              currentPage * ITEMS_PER_PAGE
            );

          return (
            <>
              {paginatedPosts.map((post: any, postIndex: number) => (
                <Card className="mt-5 mx-auto" key={postIndex}>
                  <CardHeader>
                    <User
                      name={post.user.fullName}
                      avatarProps={{ src: post.user.profilePicture }}
                    />
                  </CardHeader>
                  <CardBody>
                    <p>{post.text}</p>
                    {post.attachment && (
                      <img
                        src={post.attachment}
                        alt="post"
                        className="w-fit h-52 mx-auto"
                      />
                    )}
                  </CardBody>
                </Card>
              ))}
              <div className="flex justify-center mt-4">
                <Pagination
                  initialPage={1}
                  showControls={true}
                  total={Math.ceil(
                    content.userAccounts.flatMap(
                      (account: any) => account.posts || []
                    ).length / ITEMS_PER_PAGE
                  )}
                  onChange={(page) => setCurrentPage(page)}
                />
              </div>
            </>
          );
        })()}
      </div>
    </div>
  );
};

export default ContentFeed;
