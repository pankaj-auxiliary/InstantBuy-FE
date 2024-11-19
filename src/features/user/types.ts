import { DateTime } from "luxon";

export enum UserRole {
  BUYER = "buyer",
  SELLER = "seller",
  DELIVERY_PARTNER = "delivery_partner",
}

export interface User {
  id: number;
  first_name: string;
  last_name?: string;
  email: string;
  phone_number: string | null;
  role: UserRole;
  password_last_updated_at?: DateTime;
  createdAt?: DateTime;
  updatedAt?: DateTime | null;
}

export interface UsersResponse {
  data: User[];
  total: number;
  page: number;
  limit: number;
}

export interface GetUsersParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}

export interface UsersState {
  items: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
}
