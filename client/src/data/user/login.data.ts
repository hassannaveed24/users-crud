import { NextRouter } from "next/router";

export interface LoginMutationPayload {
  email: string;
  router: NextRouter;
}

export interface LoginResponse {
  access_token: string;
}
