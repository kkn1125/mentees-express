declare interface Inputs {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  require?: boolean;
}

declare interface SigninPayload {
  email: string;
  pw: string;
}
