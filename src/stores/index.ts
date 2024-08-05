import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userAction, userReducer } from "./slices/user.slice";
import * as jose from "jose";
// import { cartReducer } from "./slices/cart.slice";

const RootReducer = combineReducers({
  userStore: userReducer,
  // cartStore: cartReducer,
});

export type StoreType = ReturnType<typeof RootReducer>;

export const store = configureStore({
  reducer: RootReducer,
});

async function verifyToken(token: string, key: string) {
  try {
    const { payload } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(key)
    );
    console.log("payload", payload);
    return payload;
  } catch (error) {
    return null;
  }
}
// const deToken = verifyToken(
//   localStorage.getItem("token") || "",

//   "ntbphuoc"
// ).then((payload) => {
//   console.log("payload", payload);
//   return payload;
// });

const deToken2 = () =>
  verifyToken(
    localStorage.getItem("token") || "",

    "ntbphuoc"
  ).then((payload) => {
    store.dispatch(userAction.setUser(payload));
  });

deToken2();
