import axios from "axios";
import { User } from "../user/types";

export const loginApi = {
  login: async (data: Partial<User>): Promise<User | null> => {
    const user: User | null = await axios
      .post("http://localhost:3333/login", data)
      .then((response) => {
        return response.data;
      });
    return user;
  },
};

export const signUpApi = {
  signUp: async (data: Partial<User>): Promise<User | null> => {
    const user: User | null = await axios
      .post("http://localhost:3333/users", data)
      .then((response) => {
        return response.data;
      });
    return user;
  },
};
