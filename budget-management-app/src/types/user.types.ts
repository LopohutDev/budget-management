export interface UserInfo {
  sub: string;
  email: string;
  firstName: string;
  lastName: string;
  iat: number;
  exp: number;
}

export interface SignUpRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
}
