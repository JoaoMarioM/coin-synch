export type FormProps = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  policyAccepted: boolean | undefined;
}

export type UserProps = {
  id: number;
  name: string;
  email: string;
  password: string;
}