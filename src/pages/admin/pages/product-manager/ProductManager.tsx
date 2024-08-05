import { Table } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { numberToVND } from "@/utils/toVND";
import "./product-manager.scss";
import { Button, Modal } from "antd";

export default function ProductManager() {
  const [listProduct, setListProduct] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");
        setListProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    type: string;
    content: string;
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h3>Danh sách sản phẩm</h3>

      <Button
        type="dashed"
        onClick={showModal}
        style={{
          marginBottom: 20,
        }}
      >
        Add Product
      </Button>
      <Modal
        title="Thêm sản phẩm"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form action="">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" id="name" />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input type="number" className="form-control" id="price" />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input type="text" className="form-control" id="image" />
          </div>
          <div className="form-group">
            <label htmlFor="type">Type</label>
            <input type="text" className="form-control" id="type" />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <input type="text" className="form-control" id="content" />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </Modal>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Image</th>
            <th>Type</th>
            <th>Price</th>
            <th>Content</th>
            <th colSpan={2}>Tool</th>
          </tr>
        </thead>
        <tbody>
          {listProduct.map((product: Product) => (
            <tr key={Date.now() * Math.random()}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>
                <img
                  src={product.image}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                  }}
                />
              </td>
              <td>{product.type}</td>
              <td>{numberToVND(product.price)}</td>
              <td>{product.content}</td>
              <td>
                <button>Edit</button>
              </td>
              <td>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
