import { SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import "@scss/category.scss";
import Aos from "aos";
import Pagination from "@mui/material/Pagination";
import { numberToVND } from "@/utils/toVND";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [type, setType] = useState("");
  const [sort, setSort] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const navigate = useNavigate();
  const handleProductDetail = (productId: any) => {
    navigate(`/product/detail/${productId}`);
  };
  const number_product_per_page = 3;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await axios.get(
          `http://localhost:3000/products?type=${type}&_sort=${sort}`
        );

        setTotalPage(Math.ceil(products.data.length / number_product_per_page));

        const response = await axios.get(
          `http://localhost:3000/products?_page=${page}&_per_page=${number_product_per_page}&type=${type}&_sort=${sort}`
        );

        setProducts(response.data.data);

        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [page, type, sort]);

  Aos.init({ duration: 2000 });

  const handleChange = (event, value: SetStateAction<number>) => {
    setPage(value);
  };
  interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
  }
  return (
    <div
      style={{
        marginTop: "100px",
      }}
    >
      <Outlet />;
      <div className="container-header">
        <h2>Trang chủ</h2>
        <select
          name=""
          id=""
          onChange={(e) => {
            setSort(e.target.value);
          }}
        >
          <option value="">Sắp xếp</option>
          <option value="-price">Theo thứ tự giá: cao đến thấp</option>
          <option value="price">Theo thứ tự giá: thấp đến cao</option>
        </select>
      </div>
      <div className="container-items">
        <div className="container-items-span">
          <span>Duyệt theo</span>
          <div className="line-items"></div>
          <div
            className="check-box-item"
            onChange={() => {
              setType("");
            }}
          >
            <input type="checkbox" checked={type === ""} name="" id="" />
            Tất cả
          </div>
          <div
            className="check-box-item"
            onChange={() => {
              setType("hatchback");
            }}
          >
            <input
              type="checkbox"
              checked={type === "hatchback"}
              name=""
              id=""
            />
            Hatchback
          </div>
          <div
            className="check-box-item"
            onChange={() => {
              setType("sedan");
            }}
          >
            <input type="checkbox" checked={type === "sedan"} name="" id="" />
            Sedan
          </div>
          <div
            className="check-box-item"
            onChange={() => {
              setType("suv");
            }}
          >
            <input type="checkbox" checked={type === "suv"} name="" id="" />
            Suv
          </div>
        </div>

        <div className="container-items-list">
          {products.map((product: Product) => (
            <div
              key={product.id}
              className="container-items-list-product"
              data-aos="fade-up"
            >
              <h3>{product.name}</h3>
              <span>Trải nghiệm đẳng cấp mới </span>
              <div>
                <button
                  onClick={() => {
                    handleProductDetail(product.id);
                  }}
                >
                  Chi tiết
                </button>
              </div>

              {/* `/product/detail/${product.id}` */}
              <p>Giá: {numberToVND(product.price)}</p>
              <img
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                src={product.image}
                alt={product.name}
              />
            </div>
          ))}
        </div>
      </div>
      <Pagination
        count={totalPage}
        onChange={handleChange}
        variant="outlined"
        style={{
          margin: "20px 500px",
        }}
      />
    </div>
  );
};

export default Category;
