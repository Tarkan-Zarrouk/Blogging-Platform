import { Input, Button } from "@heroui/react";
import { useState, useEffect } from "react";

const ContentFeed: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div className="flex flex-col items-start justify-start p-4">
      <Input
        variant="faded"
        color="primary"
        placeholder="What's on your mind today?"
        endContent={
          isClient && (
            <Button color="primary" size="sm" variant="bordered">
              Post
            </Button>
          )
        }
      />
      <h1 className="text-md font-light underline">
        Here's where your content will be displayed:
      </h1>
    </div>
  );
};

export default ContentFeed;
