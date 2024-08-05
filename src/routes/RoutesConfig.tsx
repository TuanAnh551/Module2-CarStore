import { lazyFn } from "./lazy";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Detail from "@pages/Detail";
import Admin from "@pages/admin/Admin";
import CategoryManager from "@pages/admin/pages/category-manager/CategoryManager";
import ProductManager from "@pages/admin/pages/product-manager/ProductManager";
import OrderStatus from "@/pages/admin/pages/order-status/OrderStatus";
import UpdateUser from "@/pages/UpdateUser";

export default function RoutesConfig() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={lazyFn(() => import("@pages/Home"))}>
            <Route
              path="product"
              element={lazyFn(() => import("@pages/Category"))}
            ></Route>
            <Route
              path="home"
              element={lazyFn(() => import("@pages/HomePage"))}
            ></Route>
            {/* if not match anything or "/" will redirect to /home instead of 404 */}
            <Route path="*" element={<Navigate to="home" />} />
            <Route
              path="contact"
              element={lazyFn(() => import("@pages/Contact"))}
            ></Route>
            <Route path="product/detail/:productId" element={<Detail />} />
            <Route path="update-user" element={<UpdateUser />}></Route>
          </Route>
          <Route
            path="checkout"
            element={lazyFn(() => import("@pages/Checkout"))}
          ></Route>

          <Route path="admin" element={<Admin />}>
            <Route path="category-manager" element={<CategoryManager />} />
            <Route path="product-manager" element={<ProductManager />} />
            <Route path="order-status" element={<OrderStatus />} />
          </Route>
          <Route
            path="login"
            element={lazyFn(() => import("@pages/Login"))}
          ></Route>
          <Route
            path="register"
            element={lazyFn(() => import("@pages/Register"))}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
