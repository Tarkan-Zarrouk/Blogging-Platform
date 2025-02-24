export interface UserInformation {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}
export interface LoginUserInformation {
  email: string,
  password: string,
}
export interface ResetPasswordInformation {
  userName: string,
  email: string,
}
export interface ResetPasswordErrorState {
  userNameError: string,
  emailError: string,
  userNameErrorBool: boolean,
  emailErrorBool: boolean
}

export interface RegisterErrorResponder {
  fullNameErrorBool: boolean;
  emailErrorBool: boolean;
  passwordErrorBool: boolean;
  confirmPasswordErrorBool: boolean;
  termsAcceptedErrorBool: boolean;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted: string;
}
export interface LoginErrorResponder {
  emailErrorBool: boolean;
  passwordErrorBool: boolean;
  emailErrorMessage: string,
  passwordErrorMessage: string,
}

