import { StoreType } from "@/stores";
import { userAction } from "@/stores/slices/user.slice";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userStore = useSelector((store: StoreType) => {
    return store.userStore;
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(userAction.setUser(null));
    navigate("/login");
  };
  if (userStore.data?.role !== "admin") {
    navigate("/");
  }

  return (
    <div className="nav">
      <div className="left">
        <i>Hi</i>
        <span>{userStore.data?.Username}!</span>
      </div>
      <div className="right">
        <a
          onClick={() => {
            Modal.confirm({
              title: "Xác nhận!",
              content: "bạn có chắc đăng xuất?",
              onOk: () => {
                handleLogout();
              },
            });
          }}
        >
          logout
        </a>
      </div>
    </div>
  );
}
