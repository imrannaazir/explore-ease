import { RootState } from "@/redux/store";
import { TJwtPayload } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { user: TJwtPayload | null } = { user: null };

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<TJwtPayload | null>) => {
      state.user = action.payload;
    },
  },
});

export const { saveUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
export const selectUser = (state: RootState) => state.auth;
