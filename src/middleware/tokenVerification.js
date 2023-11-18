import { getToken } from "../utils/api";

export const isAuthenticated = () => {
  const token = getToken();
  return token;
};
