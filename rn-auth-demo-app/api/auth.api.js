import axios from "axios";
import { API_KEY } from "@env";

export const createUser = async ({ email, password }) => {
  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
    {
      email,
      password,
      returnSecureToken: true,
    }
  );
  const token = response.data.idToken;

  return token;
};

export const login = async ({ email, password }) => {
  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
    {
      email,
      password,
      returnSecureToken: true,
    }
  );

  const token = response.data.idToken;

  return token;
};
