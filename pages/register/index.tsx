import { UserInformation, RegisterErrorResponder } from "@/interfaces";
import { doCreateUserWithEmailAndPassword } from "@/utils/ConfigFunctions";
import { db } from "@/utils/Firebase";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Form,
  Input,
} from "@heroui/react";
import { doc, setDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import uuid from "uuid-random";

const Register: React.FC = () => {
  const [userInformation, setUserInformation] = useState<UserInformation>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });
  const [errorState, setErrorState] = useState<RegisterErrorResponder>({
    fullNameErrorBool: false,
    emailErrorBool: false,
    passwordErrorBool: false,
    confirmPasswordErrorBool: false,
    termsAcceptedErrorBool: false,
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: "",
  });
  const [registered, isRegistered] = useState<Boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInformation({
      ...userInformation,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInformation({
      ...userInformation,
      termsAccepted: e.target.checked,
    });
  };

  const handleFullNameChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let fullNameValue = (e.target as HTMLInputElement).value; // constant update
    if (
      fullNameValue.length < 5 ||
      !fullNameValue.includes(" ") ||
      (fullNameValue.length < 5 && !fullNameValue.includes(" "))
    ) {
      setErrorState({
        ...errorState,
        fullName: "Please enter a valid full name!",
        fullNameErrorBool: true,
      });
    } else {
      setErrorState({
        ...errorState,
        fullName: "",
        fullNameErrorBool: false,
      });
    }
  };

  const validateEmail = (value: string): boolean => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
  };

  const handleEmailChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let emailValue = (e.target as HTMLInputElement).value;
    if (!validateEmail(emailValue) || emailValue.length < 1) {
      setErrorState({
        ...errorState,
        email: "Please enter a proper email!",
        emailErrorBool: true,
      });
    } else {
      setErrorState({
        ...errorState,
        email: "",
        emailErrorBool: false,
      });
    }
  };

  const handlePasswordChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let passwordValue = (e.target as HTMLInputElement).value;
    if (passwordValue.length < 8) {
      setErrorState({
        ...errorState,
        password:
          "Please enter a password that is greater than 8 characters in length!",
        passwordErrorBool: true,
      });
    } else {
      setErrorState({
        ...errorState,
        password: "",
        passwordErrorBool: false,
      });
    }
  };
  const handleConfirmPasswordChange = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    let confirmPasswordValue = (e.target as HTMLInputElement).value;
    if (!userInformation.password.match(confirmPasswordValue)) {
      setErrorState({
        ...errorState,
        confirmPassword: "Passwords do not match!",
        confirmPasswordErrorBool: true,
      });
    } else {
      setErrorState({
        ...errorState,
        confirmPassword: "",
        confirmPasswordErrorBool: false,
      });
    }
  };

  const registerUser = async () => {
    try {
      setLoading(true);
      let userCredits = doCreateUserWithEmailAndPassword(userInformation.email, userInformation.password);
      let userUuid = uuid();
      await setDoc(doc(db, "users", userUuid), {
        email: userInformation.email,
        fullName: userInformation.fullName,
        password: userInformation.password,
        tosAcceptance: userInformation.termsAccepted
      }).then(() => {
        setLoading(false);
        router.push("/login?registered=true");
      })
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Card className="p-4">
          <Form>
            <CardHeader className="justify-center flex-col">
              <h1 className="text-2xl font-bold">Create your profile</h1>
              <h4 className="text-lg font-light">
                Join the community, make your mark.
              </h4>
            </CardHeader>
            <CardBody className="gap-y-5">
              <Input
                onKeyUp={handleFullNameChange}
                isInvalid={errorState.fullNameErrorBool}
                errorMessage={errorState.fullName}
                placeholder="Jane Doe"
                type="name"
                value={userInformation.fullName}
                onChange={handleInputChange}
                name="fullName"
                label="Full Name"
                labelPlacement="outside"
                variant="underlined"
                color="primary"
                isClearable
                isRequired
              />
              <Input
                onKeyUp={handleEmailChange}
                isInvalid={errorState.emailErrorBool}
                errorMessage={errorState.email}
                placeholder="janedoe@example.com"
                type="email"
                value={userInformation.email}
                onChange={handleInputChange}
                name="email"
                label="Email"
                labelPlacement="outside"
                variant="underlined"
                color="primary"
                isClearable
                isRequired
              />
              <Input
                onKeyUp={handlePasswordChange}
                isInvalid={errorState.passwordErrorBool}
                errorMessage={errorState.password}
                placeholder="SomeCoolPassword123!"
                type="password"
                value={userInformation.password}
                onChange={handleInputChange}
                name="password"
                label="Password"
                labelPlacement="outside"
                variant="underlined"
                color="primary"
                isClearable
                isRequired
              />
              <Input
                onKeyUp={handleConfirmPasswordChange}
                isInvalid={errorState.confirmPasswordErrorBool}
                errorMessage={errorState.confirmPassword}
                placeholder="SomeCoolPassword123!"
                type="password"
                value={userInformation.confirmPassword}
                onChange={handleInputChange}
                name="confirmPassword"
                label="Confirm Password"
                labelPlacement="outside"
                variant="underlined"
                color="primary"
                isClearable
                isRequired
              />
            </CardBody>
            <CardFooter className="justify-center flex flex-col gap-y-5">
              <Checkbox
                type="checkbox"
                value={String(userInformation.termsAccepted)}
                onChange={handleCheckboxChange}
              >
                I Agree to the Terms and Conditions
              </Checkbox>
              <Button isLoading={loading} onPress={registerUser} color="primary" variant="faded">
                Create Account
              </Button>
              <p>
                Already have an account? <Link href="/login" className="underline text-blue-500 animate-pulse">Login here</Link>
              </p>
            </CardFooter>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default Register;
