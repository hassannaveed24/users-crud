import { authActions } from "@/state/slices/auth";
import store from "@/state/store";
import axios from "axios";
import { toast } from "react-toastify";

const serverPath = process.env.NEXT_PUBLIC_SERVER_PATH;

if (!serverPath) throw new Error("Server path not configured in env");

export const PublicAPI = axios.create({
  baseURL: serverPath,
});

PublicAPI.interceptors.response.use((res) => res.data);

export const ValidatedAPI = axios.create({
  baseURL: serverPath,
});

ValidatedAPI.interceptors.request.use((config) => {
  const { user } = store.getState().auth;
  if (!user) {
    toast.error("Your session has expired, please login again");
    store.dispatch(authActions.setUser(null));
    window.location.href = "/";
  }
  return config;
});

ValidatedAPI.interceptors.response.use((res) => res.data);
