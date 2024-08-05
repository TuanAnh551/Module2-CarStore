import "@scss/update-users.scss";
import { StoreType } from "@/stores";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userAction } from "@/stores/slices/user.slice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import path from "path";
export default function UpdateUser() {
  const navigate = useNavigate();
  const userStore = useSelector((store: StoreType) => store.userStore);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/users/${userStore.data?.id}`
        );
        dispatch(userAction.setUser(response.data));
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchUser();
  }, []);

  const handleUpdate = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const nameElement = document.getElementById(
      "checkout-name"
    ) as HTMLInputElement;
    const Username = nameElement ? nameElement.value : "";
    const emailElement = document.getElementById(
      "checkout-email"
    ) as HTMLInputElement;
    const email = emailElement ? emailElement.value : "";
    const presentPasswordElement = document.getElementById(
      "checkout-present-password"
    ) as HTMLInputElement;
    const password = presentPasswordElement ? presentPasswordElement.value : "";
    const confirmPasswordElement = document.getElementById(
      "checkout-confirm-password"
    ) as HTMLInputElement;
    const confirmPassword = confirmPasswordElement
      ? confirmPasswordElement.value
      : "";
    if (password !== confirmPassword) {
      alert("Mật khẩu không khớp");
      return;
    }

    const data = {
      Username,
      email,
      password,
    };
    try {
      const response = await axios.patch(
        `http://localhost:3000/users/${userStore.data?.id}`,
        data
      );
      dispatch(userAction.setUser(response.data));
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      style={{
        margin: "100px",
      }}
    >
      <h1>Update User</h1>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          id="checkout-name"
          placeholder="Name"
          defaultValue={userStore.data?.Username}
        />
        <input
          type="email"
          id="checkout-email"
          placeholder="Email"
          defaultValue={userStore.data?.email}
        />

        <input
          type="text"
          id="checkout-present-password"
          placeholder="Present Password"
          defaultValue={userStore.data?.password}
        />
        <input
          type="password"
          id="checkout-confirm-password"
          placeholder="Confirm Password"
        />

        <button type="submit">Update</button>
      </form>
    </div>
  );
}
