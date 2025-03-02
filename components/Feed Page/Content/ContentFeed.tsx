import { Attachment } from "@/components/icons/PostIcons/Attachment";
import { auth, db } from "@/utils/firebase/Firebase";
import { Input, Button, Card, addToast } from "@heroui/react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";

const ContentFeed: React.FC = () => {
  const [content, setContent] = useState({
    uid: "",
    text: "",
    attachment: "",
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setContent({ ...content, uid: user.uid });
      }
    });
    setIsClient(true);
  }, []);

  const handlePostAttachment = (e: any) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      console.log("A");
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log(
          "File reading completed",
          reader.result?.toString().substring(0, 50) + "..."
        );
        const base64String = reader.result as string;
        setContent((prevContent) => ({
          ...prevContent,
          attachment: base64String,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      console.log("e");
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
    // Add post to users/userId --> field "posts" --> array of postIds
    const postRef = collection(db, "posts");
    addDoc(postRef, {
      uid: content.uid,
      text: content.text,
      attachment: content.attachment,
      likes: [],
      comments: [],
    })
      .then((docRef) => {
        const userRef = doc(db, "users", content.uid);
        getDoc(userRef).then((userDoc) => {
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const updatedPosts = [
              new Date() + ", " + content.text + ", " + content.attachment,
            ];
            if (userData.posts) {
              updatedPosts.push(...userData.posts);
            }
            updateDoc(userRef, {
              posts: updatedPosts,
            });
            console.log(userData.posts);
          }
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
      <div className="">{}</div>
    </div>
  );
};

export default ContentFeed;
