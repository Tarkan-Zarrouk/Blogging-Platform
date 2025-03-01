import { LoginErrorResponder, LoginUserInformation } from "@/utils/interfaces";
import { doSignInWithEmailAndPassword } from "@/utils/ConfigFunctions";
import {
  addToast,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import EyeOpenIcon from "@/components/icons/EyeOpenIcon";
import EyeClosedIcon from "@/components/icons/EyeClosedIcon";

const LoginPage: React.FC = () => {
  const [userInformation, setUserInformation] = useState<LoginUserInformation>({
    email: "",
    password: "",
  });
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    if (router.query.registered) {
      addToast({
        title: "Registration Successful",
        description: "You have successfully registered to Nexus!",
        hideIcon: true,
        timeout: 3000,
        shouldShowTimeoutProgess: true,
      });
    }
  }, [router.query, addToast]);

  const [errorState, setErrorState] = useState<LoginErrorResponder>({
    emailErrorBool: false,
    passwordErrorBool: false,
    emailErrorMessage: "",
    passwordErrorMessage: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInformation({
      ...userInformation,
      [e.target.name]: e.target.value,
    });
  };
  const testEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!testEmail(e.currentTarget.value)) {
      setErrorState({
        ...errorState,
        emailErrorBool: true,
        emailErrorMessage: "Please enter a valid email address.",
      });
    } else {
      setErrorState({
        ...errorState,
        emailErrorBool: false,
        emailErrorMessage: "",
      });
    }
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInformation({
      ...userInformation,
      [e.target.name]: e.target.value,
    });
  };

  const signInUser = async () => {
    if (!testEmail(userInformation.email)) {
      setErrorState({
        ...errorState,
        emailErrorBool: true,
        emailErrorMessage: "Please enter a valid email address.",
      });
      return;
    }

    if (userInformation.password.length < 8) {
      setErrorState({
        ...errorState,
        passwordErrorBool: true,
        passwordErrorMessage:
          "Please enter a password that is greater than 8 characters in length!",
      });
      return;
    }

    const userCreds = await doSignInWithEmailAndPassword(
      userInformation.email,
      userInformation.password
    );

    if (userCreds) {
      router.push("/main");
    } else {
      alert("Invalid email or password.");
    }
  };

  // const handlePasswordValidation = (
  //   e: React.KeyboardEvent<HTMLInputElement>
  // ) => {
  //   let passwordValue = (e.target as HTMLInputElement).value;
  //   if (passwordValue.length < 8) {
  //     setErrorState({
  //       ...errorState,
  //       passwordErrorMessage:
  //         "Please enter a password that is greater than 8 characters in length!",
  //       passwordErrorBool: true,
  //     });
  //   } else {
  //     setErrorState({
  //       ...errorState,
  //       passwordErrorMessage: "",
  //       passwordErrorBool: false,
  //     });
  //   }
  // };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Card className="p-5">
          <CardHeader className="justify-center flex flex-col">
            <h1 className="text-2xl font-bold">Sign In</h1>
            <h4 className="text-lg font-light">Welcome back.</h4>
          </CardHeader>
          <CardBody className="gap-y-5">
            <Input
              isInvalid={errorState.emailErrorBool}
              errorMessage={errorState.emailErrorMessage}
              onKeyUp={handleEmailChange}
              onChange={handleInputChange}
              type="email"
              name="email"
              color="primary"
              variant="underlined"
              label="Email"
              labelPlacement="outside"
              placeholder="johndoe@example.com"
              isRequired
            />
            <Input
              isInvalid={errorState.passwordErrorBool}
              errorMessage={errorState.passwordErrorMessage}
              onChange={handlePasswordChange}
              placeholder="SomeCoolPassword123!"
              type={isVisible ? "password" : "text"}
              name="password"
              label="Password"
              labelPlacement="outside"
              variant="underlined"
              color="primary"
              endContent={
                <>
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    onPress={() => setIsVisible(!isVisible)}
                  >
                    {isVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
                  </Button>
                </>
              }
              isRequired
            />
          </CardBody>
          <CardFooter className="justify-center flex flex-col gap-y-5">
            <Button onPress={signInUser} color="primary" variant="faded">
              Sign In
            </Button>
            <p className="text-[15px]">
              Don't have an account?{" "}
              <Link href="/register">
                <span className="text-blue-500 underline animate-pulse">
                  Click Here
                </span>
              </Link>
            </p>
            <p className="text-[15px]">
              Forgot your password? Please{" "}
              <Link href="/reset-password">
                <span className="text-blue-500 underline animate-pulse">
                  Click Here
                </span>
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default LoginPage;
