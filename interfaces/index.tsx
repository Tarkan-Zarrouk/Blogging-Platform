export interface UserInformation {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
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
