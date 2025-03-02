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
        console.log("File reading completed", reader.result?.toString().substring(0, 50) + "...");
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
    getDoc(doc(db, "users", content.uid)).then((docSnap) => {
      if (docSnap.exists()) {
        const postsCollectionRef = collection(
          db,
          "users",
          content.uid,
          "posts"
        );
        const timestamp = new Date().toISOString();
        const postDocRef = doc(postsCollectionRef, `post_${timestamp}`);
        setDoc(postDocRef, {
          text: content.text,
          attachment: content.attachment,
          createdAt: timestamp,
        })
          .then(() => {
            addToast({
              title: "Posted!",
              color: "primary",
              description: "You have successfully posted on Nexus!",
              hideIcon: true,
              timeout: 3000,
              shouldShowTimeoutProgess: true,
            });
          })
          .catch((error) => {
            addToast({
              title: "Registration Unsuccessful",
              color: "danger",
              description: "Error: " + error + "!",
              hideIcon: true,
              timeout: 3000,
              shouldShowTimeoutProgess: true,
            });
          });
      }
    });
  };

  return (
    <div className="flex flex-col items-start justify-start p-4">
      <Input
        variant="faded"
        color="primary"
        placeholder="What's on your mind today?"
        value={content.text}
        onChange={(e) =>
          setContent((prev) => ({ ...prev, text: e.target.value }))
        }
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
