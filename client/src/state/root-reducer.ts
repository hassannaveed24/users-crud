import { combineReducers } from "@reduxjs/toolkit";
import { reducer as authReducer } from "./slices/auth";
import { reducer as workspaceReducer } from "./slices/workspace";

export const rootReducer = combineReducers({
  auth: authReducer,
  workspace: workspaceReducer,
});
