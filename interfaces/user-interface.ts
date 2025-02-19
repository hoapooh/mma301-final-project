export interface IUser {
  id: string;
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  // createdAt?: Date;
  // updatedAt?: Date;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserRegister {
  email: string;
  password: string;
  username: string;
  firstName?: string;
  lastName?: string;
}

export interface IUserResponse {
  user: Omit<IUser, 'password'>;
  token: string;
  // refreshToken?: string;
}

export interface IAuthError {
  message: string;
  code?: string;
  status?: number;
}
