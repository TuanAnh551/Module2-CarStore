import { Link, useNavigate } from "react-router-dom";
import "@scss/header.scss";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StyledBadge from "@mui/material/Badge";
import KiaLogo from "@pictures/kia-brandlogo.net_.png";
// import { notification } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../stores/index";
import { Popconfirm } from "antd";
import { numberToVND } from "@/utils/toVND";
import { userAction } from "@/stores/slices/user.slice";
import axios from "axios";

const Header = () => {
  // take the data from payload and set it by useSelect
  const userStore = useSelector((store: StoreType) => store.userStore);
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const dispatch = useDispatch();
  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  // goi gio hang tu user dang dang nhap hien tai
  const userId = userStore.data?.cart;
  // console.log("userId", userId);

  // tinh tong tien
  const handleTotal = () => {
    let total = 0;
    userId?.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  const handleDecrease = async (productToDecrease: { image: any }) => {
    // Lấy mảng cart từ userStore
    const cartItems = userStore.data?.cart ?? [];

    // Tìm sản phẩm muốn giảm số lượng trong giỏ hàng
    const updatedCart = cartItems
      .map((item) => {
        if (item.image === productToDecrease.image) {
          return {
            ...item,
            quantity: item.quantity > 1 ? item.quantity - 1 : 0,
          };
        } else {
          return item;
        }
      })
      .filter((item) => item.quantity > 0); // Loại bỏ sản phẩm có số lượng 0

    // Cập nhật giỏ hàng trên server
    try {
      const response = await axios.patch(
        `http://localhost:3000/users/${userStore.data?.id}`,
        {
          cart: updatedCart,
        }
      );
      if (response.status === 200) {
        // Nếu cập nhật thành công trên server, cập nhật giỏ hàng trong Redux store
        dispatch(
          userAction.setUser({
            ...userStore.data,
            cart: updatedCart,
          })
        );
      } else {
        console.log("Failed to update cart on server");
      }
    } catch (error) {
      console.error("Failed to update cart on server", error);
    }
  };

  const handleIncrease = async (productToDecrease: { image: any }) => {
    // Lấy mảng cart từ userStore
    const cartItems = userStore.data?.cart ?? [];

    // Tìm sản phẩm muốn giảm số lượng trong giỏ hàng
    const updatedCart = cartItems.map((item) => {
      if (item.image === productToDecrease.image) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      } else {
        return item;
      }
    });

    // Cập nhật giỏ hàng trên server
    try {
      const response = await axios.patch(
        `http://localhost:3000/users/${userStore.data?.id}`,
        {
          cart: updatedCart,
        }
      );
      if (response.status === 200) {
        // Nếu cập nhật thành công trên server, cập nhật giỏ hàng trong Redux store
        dispatch(
          userAction.setUser({
            ...userStore.data,
            cart: updatedCart,
          })
        );
      } else {
        console.log("Failed to update cart on server");
      }
    } catch (error) {
      console.error("Failed to update cart on server", error);
    }
  };
  const handleDelete = async (productToDelete: { image: any }) => {
    // Lấy mảng cart từ userStore
    const cartItems = userStore.data?.cart ?? [];

    // Lọc ra các sản phẩm khác sản phẩm muốn xóa
    const updatedCart = cartItems.filter(
      (item) => item.image !== productToDelete.image
    );

    // Cập nhật giỏ hàng trên server
    try {
      const response = await axios.patch(
        `http://localhost:3000/users/${userStore.data?.id}`,
        {
          cart: updatedCart,
        }
      );

      if (response.status === 200) {
        // Nếu cập nhật thành công trên server, cập nhật giỏ hàng trong Redux store
        dispatch(
          userAction.setUser({
            ...userStore.data,
            cart: updatedCart,
          })
        );
      } else {
        console.log("Failed to update cart on server");
      }
    } catch (error) {
      console.error("Failed to update cart on server", error);
    }
  };

  return (
    <div>
      <header>
        <span>
          <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
            Về KIA
          </Link>
        </span>
        <span>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={"/product"}
          >
            Sản Phẩm
          </Link>
        </span>
        <span>
          {" "}
          <Link
            to={"https://sorentohybrid.kiavietnam.com.vn/"}
            style={{ textDecoration: "none", color: "black" }}
          >
            Sorento Hybrid
          </Link>
        </span>
        <span>
          <Link
            to={"https://kiabinhtan.vn/gia-xe"}
            style={{ textDecoration: "none", color: "black" }}
          >
            Giá xe
          </Link>
        </span>
        <img
          style={{
            width: "100px",
            height: "100px",
          }}
          src={KiaLogo}
          alt=""
        />

        <span> Dịch vụ</span>
        <span>
          <Link
            to={"/contact"}
            style={{ textDecoration: "none", color: "black" }}
          >
            Liên hệ
          </Link>
        </span>

        <span>
          {" "}
          <Popover
            content={
              isLoggedIn ? (
                <div>
                  <p>Hello {userStore.data?.Username}</p>
                  <p>
                    {" "}
                    <Link className="account" to={"/update-user"}>
                      Chỉnh sửa thông tin người dùng
                    </Link>
                  </p>
                  <p>
                    <Link className="account" to={"/"} onClick={handleLogout}>
                      Logout
                    </Link>
                  </p>
                </div>
              ) : (
                <Link to={"/login"}>Login</Link>
              )
            }
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
          >
            <UserOutlined />
          </Popover>
        </span>
        <span>
          <Popconfirm
            placement="topRight"
            title={
              <div>
                <h4>Thông tin sản phẩm</h4>
              </div>
            }
            description={
              <div>
                <table
                  style={{
                    width: "450px",
                    textAlign: "center",
                  }}
                >
                  <tbody>
                    {userId &&
                      userId.map((item, index) => (
                        <tr key={index}>
                          <td
                            className="delete"
                            onClick={() => handleDelete(item)}
                          >
                            x
                          </td>
                          <td>
                            <img
                              style={{
                                width: "50px",
                                height: "50px",
                              }}
                              src={item.image} // Assuming 'image' is the key for the image URL in your cart item object
                              alt=""
                            />
                          </td>
                          <td style={{ padding: "30px" }}>{item.name}</td>{" "}
                          {/* Assuming 'name' is the key for the product name in your cart item object */}
                          <td className="quantityCart">
                            <button
                              className="quantityButton"
                              onClick={() => handleDecrease(item)}
                            >
                              -
                            </button>
                            <input type="text" value={item.quantity} readOnly />{" "}
                            {/* Assuming 'quantity' is the key for the product quantity in your cart item object */}
                            <button
                              className="quantityButton"
                              onClick={() => handleIncrease(item)}
                            >
                              +
                            </button>
                          </td>
                          <td>{numberToVND(item.price)}</td>{" "}
                          {/* Assuming 'price' is the key for the product price in your cart item object */}
                        </tr>
                      ))}
                  </tbody>
                </table>
                <hr />
                <div>
                  <h4>
                    Tổng tiền: <span>{numberToVND(handleTotal())}</span>
                  </h4>
                </div>
              </div>
            }
            okText="Thanh toán "
            cancelText="Hủy"
            onConfirm={() => {
              navigate("/checkout");
            }}
          >
            <StyledBadge
              badgeContent={userStore.data?.cart.length}
              color="secondary"
            >
              <ShoppingCartIcon></ShoppingCartIcon>
            </StyledBadge>
          </Popconfirm>
        </span>
      </header>
    </div>
  );
};

export default Header;
