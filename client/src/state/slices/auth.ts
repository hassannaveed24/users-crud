import { IUser, UserRoles } from "@/schemas/user.schema";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthSliceType = {
  user: IUser | null;
};

const dummyUser: IUser = {
  _id: "sulvi4d384av",
  email: "hassannaveed24@gmail.com",
  address: {
    addressLine1: "string",
    addressLine2: "string",
    city: "string",
    state: "string",
    country: "string",
    _id: "64174f5c7f77d7a6909a1271",
  },
  createdAt: "2023-03-19T18:07:22.778Z",
  name: "Hassan Naveed",
  phoneNo: "+923415615279",
  role: UserRoles.MEMBER,
  updatedAt: "2023-03-19T18:07:24.877Z",
};

const initialState: AuthSliceType = { user: null };

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser | null>) {
      state.user = action.payload;
    },
  },
});

export const authActions = slice.actions;

export const { reducer } = slice;
