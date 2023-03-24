import { useSelector } from "@/state/store";

export const useAuth = () => {
  const auth = useSelector((store) => store.auth);
  return auth;
};
