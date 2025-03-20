export interface IUser {
  customer: {
    id: string;
    email: string;
    password?: string;
    phone?: string;
    first_name?: string;
    last_name?: string;
    addresses: IAddress[];
    createdAt?: Date;
    updatedAt?: Date;
    avatar?: string;
    has_account?: boolean;
    created_at?: Date;
    groups?: string[];
  };
}

export interface IAddress {
  id: string;
  address_name: string;
  is_default_shipping: boolean;
  is_default_billing: boolean;
  customer_id: string;
  first_name: string;
  last_name: string;
  city: string;
  phone: string;
  country_code: string;
  province: string;
  created_at: Date;
}

export interface IAddressUpdate {
  first_name: string;
  last_name: string;
  phone: string;
  address_name: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserRegister {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface IUserResponse {
  token: string;
  // refreshToken?: string;
}

export interface IAuthError {
  message: string;
  code?: string;
  status?: number;
}
