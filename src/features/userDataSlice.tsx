import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

export interface IUserState {
  token: string | null;
}

const initialState: IUserState = {
  token: null,
};

export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    removeToken: (state) => {
      state.token = null;
    },
    storeToken: (state: any, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { removeToken, storeToken } = userDataSlice.actions;

export default userDataSlice.reducer;
