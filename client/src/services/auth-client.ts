import { LoginMutationPayload, LoginResponse } from "@/data/user/login.data";
import { IUser } from "@/schemas/user.schema";
import { authActions } from "@/state/slices/auth";
import store from "@/state/store";
import { PublicAPI } from "@/utils/api";
import { NextRouter } from "next/router";

export type AppStateType = { return_url?: string } | undefined;

type LoginRequest = { email: string };

class AuthClient {
  static async login(req: LoginMutationPayload) {
    const loginRes = await PublicAPI.post<LoginResponse, LoginRequest>("/login", { email: req.email });
    await AuthClient.decode(loginRes.access_token, req.router);
  }

  static async decode(access_token: string, router: NextRouter) {
    const decoded = await PublicAPI.post<IUser, undefined>("/decode", undefined, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    AuthClient.loginCallback(access_token, decoded, router);
  }

  static async loginCallback(access_token: string, user: IUser, router: NextRouter) {
    store.dispatch(authActions.setUser(user));
    localStorage.setItem("accessToken", access_token);

    router.replace("/");
  }

  static logout(router: NextRouter) {
    localStorage.removeItem("accessToken");
    store.dispatch(authActions.setUser(null));
    router.push("/login");
  }
}

export default AuthClient;
