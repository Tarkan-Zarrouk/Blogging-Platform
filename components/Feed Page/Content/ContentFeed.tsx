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
} from "@heroui/react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";

const ContentFeed: React.FC = () => {
  const [content, setContent] = useState<{
    uid: string;
    text: string;
    attachment: string;
    posts: { date: string; text: string; attachment: string }[];
  }>({
    uid: "",
    text: "",
    attachment: "",
    posts: [],
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setContent((prevContent) => ({ ...prevContent, uid: user.uid }));
      }
    });

    const fetchPosts = async () => {
      const postsRef = collection(db, "users");
      const postsSnapshot = await getDocs(postsRef);

      postsSnapshot.forEach((doc) => {
        const postData = doc.data();
        console.log(postData.posts);
        // setContent((prevContent) => ({
        //   ...prevContent,
        //   posts: [
        //     ...prevContent.posts,
        //     {
        //       date: postData.date,
        //       text: postData.text,
        //       attachment: postData.attachment,
        //     },
        //   ],
        // }));
      });
      // console.log(content);
    };

    fetchPosts();
    setIsClient(true);
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

    const postRef = collection(db, "posts");
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
        const userRef = doc(db, "users", content.uid);
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
              shouldShowTimeoutProgess: true,
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
      <div className="">
        {/* {content.posts.map((post, index) => (
          <Card key={index}>{post.text}</Card>
        ))} */}
      </div>
    </div>
  );
};

export default ContentFeed;
