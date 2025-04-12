import { Button } from "@heroui/button";
import Image from "next/image";
import { useRouter } from "next/router";

const ErrorSite = () => {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col min-h-screen justify-center items-center">
        <Image src="/404Bot.png" alt="404 Error" width={500} height={500} />
        <h1 className="text-[75px] font-bold text-gray-800">Page Not Found!</h1>
        <h4 className="text-[25px]">Don't worry, we all make mistakes.</h4>
        <Button
          variant="shadow"
          color="primary"
          onPress={() => router.push("/")}
        >
          Go Back
        </Button>
      </div>
    </>
  );
};

export default ErrorSite;
