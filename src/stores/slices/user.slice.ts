import { createSlice } from "@reduxjs/toolkit";

interface User {
  id: number;
  Username: string;
  password: string;
  role: string;
  email: string;
  cart: any[];
  receipts: any[];
}
interface UserState {
  token: any;
  data: User | null;
}

const initialState: UserState = {
  data: null,
  token: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
      // console.log("setUser", state.data);
    },
    // setUpdateCart: (state, action) => {
    //   state.data.cart = action.payload;
    // },
  },

  // extraReducers: (builder) => {
  //   builder.addCase(fethUser.fulfilled, (state, action) => {
  //     state.data = action.payload;
  //   });
  // },
});
// export const fethUser = createAsyncThunk(
//   "user/validateToken",
//   async (token: string) => {
//     const res = await axios.get("http://localhost:3000/users");
//     return res.data;
//   }
// );

export const userReducer = userSlice.reducer;
export const userAction = userSlice.actions;
