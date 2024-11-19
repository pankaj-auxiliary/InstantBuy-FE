import axios from "axios";
import { User } from "./types";

export const userApi = {
  getUsers: async (): Promise<User | null> => {
    const user: User | null = await axios
      .get("http://localhost:3333/users")
      .then((response) => {
        return response.data;
      });
    if (!user) {
      console.error("user not found");
    }
    return user;
  },
};
