import {
  ResetPasswordErrorState,
  ResetPasswordInformation,
} from "@/interfaces";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Form,
  Input,
} from "@heroui/react";
import Link from "next/link";
import { useState } from "react";

const ResetPassword: React.FC = () => {
  const [userInformation, setUserInformation] =
    useState<ResetPasswordInformation>({
      userName: "",
      email: "",
    });
  const [errorState, setErrorState] = useState<ResetPasswordErrorState>({
    userNameError: "",
    emailError: "",
    userNameErrorBool: false,
    emailErrorBool: false,
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
        emailError: "Please enter a valid email address.",
      });
    } else {
      setErrorState({
        ...errorState,
        emailErrorBool: false,
        emailError: "",
      });
    }
  };

  const handleUserNameChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let userNameValue = (e.target as HTMLInputElement).value; // constant update
    if (userNameValue.length < 5) {
      setErrorState({
        ...errorState,
        userNameError: "Please enter a valid username!",
        userNameErrorBool: true,
      });
    } else {
      setErrorState({
        ...errorState,
        userNameError: "",
        userNameErrorBool: false,
      });
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Card className="p-4">
          <Form>
            <CardHeader className="justify-center flex-col">
              <h1 className="text-2xl font-bold">Reset your password</h1>
              <h4 className="text-lg font-light">
                Obtain a password reset email through here.
              </h4>
            </CardHeader>
            <CardBody className="gap-y-5">
              <Input
                isInvalid={errorState.userNameErrorBool}
                errorMessage={errorState.userNameError}
                onKeyUp={handleUserNameChange}
                onChange={handleInputChange}
                placeholder="xXCoolKidXx123_"
                type="name"
                name="userName"
                label="Username"
                labelPlacement="outside"
                variant="underlined"
                color="primary"
                isClearable
                isRequired
              />
              <Input
                isInvalid={errorState.emailErrorBool}
                errorMessage={errorState.emailError}
                onKeyUp={handleEmailChange}
                onChange={handleInputChange}
                type="email"
                name="email"
                color="primary"
                variant="underlined"
                label="Email"
                labelPlacement="outside"
                placeholder="johndoe@example.com"
                isClearable
                isRequired
              />
            </CardBody>
            <CardFooter className="justify-center flex flex-col gap-y-5">
              <Button color="primary" variant="faded">
                Reset Password
              </Button>
              <Link href="/login">
                <p className="text-[15px]">
                  Remember your password?{" "}
                  <span className="text-blue-500 underline animate-pulse">
                    Sign in here.
                  </span>
                </p>
              </Link>
            </CardFooter>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default ResetPassword;
