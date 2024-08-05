import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "@scss/detail.scss";
import { numberToVND } from "@/utils/toVND";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "@/stores";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { userAction } from "@slices/user.slice";

// import { cartAction } from "@/stores/slices/cart.slice";
export default function Detail() {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const userStore = useSelector((store: StoreType) => store.userStore);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  // const dispatch = useDispatch();

  const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleClickThumbnail = (image: string) => {
    setCurrentImage(image);
    // Remove "active" class from all thumbnails
    const thumbnails = document.querySelectorAll(".thumbnails img");
    thumbnails.forEach((thumbnail: Element) => {
      thumbnail.classList.remove("active");
    });

    // Add "active" class to the clicked thumbnail
    const clickedThumbnail = document.querySelector(
      `.thumbnails img[src="${image}"]`
    );
    if (clickedThumbnail) {
      clickedThumbnail.classList.add("active");
    }
  };
  useEffect(() => {
    const fetchCart = async () => {
      const response = await axios.get(
        `http://localhost:3000/users/${userStore.data?.id}`
      );
      dispatch(
        userAction.setUser({ ...userStore.data, cart: response.data.cart })
      );
    };
    fetchCart();
  }, []);
  useEffect(() => {
    if (product) {
      setCurrentImage(product.image ?? null);
    }
  }, [product]);

  // gọi api và render ra chi tiết sản phẩm
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Product>(
          `http://localhost:3000/products/${productId}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddCart = async () => {
    // Lấy mảng cart từ userStore và tạo một bản sao
    const addCart = [...(userStore.data?.cart || [])];

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const existingItemIndex = addCart.findIndex(
      (item) => item.image === currentImage
    );

    let updatedCart;
    if (existingItemIndex !== -1) {
      // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng lên 1
      updatedCart = addCart.map((item, index) =>
        index === existingItemIndex
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới vào giỏ hàng
      updatedCart = [
        ...addCart,
        {
          name: product?.name || "",
          image: currentImage,
          price: product?.price || 0,
          quantity: 1,
        },
      ];
    }

    // Dispatch action setUser để cập nhật giỏ hàng trong Redux store
    dispatch(
      userAction.setUser({
        ...userStore.data,
        cart: updatedCart,
      })
    );

    try {
      // Get the current user object
      const user = { ...userStore.data };

      if (user) {
        // Update the cart in the user object
        user.cart = updatedCart;

        // Send the entire updated user object in the PUT request
        const response = await axios.put(
          `http://localhost:3000/users/${user.id}`,
          user
        );
        if (response.status === 200) {
          console.log("Cart updated successfully in db.json");
        } else {
          console.log("Failed to update cart in db.json");
        }
      }
    } catch (error) {
      console.error("Failed to update cart in db.json", error);
    }
  };

  interface Product {
    inventory: number;
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    content: string;
    images: string[]; // Đổi 'src' thành 'images' để phù hợp với API trả về
    count: number;
  }

  return (
    <div
      style={{
        margin: "100px",
      }}
    >
      <div className="app">
        <div className="details" key={product.id}>
          <div className="big-img">
            <img src={currentImage ?? undefined} alt="" />
          </div>

          <div className="box">
            <div className="row">
              <h2>{product.name}</h2>
              <span>{numberToVND(product.price)}</span>
            </div>

            <p>{product.content}</p>

            {/* Hiển thị các hình ảnh chi tiết của sản phẩm */}
            <div className="thumbnails">
              {product.images.map((image, index) => (
                <img
                  src={image}
                  alt=""
                  key={index}
                  onClick={() => handleClickThumbnail(image)}
                />
              ))}
            </div>
            <div>
              <button
                onClick={() => {
                  handleAddCart();
                  handleOpen();
                }}
                className="cart"
              >
                Add to cart
              </button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  ></Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Sản phẩm đã được thêm vào giỏ hàng
                  </Typography>
                </Box>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
